import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Every route is prefixed: /en, /hi, /gu. "/" redirects to the detected locale.
  localePrefix: "always",
  // Detect the browser language on the first visit, then remember the choice for a year.
  localeDetection: true,
  localeCookie: { name: "NEXT_LOCALE", maxAge: 60 * 60 * 24 * 365 },
  // hreflang is emitted from the Metadata API (lib/seo.ts) instead of a Link header.
  alternateLinks: false,
});
