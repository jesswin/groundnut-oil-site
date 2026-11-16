import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { StatsBand } from "@/components/sections/stats-band";
import { getFormOptions } from "@/lib/form-options";
import { buildMetadata } from "@/lib/seo";
import { distributorBenefits } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/distributor">) {
  const { locale } = await params;
  const td = await getTranslations({ locale, namespace: "distributor" });
  return buildMetadata({
    locale,
    path: "/distributor",
    title: td("title"),
    description: td("description"),
  });
}

export default async function DistributorPage({ params }: PageProps<"/[locale]/distributor">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const td = await getTranslations({ locale, namespace: "distributor" });

  return (
    <>
      <PageHero
        title={td("title")}
        text={td("intro")}
        crumbs={[{ name: td("title"), path: "/distributor" }]}
      />

      <section className="section">
        <div className="container-page">
          <h2 className="mb-10 text-3xl sm:text-4xl">{td("benefitsTitle")}</h2>
          <FeatureGrid items={distributorBenefits} />
        </div>
      </section>

      <StatsBand />

      <section className="section bg-cream-dark/60">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl sm:text-4xl">{td("formTitle")}</h2>
          <p className="text-stone mt-4 text-lg">{td("formText")}</p>
          <div className="card-surface mt-8 p-6 sm:p-9">
            <EnquiryForm kind="distributor" options={getFormOptions(locale)} />
          </div>
        </div>
      </section>
    </>
  );
}
