import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { Link } from "@/i18n/navigation";
import { localeTags, type Locale } from "@/i18n/locales";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  const tb = await getTranslations({ locale, namespace: "blog" });
  return buildMetadata({
    locale,
    path: "/blog",
    title: tb("title"),
    description: tb("description"),
  });
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tb = await getTranslations({ locale, namespace: "blog" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const posts = getAllPosts(locale);

  return (
    <>
      <PageHero
        title={tb("title")}
        text={tb("description")}
        crumbs={[{ name: tb("title"), path: "/blog" }]}
      />
      <section className="section">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-stone text-lg">{tb("empty")}</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article
                    lang={post.isFallback ? post.contentLocale : undefined}
                    className="card-surface group relative flex h-full flex-col overflow-hidden"
                  >
                    <div className="bg-cream-dark relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-stone text-sm">
                        <time dateTime={post.date}>
                          {formatPostDate(post.date, localeTags[locale as Locale])}
                        </time>
                        {" · "}
                        {tb("minRead", { minutes: post.readingMinutes })}
                      </p>
                      <h2 className="mt-2 text-xl">
                        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-stone mt-2">{post.description}</p>
                      <p className="text-brown mt-auto pt-5 font-semibold" aria-hidden="true">
                        {tc("readMore")} →
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
