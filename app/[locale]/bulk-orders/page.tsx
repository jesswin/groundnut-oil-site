import { PackageCheck, Truck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { getFormOptions } from "@/lib/form-options";
import { buildMetadata } from "@/lib/seo";
import { bulkBenefits, siteConfig, t } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/bulk-orders">) {
  const { locale } = await params;
  const tb = await getTranslations({ locale, namespace: "bulk" });
  return buildMetadata({
    locale,
    path: "/bulk-orders",
    title: tb("title"),
    description: tb("description"),
  });
}

export default async function BulkOrdersPage({ params }: PageProps<"/[locale]/bulk-orders">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tb = await getTranslations({ locale, namespace: "bulk" });

  return (
    <>
      <PageHero
        title={tb("title")}
        text={tb("intro")}
        crumbs={[{ name: tb("title"), path: "/bulk-orders" }]}
      />

      <section className="section">
        <div className="container-page">
          <h2 className="mb-10 text-3xl sm:text-4xl">{tb("benefitsTitle")}</h2>
          <FeatureGrid items={bulkBenefits} />
        </div>
      </section>

      <section className="section bg-cream-dark/60">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <div>
            <h2 className="text-3xl sm:text-4xl">{tb("formTitle")}</h2>
            <p className="text-stone mt-4 text-lg">{tb("formText")}</p>
            <ul className="mt-8 space-y-4">
              <li className="card-surface flex gap-4 p-5">
                <PackageCheck aria-hidden="true" className="text-leaf-dark mt-1 size-6 shrink-0" />
                <div>
                  <h2 className="text-brown-dark font-sans text-base font-semibold">
                    {tb("moqTitle")}
                  </h2>
                  <p className="text-stone">{t(siteConfig.b2b.moq, locale)}</p>
                </div>
              </li>
              <li className="card-surface flex gap-4 p-5">
                <Truck aria-hidden="true" className="text-leaf-dark mt-1 size-6 shrink-0" />
                <div>
                  <h2 className="text-brown-dark font-sans text-base font-semibold">
                    {tb("deliveryTitle")}
                  </h2>
                  <p className="text-stone">{t(siteConfig.b2b.delivery, locale)}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="card-surface p-6 sm:p-9">
            <EnquiryForm kind="bulk" options={getFormOptions(locale)} />
          </div>
        </div>
      </section>
    </>
  );
}
