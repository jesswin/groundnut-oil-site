import { ArrowLeft, Info } from "lucide-react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Link } from "@/i18n/navigation";
import { localeTags, type Locale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/blog";
import { buildMetadata, localeUrl } from "@/lib/seo";
import { getSiteUrl, siteConfig, t } from "@/lib/site-config";

type Props = PageProps<"/[locale]/blog/[slug]">;

/** Unknown slugs return a real 404 instead of rendering on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getPostSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();

  const tb = await getTranslations({ locale, namespace: "blog" });
  const date = formatPostDate(post.date, localeTags[locale as Locale]);

  return (
    <>
      <PageHero
        title={post.title}
        text={`${tb("publishedOn", { date })} · ${tb("minRead", { minutes: post.readingMinutes })}`}
        crumbs={[
          { name: tb("title"), path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article className="section">
        <div className="container-page max-w-3xl">
          {post.isFallback && (
            <p
              role="note"
              className="border-gold bg-gold-soft text-brown-dark mb-8 flex items-start gap-3 rounded-xl border p-4"
            >
              <Info aria-hidden="true" className="mt-1 size-5 shrink-0" />
              {tb("fallbackNotice")}
            </p>
          )}
          <Image
            src={post.image}
            alt=""
            width={1200}
            height={675}
            priority
            sizes="(min-width: 768px) 720px, 92vw"
            className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover"
          />
          <div
            lang={post.isFallback ? post.contentLocale : undefined}
            className="prose prose-lg prose-headings:font-heading prose-headings:text-brown-dark prose-p:text-ink prose-li:text-ink prose-strong:text-brown-dark prose-a:text-leaf-dark prose-blockquote:border-gold prose-blockquote:text-stone prose-th:text-brown-dark prose-td:text-ink max-w-none"
          >
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
          <Link href="/blog" className="btn btn-outline mt-12">
            <ArrowLeft aria-hidden="true" className="size-5" />
            {tb("backToBlog")}
          </Link>
        </div>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: localeTags[post.contentLocale as Locale],
          image: `${getSiteUrl()}${post.image}`,
          mainEntityOfPage: localeUrl(locale, `/blog/${post.slug}`),
          author: { "@type": "Organization", name: t(siteConfig.brandName, locale) },
          publisher: { "@id": `${getSiteUrl()}/#organization` },
        }}
      />
    </>
  );
}
