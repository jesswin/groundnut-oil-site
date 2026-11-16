import { Fraunces, Inter, Noto_Sans_Devanagari, Noto_Sans_Gujarati } from "next/font/google";
import type { Locale } from "@/i18n/locales";

/** Body font for Latin text (also used for digits and Latin words inside Hindi/Gujarati pages). */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

/** Serif display font for English headings. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-indic",
  display: "swap",
  preload: false,
});

const gujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-indic",
  display: "swap",
  preload: false,
});

/**
 * Font CSS-variable classes for a locale. globals.css maps these variables to the body and
 * heading font stacks based on <html lang>. To add a language, add its font here.
 */
export function fontClasses(locale: Locale): string {
  switch (locale) {
    case "hi":
      return `${inter.variable} ${devanagari.variable}`;
    case "gu":
      return `${inter.variable} ${gujarati.variable}`;
    default:
      return `${inter.variable} ${fraunces.variable}`;
  }
}
