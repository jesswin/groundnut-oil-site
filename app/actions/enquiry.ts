"use server";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { isLocale } from "@/i18n/locales";
import { sendEnquiryEmails } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import {
  formKinds,
  makeSchema,
  type ErrorKey,
  type FormKind,
  type FormValues,
} from "@/lib/validations";

export type EnquiryResult =
  | { ok: true }
  | {
      ok: false;
      code: "rate_limited" | "invalid" | "failed";
      fieldErrors?: Record<string, string>;
    };

/** Handles every form on the site: honeypot, rate limit, validation, then email. */
export async function submitEnquiry(input: {
  kind: FormKind;
  locale: string;
  values: Record<string, string>;
  /** Honeypot: real visitors never fill this. */
  website?: string;
}): Promise<EnquiryResult> {
  const { kind, locale, values, website } = input;
  if (!formKinds.includes(kind) || !isLocale(locale)) return { ok: false, code: "invalid" };

  // Bots that fill the hidden field get a fake success and nothing is sent.
  if (website) return { ok: true };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(`enquiry:${ip}`).allowed) return { ok: false, code: "rate_limited" };

  const te = await getTranslations({ locale, namespace: "errors" });
  const parsed = makeSchema(kind, (key: ErrorKey) => te(key)).safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      fieldErrors[field] ??= issue.message;
    }
    return { ok: false, code: "invalid", fieldErrors };
  }

  try {
    const sent = await sendEnquiryEmails(kind, locale, parsed.data as FormValues);
    return sent ? { ok: true } : { ok: false, code: "failed" };
  } catch (error) {
    console.error("[enquiry] Unexpected error:", error);
    return { ok: false, code: "failed" };
  }
}
