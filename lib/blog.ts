import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, locales } from "@/i18n/locales";

/**
 * Blog posts are MDX files in /content/blog/<locale>/<slug>.mdx with this frontmatter:
 *   title, description, date (YYYY-MM-DD), image
 * The file name is the URL slug and must be the same in every language. If a post has no
 * file for a language, the English version is shown with a notice.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  readingMinutes: number;
  /** Locale of the content actually shown. */
  contentLocale: string;
  /** True when the requested language is missing and English is shown instead. */
  isFallback: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function slugsIn(locale: string): string[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Every slug that exists in any language. */
export function getPostSlugs(): string[] {
  return [...new Set(locales.flatMap(slugsIn))].sort();
}

export function getPost(slug: string, locale: string): Post | null {
  // Slugs come from the URL: allow only simple file names.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  for (const contentLocale of [locale, defaultLocale]) {
    const file = path.join(BLOG_DIR, contentLocale, `${slug}.mdx`);
    if (!fs.existsSync(file)) continue;
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      image: String(data.image ?? "/images/placeholders/blog-health-benefits.svg"),
      readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
      contentLocale,
      isFallback: contentLocale !== locale,
      content,
    };
  }
  return null;
}

/** All posts for a language (with English fallbacks), newest first. */
export function getAllPosts(locale: string): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPost(slug, locale))
    .filter((post): post is Post => post !== null)
    .map((post) => {
      const { content, ...meta } = post;
      void content;
      return meta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(date: string, localeTag: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(localeTag, { dateStyle: "long", timeZone: "UTC" }).format(parsed);
}
