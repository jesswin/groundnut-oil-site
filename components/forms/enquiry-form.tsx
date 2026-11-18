"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { WhatsAppIcon } from "@/components/icon";
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
import { whatsappLink } from "@/lib/whatsapp";

export interface SelectOption {
  value: string;
  label: string;
}
export type FormOptions = Partial<Record<OptionSource, SelectOption[]>>;
type Values = Record<string, string>;

/**
 * One form component for all four enquiry forms. Fields come from `formFields[kind]` and
 * are validated with the shared Zod schema. Nothing is sent to a server: a valid form opens
 * WhatsApp with the enquiry written out, and the visitor presses send.
 */
export function EnquiryForm({
  kind,
  options = {},
  defaults = {},
}: {
  kind: FormKind;
  options?: FormOptions;
  /** Prefilled values, e.g. { product: "filtered-groundnut-oil" }. */
  defaults?: Values;
}) {
  const tf = useTranslations("forms");
  const te = useTranslations("errors");
  const uid = useId();
  /** WhatsApp link of the last enquiry, kept so the visitor can reopen it. */
  const [link, setLink] = useState<string | null>(null);

  const initial = { ...emptyValues(kind), ...defaults };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(
      makeSchema(kind, (key: ErrorKey) => te(key)),
    ) as unknown as Resolver<Values>,
    defaultValues: initial,
    mode: "onTouched",
  });

  /** The filled-in fields as a WhatsApp message, with option ids turned into labels. */
  function message(values: Values) {
    const lines = formFields[kind]
      .map((field) => {
        const raw = values[field.name]?.trim();
        if (!raw) return null;
        const value = field.options
          ? (options[field.options]?.find((o) => o.value === raw)?.label ?? raw)
          : raw;
        return `${tf(field.labelKey)}: ${value}`;
      })
      .filter(Boolean);
    return [tf(`intro.${kind}`), "", ...lines].join("\n");
  }

  function onSubmit(values: Values) {
    const url = whatsappLink(message(values));
    setLink(url);
    // Pop-up blockers can stop the new tab; fall back to opening WhatsApp in this tab.
    if (!window.open(url, "_blank")) window.location.assign(url);
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

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-whatsapp w-full sm:w-auto">
          <WhatsAppIcon className="size-5" />
          {tf("submit")}
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {link && (
          <div className="border-leaf/40 bg-leaf/10 border p-4">
            <p className="text-leaf-dark flex items-start gap-2 font-medium">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <span>
                {tf("successTitle")} {tf("successText")}
              </span>
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line caps mt-3 ml-7"
            >
              {tf("openWhatsapp")}
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
