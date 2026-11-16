import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo";
import { legal } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  const tl = await getTranslations({ locale, namespace: "legal" });
  return buildMetadata({
    locale,
    path: "/terms",
    title: tl("termsTitle"),
    description: tl("termsDescription"),
  });
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tl = await getTranslations({ locale, namespace: "legal" });
  return <LegalPage title={tl("termsTitle")} path="/terms" sections={legal.terms} />;
}
