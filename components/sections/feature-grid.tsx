import { useLocale } from "next-intl";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { t, type Feature } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Grid of icon + title + description cards (why choose us, benefits, lab tests). */
export function FeatureGrid({ items, columns = 4 }: { items: Feature[]; columns?: 2 | 4 }) {
  const locale = useLocale();
  return (
    <ul className={cn("grid gap-x-10 gap-y-12 sm:grid-cols-2", columns === 4 && "lg:grid-cols-4")}>
      {items.map((item, index) => (
        <li key={item.icon + index}>
          <Reveal delay={index * 0.06} className="h-full">
            <div className="border-brown-dark/20 h-full border-t pt-7">
              <span className="text-gold-deep inline-flex">
                <Icon name={item.icon} className="size-8 stroke-[1.25]" />
              </span>
              <h3 className="mt-6 text-2xl">{t(item.title, locale)}</h3>
              <p className="text-stone mt-3">{t(item.description, locale)}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
