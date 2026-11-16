import type { FormOptions } from "@/components/forms/enquiry-form";
import { investmentRanges, orderFrequencies, products, t } from "@/lib/site-config";

/** Localized select options for the enquiry forms, built from site-config. */
export function getFormOptions(locale: string): Required<FormOptions> {
  return {
    products: products.map((p) => ({ value: p.slug, label: t(p.name, locale) })),
    frequencies: orderFrequencies.map((o) => ({ value: o.id, label: t(o.label, locale) })),
    investments: investmentRanges.map((o) => ({ value: o.id, label: t(o.label, locale) })),
  };
}
