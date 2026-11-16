import type { ProductCardData } from "@/components/sections/product-card";
import { packSizes, productTypes, t, type Product } from "@/lib/site-config";

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
