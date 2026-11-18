import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { Locale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { fontClasses } from "@/lib/fonts";
import { buildMetadata, localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-config";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#3B332A" };

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return { metadataBase: new URL(getSiteUrl()), ...buildMetadata({ locale }) };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tn = await getTranslations({ locale, namespace: "nav" });

  return (
    <html lang={locale} className={`${fontClasses(locale as Locale)} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="bg-brown text-cream sr-only z-50 rounded-sm px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {tn("skipToContent")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </NextIntlClientProvider>
        <JsonLd data={organizationJsonLd(locale)} />
        <JsonLd data={localBusinessJsonLd(locale)} />
      </body>
    </html>
  );
}
