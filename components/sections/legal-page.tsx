import { useLocale, useTranslations } from "next-intl";
import { localeTags, type Locale } from "@/i18n/locales";
import { legal, t, type LegalSection } from "@/lib/site-config";
import { PageHero } from "./page-hero";

export function LegalPage({
  title,
  path,
  sections,
}: {
  title: string;
  path: string;
  sections: LegalSection[];
}) {
  const locale = useLocale();
  const tl = useTranslations("legal");
  const date = new Intl.DateTimeFormat(localeTags[locale as Locale], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${legal.lastUpdated}T00:00:00Z`));

  return (
    <>
      <PageHero title={title} text={tl("lastUpdated", { date })} crumbs={[{ name: title, path }]} />
      <section className="section">
        <div className="container-page max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.heading.en}>
              <h2 className="text-2xl">{t(section.heading, locale)}</h2>
              <p className="text-stone mt-3 text-lg">{t(section.body, locale)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
