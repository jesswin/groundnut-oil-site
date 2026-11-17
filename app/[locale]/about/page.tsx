import { Check } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { buildMetadata } from "@/lib/seo";
import { about, t, team, timeline } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const ta = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({
    locale,
    path: "/about",
    title: ta("title"),
    description: ta("description"),
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ta = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <PageHero
        title={ta("title")}
        text={ta("description")}
        crumbs={[{ name: ta("title"), path: "/about" }]}
      />

      {/* Story */}
      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div aria-hidden="true" className="border-gold/60 absolute -inset-3 border" />
            <Image
              src={about.storyImage}
              alt=""
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 520px, 90vw"
              className="relative aspect-[4/3] w-full rounded-3xl object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow={ta("eyebrow")} title={ta("storyTitle")} align="left" />
            <div className="text-stone mt-6 space-y-4 text-lg">
              {t(about.story, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="section bg-cream-dark/60">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { title: ta("missionTitle"), text: t(about.mission, locale) },
            { title: ta("visionTitle"), text: t(about.vision, locale) },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="h-full">
              <div className="card-surface border-l-gold h-full border-l-4 p-7 sm:p-9">
                <h2 className="text-2xl sm:text-3xl">{item.title}</h2>
                <p className="text-stone mt-4 text-lg">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Founders */}
      {team.length > 0 && (
        <section className="section">
          <div className="container-page">
            <SectionHeading eyebrow={ta("teamEyebrow")} title={ta("teamTitle")} className="mb-12" />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <li key={member.image}>
                  <Reveal delay={index * 0.06}>
                    <div className="text-center">
                      <Image
                        src={member.image}
                        alt=""
                        width={600}
                        height={600}
                        sizes="220px"
                        className="blob mx-auto size-48 object-cover sm:size-56"
                      />
                      <h3 className="mt-6 text-xl">{t(member.name, locale)}</h3>
                      <p className="text-leaf-dark font-semibold">{t(member.role, locale)}</p>
                      <p className="text-stone mx-auto mt-3 max-w-xs">{t(member.bio, locale)}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <StatsBand />

      {/* Factory */}
      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={ta("factoryEyebrow")}
              title={ta("factoryTitle")}
              align="left"
            />
            <p className="text-stone mt-6 text-lg">{t(about.factory.description, locale)}</p>
            <ul className="mt-6 space-y-3">
              {t(about.factory.highlights, locale).map((item) => (
                <li
                  key={item}
                  className="text-brown-dark flex items-start gap-3 text-lg font-medium"
                >
                  <Check aria-hidden="true" className="text-leaf mt-1 size-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={about.factory.image}
            alt=""
            width={1200}
            height={800}
            sizes="(min-width: 1024px) 520px, 90vw"
            className="aspect-[3/2] w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="section bg-cream-dark/60">
          <div className="container-page max-w-3xl">
            <SectionHeading
              eyebrow={ta("timelineEyebrow")}
              title={ta("timelineTitle")}
              className="mb-12"
            />
            <ol className="border-gold relative space-y-10 border-l-2 pl-8">
              {timeline.map((item) => (
                <li key={item.year} className="relative">
                  <span
                    aria-hidden="true"
                    className="bg-gold ring-cream absolute top-1.5 -left-[2.6rem] size-4 rounded-full ring-4"
                  />
                  <Reveal>
                    <p className="font-heading text-leaf-dark text-2xl font-semibold">
                      {item.year}
                    </p>
                    <h3 className="mt-1 text-xl">{t(item.title, locale)}</h3>
                    <p className="text-stone mt-2 text-lg">{t(item.description, locale)}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
