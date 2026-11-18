import type { ProductCardData } from "@/components/sections/product-card";
import { packSizes, productTypes, t, type PackSizeId, type Product } from "@/lib/site-config";

/** Flatten a product to the localized strings a ProductCard needs. */
export function toProductCard(product: Product, locale: string): ProductCardData {
  return {
    slug: product.slug,
    name: t(product.name, locale),
    shortDescription: t(product.shortDescription, locale),
    typeLabel: t(productTypes[product.type], locale),
    image: product.images[0].src,
    imageAlt: t(product.images[0].alt, locale),
    packLabels: product.packSizes.map((id) => t(packSizes[id], locale)),
  };
}

/** One tin photo per product serves both tin filters: a missing 15 L or 15 kg photo uses the other. */
const PACK_FALLBACK: Partial<Record<PackSizeId, PackSizeId>> = {
  "15l-tin": "15kg-tin",
  "15kg-tin": "15l-tin",
};

/** Photo per pack size, for swapping card images when a pack filter is selected. */
export function packImages(
  product: Product,
  locale: string,
): Record<string, { src: string; alt: string }> {
  const byPack: Record<string, { src: string; alt: string }> = {};
  for (const image of product.images) {
    if (image.pack) byPack[image.pack] = { src: image.src, alt: t(image.alt, locale) };
  }
  for (const id of product.packSizes) {
    const fallback = PACK_FALLBACK[id];
    if (!byPack[id] && fallback && byPack[fallback]) byPack[id] = byPack[fallback];
  }
  return byPack;
}
