/**
 * Supported locales. To add a language: add its code here, add /messages/<code>.json,
 * add a font in lib/fonts.ts, and fill in the new key on every Localized field in lib/site-config.ts
 * (TypeScript will flag every missing one).
 */
export const locales = ["en", "hi", "gu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Native names shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  gu: "ગુજરાતી",
};

/** BCP 47 tags used for <html lang>, hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  gu: "gu-IN",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
