import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import { localeNames, type Locale } from "@/i18n/locales";
import { investmentRanges, orderFrequencies, products, siteConfig, t } from "@/lib/site-config";
import { formFields, type FormKind, type FormValues } from "@/lib/validations";

const KIND_TITLES: Record<FormKind, string> = {
  contact: "Contact enquiry",
  bulk: "Bulk order enquiry",
  distributor: "Distributor application",
  quote: "Quote request",
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`).replace(/\n/g, "<br>");

/** Turn stored option ids (product slug, frequency id, ...) into readable labels. */
function displayValue(name: string, value: string, locale: string): string {
  if (name === "product") {
    const product = products.find((p) => p.slug === value);
    return product ? t(product.name, locale) : value;
  }
  const options =
    name === "frequency" ? orderFrequencies : name === "investment" ? investmentRanges : null;
  const option = options?.find((o) => o.id === value);
  return option ? t(option.label, locale) : value;
}

async function rows(kind: FormKind, values: FormValues, locale: string) {
  const tf = await getTranslations({ locale, namespace: "forms" });
  return formFields[kind]
    .map((field) => ({
      label: tf(field.labelKey),
      value: displayValue(field.name, values[field.name] ?? "", locale),
    }))
    .filter((row) => row.value);
}

function layout(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#F7F4EE;font-family:Arial,Helvetica,sans-serif;color:#1D1B17">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #DCD5C7;border-radius:12px;overflow:hidden">
<tr><td style="background:#3B332A;color:#F7F4EE;padding:20px 24px;font-size:20px;font-weight:bold">${escapeHtml(title)}</td></tr>
<tr><td style="padding:24px;font-size:16px;line-height:1.6">${body}</td></tr>
</table></td></tr></table></body></html>`;
}

function table(items: { label: string; value: string }[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:12px 0">${items
    .map(
      (row) =>
        `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #EDE8DD;color:#6A6358;vertical-align:top;width:40%">${escapeHtml(row.label)}</td><td style="padding:8px 0;border-bottom:1px solid #EDE8DD;vertical-align:top">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("")}</table>`;
}

/**
 * Sends two emails for a form submission:
 *  1. to the business inbox, in English, noting the customer's language;
 *  2. an auto-reply to the customer, in their language.
 * Without RESEND_API_KEY the submission is logged to the console instead.
 * Returns true when the enquiry was delivered (or logged in development).
 */
export async function sendEnquiryEmails(
  kind: FormKind,
  locale: Locale,
  values: FormValues,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.emails.sales;
  const brandEn = t(siteConfig.brandName, "en");
  const brand = t(siteConfig.brandName, locale);
  // The sender must be on a domain verified in Resend. onboarding@resend.dev works for testing.
  const from = process.env.EMAIL_FROM || `${brandEn} <onboarding@resend.dev>`;

  const businessRows = [
    ...(await rows(kind, values, "en")),
    { label: "Customer language", value: `${localeNames[locale]} (${locale})` },
  ];
  const businessSubject = `[${KIND_TITLES[kind]}] ${values.name ?? ""}`.trim();
  const businessHtml = layout(
    `${KIND_TITLES[kind]} from the website`,
    `${table(businessRows)}<p style="color:#6A6358;font-size:14px">Reply to this email to answer the customer directly.</p>`,
  );

  if (!apiKey) {
    const payload = { kind, locale, to, values };
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[enquiry] RESEND_API_KEY is not set; this submission was NOT emailed:",
        payload,
      );
      return false;
    }
    console.info(
      "[enquiry] RESEND_API_KEY is not set; logging submission instead of emailing:",
      payload,
    );
    return true;
  }

  const resend = new Resend(apiKey);
  const business = await resend.emails.send({
    from,
    to,
    replyTo: values.email,
    subject: businessSubject,
    html: businessHtml,
  });
  if (business.error) {
    console.error("[enquiry] Failed to send business email:", business.error);
    return false;
  }

  // Auto-reply in the customer's language. A failure here does not fail the enquiry.
  if (values.email) {
    const te = await getTranslations({ locale, namespace: "email" });
    const html = layout(
      brand,
      `<p>${escapeHtml(te("greeting", { name: values.name ?? "" }))}</p>
<p>${escapeHtml(te("body", { brand }))}</p>
<p style="font-weight:bold;margin-bottom:0">${escapeHtml(te("summaryTitle"))}</p>
${table(await rows(kind, values, locale))}
<p>${escapeHtml(te("urgent", { phone: siteConfig.phone }))}</p>
<p>${escapeHtml(te("signoff"))}<br>${escapeHtml(te("team", { brand }))}</p>`,
    );
    const reply = await resend.emails.send({
      from,
      to: values.email,
      replyTo: to,
      subject: te("subject", { brand }),
      html,
    });
    if (reply.error) console.warn("[enquiry] Failed to send auto-reply:", reply.error);
  }

  return true;
}
