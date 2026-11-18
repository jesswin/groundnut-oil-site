import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { ProductFilter } from "@/components/sections/product-filter";
import { packImages, toProductCard } from "@/lib/product-view";
import { buildMetadata } from "@/lib/seo";
import {
  packSizes,
  products,
  productTypes,
  t,
  type PackSizeId,
  type ProductType,
} from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  const tp = await getTranslations({ locale, namespace: "products" });
  return buildMetadata({
    locale,
    path: "/products",
    title: tp("title"),
    description: tp("description"),
  });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tp = await getTranslations({ locale, namespace: "products" });

  // Only offer filter choices that at least one product has.
  const usedTypes = (Object.keys(productTypes) as ProductType[]).filter((id) =>
    products.some((p) => p.type === id),
  );
  const usedPacks = (Object.keys(packSizes) as PackSizeId[]).filter((id) =>
    products.some((p) => p.packSizes.includes(id)),
  );

  return (
    <>
      <PageHero
        title={tp("title")}
        text={tp("description")}
        crumbs={[{ name: tp("title"), path: "/products" }]}
      />
      <section className="section">
        <div className="container-page">
          <ProductFilter
            products={products.map((p) => ({
              ...toProductCard(p, locale),
              type: p.type,
              packSizeIds: p.packSizes,
              packImages: packImages(p, locale),
            }))}
            types={usedTypes.map((id) => ({ id, label: t(productTypes[id], locale) }))}
            packs={usedPacks.map((id) => ({ id, label: t(packSizes[id], locale) }))}
          />
        </div>
      </section>
    </>
  );
}
