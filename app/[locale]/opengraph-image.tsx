import { ImageResponse } from "next/og";
import { locales } from "@/i18n/locales";
import { products, siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.brandName.en} | ${siteConfig.tagline.en}`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const IVORY = "#F7F4EE";
const INK = "#1D1B17";
const BRASS = "#A8874A";
const STONE = "#6A6358";

/** Loads a Google font as TTF for the image renderer. Returns null if offline. */
async function loadFont(family: string, weight: number, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return src ? await fetch(src).then((res) => res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

/**
 * Social-share image (WhatsApp, Instagram, LinkedIn, X, iMessage...), generated per locale
 * at /<locale>/opengraph-image and used by every page through lib/seo.ts.
 *
 * The text in the image is English for every locale: the image renderer cannot shape
 * Devanagari or Gujarati conjuncts. The title and description shown next to the image in
 * share previews are fully localized.
 */
export default async function OpenGraphImage() {
  const brand = siteConfig.brandName.en;
  const tagline = siteConfig.tagline.en;
  const eyebrow = `EST. ${siteConfig.establishedYear}  ·  ${siteConfig.location.city.en.toUpperCase()}, ${siteConfig.location.state.en.toUpperCase()}`;
  const range = products.map((p) => p.name.en.replace(/^(Filtered|Refined) /, "")).join("  ·  ");

  const serif = await loadFont("Fraunces", 400, brand + tagline);
  const fonts = serif ? [{ name: "Serif", data: serif, weight: 400 as const }] : undefined;
  const serifFamily = serif ? "Serif" : "Georgia, serif";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 28,
        background: IVORY,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: `1.5px solid ${BRASS}`,
          color: INK,
        }}
      >
        <svg width="56" height="56" viewBox="0 0 64 64">
          <path
            d="M32 7c10 13 16 22 16 32a16 16 0 0 1-32 0c0-10 6-19 16-32z"
            fill="none"
            stroke={BRASS}
            strokeWidth="2.5"
          />
          <path
            d="M32 25c5 6.5 7.5 11 7.5 15a7.5 7.5 0 0 1-15 0c0-4 2.5-8.5 7.5-15z"
            fill={BRASS}
          />
        </svg>
        <div style={{ marginTop: 26, fontSize: 20, letterSpacing: 6, color: BRASS }}>{eyebrow}</div>
        <div
          style={{
            marginTop: 22,
            fontSize: 104,
            letterSpacing: 14,
            fontFamily: serifFamily,
            lineHeight: 1,
          }}
        >
          {brand}
        </div>
        <div style={{ marginTop: 34, width: 80, height: 1.5, background: BRASS }} />
        <div style={{ marginTop: 30, fontSize: 40, fontFamily: serifFamily, color: "#3B332A" }}>
          {tagline}
        </div>
        <div style={{ marginTop: 48, fontSize: 19, letterSpacing: 3, color: STONE }}>
          {range.toUpperCase()}
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
