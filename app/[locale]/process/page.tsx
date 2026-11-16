import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-steps";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/process">) {
  const { locale } = await params;
  const tp = await getTranslations({ locale, namespace: "process" });
  return buildMetadata({
    locale,
    path: "/process",
    title: tp("title"),
    description: tp("description"),
  });
}

export default async function ProcessPage({ params }: PageProps<"/[locale]/process">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tp = await getTranslations({ locale, namespace: "process" });

  return (
    <>
      <PageHero
        title={tp("title")}
        text={tp("intro")}
        crumbs={[{ name: tp("title"), path: "/process" }]}
      />
      <section className="section">
        <div className="container-page">
          <ProcessTimeline />
        </div>
      </section>
      <CtaBand title={tp("ctaTitle")} text={tp("ctaText")} />
    </>
  );
}
