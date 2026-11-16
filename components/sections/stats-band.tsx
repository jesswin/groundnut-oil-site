import { useLocale, useTranslations } from "next-intl";
import { siteConfig, t } from "@/lib/site-config";

export function StatsBand() {
  const locale = useLocale();
  const th = useTranslations("home");

  return (
    <section aria-label={th("statsTitle")} className="border-line border-y">
      <dl className="container-page grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4 lg:py-16">
        {siteConfig.stats.map((stat) => (
          <div
            key={stat.value + t(stat.label, "en")}
            className="border-line flex flex-col-reverse px-3 text-center lg:border-l lg:first:border-l-0"
          >
            <dt className="caps text-stone mt-3">{t(stat.label, locale)}</dt>
            <dd className="font-heading text-brown-dark text-4xl font-normal sm:text-6xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
