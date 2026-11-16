import { CalendarClock, Check, Warehouse } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { WhatsAppIcon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ProductGallery } from "@/components/sections/product-gallery";
import { routing } from "@/i18n/routing";
import { getFormOptions } from "@/lib/form-options";
import { toProductCard } from "@/lib/product-view";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { getProduct, packSizes, products, productTypes, t, whatsappUrl } from "@/lib/site-config";

type Props = PageProps<"/[locale]/products/[slug]">;

/** Every locale × product is prerendered. Unknown slugs return a real 404 instead of rendering on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    locale,
    path: `/products/${slug}`,
    title: t(product.name, locale),
    description: t(product.shortDescription, locale),
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const tp = await getTranslations({ locale, namespace: "products" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const name = t(product.name, locale);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={name}
        text={t(product.shortDescription, locale)}
        crumbs={[
          { name: tp("title"), path: "/products" },
          { name, path: `/products/${product.slug}` },
        ]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery
            label={tp("galleryLabel")}
            images={product.images.map((image) => ({ src: image.src, alt: t(image.alt, locale) }))}
            thumbLabels={product.images.map((_, index) => tp("showImage", { number: index + 1 }))}
          />

          <div>
            <p className="bg-leaf-dark inline-block rounded-sm px-3 py-1 text-sm font-semibold text-white">
              <span className="sr-only">{tp("typeLabel")}: </span>
              {t(productTypes[product.type], locale)}
            </p>
            <h2 className="mt-5 text-2xl sm:text-3xl">{tp("detailsTitle")}</h2>
            <p className="text-stone mt-3 text-lg">{t(product.longDescription, locale)}</p>

            <h3 className="mt-8 text-xl">{tp("packSizesTitle")}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.packSizes.map((id) => (
                <li
                  key={id}
                  className="border-brown/30 bg-card text-brown-dark rounded-sm border px-4 py-1.5 font-medium"
                >
                  {t(packSizes[id], locale)}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xl">{tp("usesTitle")}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {t(product.uses, locale).map((use) => (
                <li key={use} className="flex items-start gap-2.5">
                  <Check aria-hidden="true" className="text-leaf mt-1.5 size-5 shrink-0" />
                  {use}
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card-surface p-5">
                <dt className="text-brown-dark flex items-center gap-2 font-semibold">
                  <CalendarClock aria-hidden="true" className="text-leaf-dark size-5" />
                  {tp("shelfLifeTitle")}
                </dt>
                <dd className="text-stone mt-2">{t(product.shelfLife, locale)}</dd>
              </div>
              <div className="card-surface p-5">
                <dt className="text-brown-dark flex items-center gap-2 font-semibold">
                  <Warehouse aria-hidden="true" className="text-leaf-dark size-5" />
                  {tp("storageTitle")}
                </dt>
                <dd className="text-stone mt-2">{t(product.storage, locale)}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="btn btn-gold">
                {tc("requestQuote")}
              </a>
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
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section className="section bg-cream-dark/60">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl sm:text-3xl">{tp("nutritionTitle")}</h2>
          <div className="card-surface mt-6 overflow-hidden">
            <table className="w-full text-left">
              <caption className="text-stone caption-bottom px-5 py-3 text-left text-sm">
                {tp("nutritionNote")}
              </caption>
              <thead className="bg-brown text-cream">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    {tp("nutrient")}
                  </th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">
                    {tp("amount")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.nutrition.map((row) => (
                  <tr key={row.label.en} className="border-line border-t">
                    <th scope="row" className="px-5 py-3 font-medium">
                      {t(row.label, locale)}
                    </th>
                    <td className="px-5 py-3 text-right whitespace-nowrap tabular-nums">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="section scroll-mt-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl sm:text-3xl">{tp("quoteTitle")}</h2>
          <p className="text-stone mt-3 text-lg">{tp("quoteText")}</p>
          <div className="card-surface mt-8 p-6 sm:p-9">
            <EnquiryForm
              kind="quote"
              options={getFormOptions(locale)}
              defaults={{ product: product.slug }}
            />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section bg-cream-dark/60">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl">{tp("relatedTitle")}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={toProductCard(item, locale)} cta={tc("viewDetails")} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd data={productJsonLd(product, locale)} />
    </>
  );
}
