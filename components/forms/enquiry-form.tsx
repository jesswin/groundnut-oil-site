"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { submitEnquiry } from "@/app/actions/enquiry";
import { cn } from "@/lib/utils";
import {
  emptyValues,
  formFields,
  makeSchema,
  type ErrorKey,
  type FieldDef,
  type FormKind,
  type OptionSource,
} from "@/lib/validations";

export interface SelectOption {
  value: string;
  label: string;
}
export type FormOptions = Partial<Record<OptionSource, SelectOption[]>>;
type Values = Record<string, string>;

/**
 * One form component for all four enquiry forms. Fields come from `formFields[kind]`;
 * validation uses the shared Zod schema with messages in the active language.
 */
export function EnquiryForm({
  kind,
  options = {},
  defaults = {},
}: {
  kind: FormKind;
  options?: FormOptions;
  /** Prefilled values, e.g. { product: "refined-groundnut-oil" }. */
  defaults?: Values;
}) {
  const locale = useLocale();
  const tf = useTranslations("forms");
  const te = useTranslations("errors");
  const uid = useId();
  const [website, setWebsite] = useState("");
  const [sent, setSent] = useState(false);

  const initial = { ...emptyValues(kind), ...defaults };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(
      makeSchema(kind, (key: ErrorKey) => te(key)),
    ) as unknown as Resolver<Values>,
    defaultValues: initial,
    mode: "onTouched",
  });

  async function onSubmit(values: Values) {
    setSent(false);
    let result: Awaited<ReturnType<typeof submitEnquiry>>;
    try {
      result = await submitEnquiry({ kind, locale, values, website });
    } catch {
      result = { ok: false, code: "failed" };
    }

    if (result.ok) {
      toast.success(tf("successTitle"), { description: tf("successText") });
      reset(initial);
      setSent(true);
      return;
    }
    if (result.code === "rate_limited") {
      toast.error(tf("rateLimited"));
    } else if (result.code === "invalid") {
      const entries = Object.entries(result.fieldErrors ?? {});
      entries.forEach(([name, message]) => setError(name, { type: "server", message }));
      if (entries[0]) setFocus(entries[0][0]);
      toast.error(tf("invalid"));
    } else {
      toast.error(tf("errorTitle"), { description: tf("errorText") });
    }
  }

  function control(field: FieldDef) {
    const id = `${uid}-${field.name}`;
    const error = errors[field.name]?.message;
    const common = {
      id,
      "aria-invalid": error ? ("true" as const) : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
      "aria-required": field.required || undefined,
      autoComplete: field.autoComplete,
      placeholder: field.placeholderKey ? tf(field.placeholderKey) : undefined,
      ...register(field.name),
    };

    return (
      <div key={field.name} className={cn(field.wide && "sm:col-span-2")}>
        <label htmlFor={id} className="text-brown-dark mb-1.5 block font-medium">
          {tf(field.labelKey)}
          {!field.required && <span className="text-stone font-normal"> ({tf("optional")})</span>}
        </label>
        {field.type === "textarea" ? (
          <textarea rows={4} className="field" {...common} />
        ) : field.type === "select" ? (
          <select className="field" {...common}>
            <option value="">{tf("select")}</option>
            {(options[field.options!] ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            inputMode={field.type === "tel" ? "tel" : undefined}
            className="field"
            {...common}
          />
        )}
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-destructive mt-1.5 text-sm font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      {formFields[kind].map(control)}

      {/* Honeypot: hidden from people and assistive technology, tempting for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>{tf("honeypot")}</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={isSubmitting} className="btn btn-gold w-full sm:w-auto">
          {isSubmitting && <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />}
          {isSubmitting ? tf("sending") : tf("submit")}
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {sent && (
          <p className="border-leaf/40 bg-leaf/10 text-leaf-dark flex items-start gap-2 rounded-xl border p-4 font-medium">
            <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <span>
              {tf("successTitle")} {tf("successText")}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
