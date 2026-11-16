import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { processSteps, t } from "@/lib/site-config";

/** Compact six-step strip for the home page. */
export function ProcessPreview() {
  const locale = useLocale();
  return (
    <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((step, index) => (
        <li key={step.image}>
          <Reveal delay={(index % 3) * 0.06}>
            <div className="border-cream/20 border-t pt-6">
              <span className="text-gold font-heading text-3xl font-normal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-cream mt-4 text-2xl">{t(step.title, locale)}</h3>
              <p className="text-cream/75 mt-2">{t(step.description, locale)}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Full visual timeline for the process page. */
export function ProcessTimeline() {
  const locale = useLocale();
  const tp = useTranslations("process");

  return (
    <ol className="relative space-y-14 sm:space-y-20">
      <span
        aria-hidden="true"
        className="bg-line absolute top-2 bottom-2 left-6 w-0.5 lg:left-1/2 lg:-translate-x-1/2"
      />
      {processSteps.map((step, index) => (
        <li key={step.image} className="relative pl-16 lg:pl-0">
          <span className="bg-brown text-gold absolute top-0 left-0 z-10 flex size-12 items-center justify-center rounded-full lg:left-1/2 lg:-translate-x-1/2">
            <Icon name={step.icon} className="size-6" />
          </span>
          <Reveal>
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-24">
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <div className="bg-cream-dark relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 480px, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="eyebrow">{tp("step", { number: index + 1 })}</p>
                <h2 className="mt-2 text-2xl sm:text-3xl">{t(step.title, locale)}</h2>
                <p className="text-stone mt-3 text-lg">{t(step.description, locale)}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
