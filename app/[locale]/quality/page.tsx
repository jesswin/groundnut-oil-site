import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildMetadata } from "@/lib/seo";
import { quality, siteConfig, t } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/quality">) {
  const { locale } = await params;
  const tq = await getTranslations({ locale, namespace: "quality" });
  return buildMetadata({
    locale,
    path: "/quality",
    title: tq("title"),
    description: tq("description"),
  });
}

export default async function QualityPage({ params }: PageProps<"/[locale]/quality">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tq = await getTranslations({ locale, namespace: "quality" });
  const th = await getTranslations({ locale, namespace: "home" });
  const { certifications } = siteConfig;

  return (
    <>
      <PageHero
        title={tq("title")}
        text={t(quality.intro, locale)}
        crumbs={[{ name: tq("title"), path: "/quality" }]}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow={tq("certEyebrow")} title={tq("certTitle")} className="mb-12" />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="card-surface border-l-leaf border-l-4 p-7 sm:p-9">
              <h3 className="text-2xl">{tq("fssaiTitle")}</h3>
              <p className="text-stone mt-3 text-lg">{t(quality.fssaiInfo, locale)}</p>
              <dl className="mt-6">
                <dt className="text-stone text-sm font-medium">{tq("fssaiNumber")}</dt>
                <dd className="font-heading text-brown-dark text-2xl font-semibold tracking-wider break-all sm:text-3xl">
                  {certifications.fssai}
                </dd>
              </dl>
            </div>
            <div className="grid gap-6">
              <div className="card-surface p-7">
                <h3 className="text-xl">{tq("gstTitle")}</h3>
                <p className="text-brown-dark mt-2 text-lg font-semibold tracking-wide break-all">
                  {certifications.gst}
                </p>
              </div>
              <div className="card-surface p-7">
                <h3 className="text-xl">{tq("otherTitle")}</h3>
                <ul className="mt-3 space-y-2">
                  {certifications.others.map((cert) => (
                    <li
                      key={cert}
                      className="text-brown-dark flex items-center gap-2.5 text-lg font-medium"
                    >
                      <BadgeCheck aria-hidden="true" className="text-leaf size-6 shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream-dark/60">
        <div className="container-page">
          <div className="mb-12 grid items-center gap-10 lg:grid-cols-2">
            <SectionHeading eyebrow={tq("labEyebrow")} title={tq("labTitle")} align="left" />
            <Image
              src={quality.labImage}
              alt=""
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 520px, 90vw"
              className="aspect-[3/2] w-full rounded-3xl object-cover"
            />
          </div>
          <FeatureGrid items={quality.labTests} />
        </div>
      </section>

      <CtaBand title={th("finalTitle")} text={th("finalText")} />
    </>
  );
}
