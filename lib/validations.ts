import { z } from "zod";

/**
 * Shared form schemas. The same schema runs in the browser (React Hook Form) and in the
 * server action; error messages come from the `errors` namespace of /messages/<locale>.json.
 */

export type FormKind = "contact" | "bulk" | "distributor" | "quote";
export const formKinds: FormKind[] = ["contact", "bulk", "distributor", "quote"];

export type ErrorKey =
  "required" | "nameMin" | "phone" | "email" | "gst" | "select" | "messageMin" | "tooLong";
type Translate = (key: ErrorKey) => string;

export type FieldName =
  | "name"
  | "company"
  | "firm"
  | "gst"
  | "phone"
  | "email"
  | "product"
  | "quantity"
  | "frequency"
  | "deliveryCity"
  | "city"
  | "state"
  | "currentBusiness"
  | "investment"
  | "message";

export type FormValues = Partial<Record<FieldName, string>>;
export type OptionSource = "products" | "frequencies" | "investments";

export interface FieldDef {
  name: FieldName;
  /** Key in the `forms` namespace of the messages files. */
  labelKey: string;
  type: "text" | "tel" | "email" | "textarea" | "select";
  required: boolean;
  options?: OptionSource;
  placeholderKey?: string;
  autoComplete?: string;
  /** Full width on wide screens (default is half). */
  wide?: boolean;
}

const f = {
  name: { name: "name", labelKey: "name", type: "text", required: true, autoComplete: "name" },
  phone: { name: "phone", labelKey: "phone", type: "tel", required: true, autoComplete: "tel" },
  email: { name: "email", labelKey: "email", type: "email", required: true, autoComplete: "email" },
  product: {
    name: "product",
    labelKey: "product",
    type: "select",
    required: true,
    options: "products",
  },
  quantity: {
    name: "quantity",
    labelKey: "quantity",
    type: "text",
    required: true,
    placeholderKey: "quantityPlaceholder",
  },
  message: { name: "message", labelKey: "message", type: "textarea", required: false, wide: true },
} satisfies Record<string, FieldDef>;

/** Field order and types for each form. Edit here to add or remove a field. */
export const formFields: Record<FormKind, FieldDef[]> = {
  contact: [f.name, f.phone, { ...f.email, wide: true }, { ...f.message, required: true }],
  bulk: [
    f.name,
    {
      name: "company",
      labelKey: "company",
      type: "text",
      required: true,
      autoComplete: "organization",
    },
    { name: "gst", labelKey: "gst", type: "text", required: false },
    f.phone,
    f.email,
    f.product,
    f.quantity,
    {
      name: "frequency",
      labelKey: "frequency",
      type: "select",
      required: true,
      options: "frequencies",
    },
    {
      name: "deliveryCity",
      labelKey: "deliveryCity",
      type: "text",
      required: true,
      autoComplete: "address-level2",
      wide: true,
    },
    f.message,
  ],
  distributor: [
    f.name,
    { name: "firm", labelKey: "firm", type: "text", required: true, autoComplete: "organization" },
    {
      name: "city",
      labelKey: "city",
      type: "text",
      required: true,
      autoComplete: "address-level2",
    },
    {
      name: "state",
      labelKey: "state",
      type: "text",
      required: true,
      autoComplete: "address-level1",
    },
    {
      name: "currentBusiness",
      labelKey: "currentBusiness",
      type: "text",
      required: true,
      placeholderKey: "currentBusinessPlaceholder",
    },
    {
      name: "investment",
      labelKey: "investment",
      type: "select",
      required: true,
      options: "investments",
    },
    f.phone,
    f.email,
  ],
  quote: [
    f.name,
    {
      name: "company",
      labelKey: "company",
      type: "text",
      required: false,
      autoComplete: "organization",
    },
    f.phone,
    f.email,
    f.product,
    f.quantity,
    f.message,
  ],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Indian mobile number, with optional +91 / 0 prefix and spaces or dashes. */
const PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;
const GST_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/i;

/** Build the Zod schema for a form, with error messages in the caller's language. */
export function makeSchema(kind: FormKind, te: Translate) {
  const text = (max = 120) => z.string().trim().min(1, te("required")).max(max, te("tooLong"));
  const optionalText = (max = 120) => z.string().trim().max(max, te("tooLong"));

  const shape: Record<FieldName, z.ZodType<string>> = {
    name: z.string().trim().min(2, te("nameMin")).max(80, te("tooLong")),
    company: kind === "quote" ? optionalText() : text(),
    firm: text(),
    gst: z.string().trim().regex(GST_RE, te("gst")).or(z.literal("")),
    phone: z.string().trim().min(1, te("required")).regex(PHONE_RE, te("phone")),
    email: z
      .string()
      .trim()
      .min(1, te("required"))
      .max(120, te("tooLong"))
      .regex(EMAIL_RE, te("email")),
    product: z.string().min(1, te("select")).max(80, te("tooLong")),
    quantity: text(),
    frequency: z.string().min(1, te("select")).max(40, te("tooLong")),
    deliveryCity: text(),
    city: text(),
    state: text(),
    currentBusiness: text(200),
    investment: z.string().min(1, te("select")).max(40, te("tooLong")),
    message:
      kind === "contact"
        ? z.string().trim().min(10, te("messageMin")).max(2000, te("tooLong"))
        : optionalText(2000),
  };

  const fields = formFields[kind].map((field) => field.name);
  return z.object(Object.fromEntries(fields.map((name) => [name, shape[name]])));
}

export function emptyValues(kind: FormKind): Record<string, string> {
  return Object.fromEntries(formFields[kind].map((field) => [field.name, ""]));
}
