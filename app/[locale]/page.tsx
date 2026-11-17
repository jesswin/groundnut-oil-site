import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsAppIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ProcessPreview } from "@/components/sections/process-steps";
import { ProductCard } from "@/components/sections/product-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { Testimonials } from "@/components/sections/testimonials";
import { Link } from "@/i18n/navigation";
import { toProductCard } from "@/lib/product-view";
import { buildMetadata } from "@/lib/seo";
import {
  faqs,
  heroImage,
  products,
  siteConfig,
  t,
  testimonials,
  whatsappUrl,
  whyChooseUs,
} from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return buildMetadata({ locale });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const th = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      {/* Hero */}
      <section className="texture-grain relative overflow-hidden">
        <div className="container-page grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-28">
          <div>
            <p className="eyebrow flex items-center gap-4">
              <span aria-hidden="true" className="bg-gold h-px w-10" />
              {tc("since", { year: String(siteConfig.establishedYear) })} · {th("heroBadge")}
            </p>
            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              {t(siteConfig.tagline, locale)}
            </h1>
            <p className="text-stone mt-7 max-w-xl text-lg">{t(siteConfig.description, locale)}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/bulk-orders" className="btn btn-brown">
                {tc("enquireBulk")}
                <ArrowRight aria-hidden="true" className="size-4 stroke-[1.5]" />
              </Link>
              <a
                href={whatsappUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon className="size-5" />
                {tc("whatsappUs")}
              </a>
            </div>
            <ul className="caps border-line text-stone mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t pt-6">
              <li>FSSAI {siteConfig.certifications.fssai}</li>
              {siteConfig.certifications.others.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
          <div className="relative order-first mx-auto w-full max-w-[15rem] sm:max-w-xs lg:order-none lg:max-w-none">
            <div
              aria-hidden="true"
              className="border-gold/60 absolute -inset-3 rounded-t-full border sm:-inset-4"
            />
            <Image
              src={heroImage.src}
              alt={t(heroImage.alt, locale)}
              width={900}
              height={1000}
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="bg-cream-dark relative aspect-[4/5] w-full rounded-t-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section bg-cream-dark/50">
        <div className="container-page">
          <SectionHeading eyebrow={th("whyEyebrow")} title={th("whyTitle")} className="mb-16" />
          <FeatureGrid items={whyChooseUs} />
        </div>
      </section>

      {/* Featured products */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={th("featuredEyebrow")}
            title={th("featuredTitle")}
            text={th("featuredText")}
            className="mb-12"
          />
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((product) => product.featured)
              .map((product, index) => (
                <li key={product.slug}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <ProductCard product={toProductCard(product, locale)} cta={tc("viewDetails")} />
                  </Reveal>
                </li>
              ))}
          </ul>
          <div className="mt-16 text-center">
            <Link href="/products" className="btn btn-outline">
              {tc("viewAllProducts")}
            </Link>
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="section bg-brown-dark texture-grain">
        <div className="container-page">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="eyebrow text-gold mb-4">{th("processEyebrow")}</p>
            <h2 className="text-cream text-3xl sm:text-4xl lg:text-[2.75rem]">
              {th("processTitle")}
            </h2>
            <p className="text-cream/75 mt-5 text-lg">{th("processText")}</p>
          </div>
          <ProcessPreview />
          <div className="mt-16 text-center">
            <Link href="/process" className="btn btn-outline-light">
              {th("processCta")}
            </Link>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container-page">
            <SectionHeading
              eyebrow={th("testimonialsEyebrow")}
              title={th("testimonialsTitle")}
              className="mb-12"
            />
            <Testimonials
              items={testimonials.map((item) => ({
                name: t(item.name, locale),
                role: t(item.role, locale),
                quote: t(item.quote, locale),
                rating: item.rating,
                ratingLabel: tc("rating", { rating: item.rating }),
              }))}
              labels={{
                region: th("testimonialsTitle"),
                previous: th("previous"),
                next: th("next"),
              }}
            />
          </div>
        </section>
      )}

      {/* Distributor band */}
      <section className="bg-leaf-dark texture-grain">
        <div className="container-page flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-white sm:text-4xl">{th("distributorTitle")}</h2>
            <p className="mt-3 text-lg text-white/90">{th("distributorText")}</p>
          </div>
          <Link href="/distributor" className="btn btn-gold shrink-0">
            {tc("becomeDistributor")}
            <ArrowRight aria-hidden="true" className="size-4 stroke-[1.5]" />
          </Link>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section bg-cream-dark/60">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow={th("faqEyebrow")} title={th("faqTitle")} className="mb-10" />
          <FaqAccordion
            items={faqs.slice(0, 4).map((faq) => ({
              question: t(faq.question, locale),
              answer: t(faq.answer, locale),
            }))}
          />
          <div className="mt-12 text-center">
            <Link href="/faq" className="btn btn-outline">
              {th("faqCta")}
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title={th("finalTitle")} text={th("finalText")} />
    </>
  );
}
