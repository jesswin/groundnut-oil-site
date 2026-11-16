import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { JsonLd } from "@/components/json-ld";
import { Link } from "@/i18n/navigation";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

/** Title band for inner pages, with visible breadcrumbs and BreadcrumbList JSON-LD. */
export function PageHero({
  title,
  text,
  crumbs,
}: {
  title: string;
  text?: string;
  /** Trail after "Home"; the last item is the current page. */
  crumbs: Crumb[];
}) {
  const locale = useLocale();
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const trail: Crumb[] = [{ name: tn("home"), path: "" }, ...crumbs];

  return (
    <section className="bg-cream-dark texture-grain border-line border-b">
      <div className="container-page py-14 sm:py-20">
        <nav aria-label={tc("breadcrumb")}>
          <ol className="text-stone flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
            {trail.map((crumb, index) => {
              const last = index === trail.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight aria-hidden="true" className="size-4" />}
                  {last ? (
                    <span aria-current="page" className="text-brown-dark font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path || "/"} className="underline-offset-4 hover:underline">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="text-stone mt-5 max-w-2xl text-lg">{text}</p>}
      </div>
      <JsonLd data={breadcrumbJsonLd(locale, trail)} />
    </section>
  );
}
