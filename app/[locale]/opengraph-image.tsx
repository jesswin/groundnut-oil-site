import { ImageResponse } from "next/og";
import { locales } from "@/i18n/locales";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Dynamic social-share image, generated per locale at /<locale>/opengraph-image.
 *
 * The text inside the image uses the English brand name and tagline for every locale.
 * The image renderer (Satori) cannot shape Devanagari or Gujarati conjuncts, so Hindi and
 * Gujarati text would be drawn incorrectly. The og:title, og:description and image alt text
 * in the page metadata are fully localized (see lib/seo.ts).
 * TODO: for a localized share image, export designed PNGs and return them here per locale.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px 88px",
        background: "#F7F4EE",
        borderLeft: "28px solid #A8874A",
        color: "#1D1B17",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="72" height="72" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="14" fill="#3B332A" />
          <path d="M32 10c9 12 15 20 15 29a15 15 0 0 1-30 0c0-9 6-17 15-29z" fill="#A8874A" />
        </svg>
        <div style={{ fontSize: 34, color: "#3C4636", fontWeight: 700 }}>
          {`Since ${siteConfig.establishedYear} · FSSAI ${siteConfig.certifications.fssai}`}
        </div>
      </div>
      <div style={{ fontSize: 92, fontWeight: 700, marginTop: 36, lineHeight: 1.2 }}>
        {siteConfig.brandName.en}
      </div>
      <div style={{ fontSize: 44, marginTop: 20, color: "#3B332A", lineHeight: 1.4 }}>
        {siteConfig.tagline.en}
      </div>
    </div>,
    size,
  );
}
