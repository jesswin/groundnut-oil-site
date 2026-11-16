import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo";
import { legal } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  const tl = await getTranslations({ locale, namespace: "legal" });
  return buildMetadata({
    locale,
    path: "/privacy-policy",
    title: tl("privacyTitle"),
    description: tl("privacyDescription"),
  });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tl = await getTranslations({ locale, namespace: "legal" });
  return <LegalPage title={tl("privacyTitle")} path="/privacy-policy" sections={legal.privacy} />;
}
