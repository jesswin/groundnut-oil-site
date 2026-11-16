import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { getPostSlugs } from "@/lib/blog";
import { languageAlternates, localeUrl } from "@/lib/seo";
import { products } from "@/lib/site-config";

const staticPaths = [
  "",
  "/about",
  "/products",
  "/process",
  "/quality",
  "/bulk-orders",
  "/distributor",
  "/contact",
  "/faq",
  "/blog",
  "/privacy-policy",
  "/terms",
];

/** Every page in every language, each with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...products.map((product) => `/products/${product.slug}`),
    ...getPostSlugs().map((slug) => `/blog/${slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      changeFrequency: path.startsWith("/blog") ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/products") ? 0.9 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
