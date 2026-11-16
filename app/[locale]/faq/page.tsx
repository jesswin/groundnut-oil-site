import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { PageHero } from "@/components/sections/page-hero";
import { Link } from "@/i18n/navigation";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { faqCategories, faqs, t, type FaqCategoryId } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  const tf = await getTranslations({ locale, namespace: "faq" });
  return buildMetadata({
    locale,
    path: "/faq",
    title: tf("title"),
    description: tf("description"),
  });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tf = await getTranslations({ locale, namespace: "faq" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <PageHero
        title={tf("title")}
        text={tf("description")}
        crumbs={[{ name: tf("title"), path: "/faq" }]}
      />

      <section className="section">
        <div className="container-page max-w-3xl space-y-14">
          {(Object.keys(faqCategories) as FaqCategoryId[]).map((category) => {
            const items = faqs.filter((faq) => faq.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="mb-5 text-2xl sm:text-3xl">{t(faqCategories[category], locale)}</h2>
                <FaqAccordion
                  items={items.map((faq) => ({
                    question: t(faq.question, locale),
                    answer: t(faq.answer, locale),
                  }))}
                />
              </div>
            );
          })}

          <div className="bg-gold-soft rounded-3xl p-8 text-center sm:p-10">
            <h2 className="text-2xl sm:text-3xl">{tf("moreTitle")}</h2>
            <p className="text-brown mt-3 text-lg">{tf("moreText")}</p>
            <Link href="/contact" className="btn btn-brown mt-6">
              {tc("contactUs")}
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(locale)} />
    </>
  );
}
