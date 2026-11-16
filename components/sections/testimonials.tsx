"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useRef } from "react";

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  rating: number;
  ratingLabel: string;
}

/**
 * Testimonials carousel built on native scroll-snap: it swipes on touch, scrolls with the
 * keyboard, and the buttons move one card at a time.
 */
export function Testimonials({
  items,
  labels,
}: {
  items: TestimonialItem[];
  labels: { region: string; previous: string; next: string };
}) {
  const track = useRef<HTMLUListElement>(null);

  function move(direction: 1 | -1) {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (card.offsetWidth + 20),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  const buttonClass =
    "border-brown text-brown-dark hover:bg-brown hover:text-cream inline-flex size-12 items-center justify-center rounded-full border transition-colors";

  return (
    <section aria-roledescription="carousel" aria-label={labels.region}>
      <ul
        ref={track}
        tabIndex={0}
        className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
          >
            <figure className="card-surface flex h-full flex-col p-7 sm:p-9">
              <Quote aria-hidden="true" className="text-gold size-7 stroke-[1.25]" />
              <div role="img" aria-label={item.ratingLabel} className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={
                      i < item.rating ? "fill-gold text-gold size-3.5" : "text-line size-3.5"
                    }
                  />
                ))}
              </div>
              <blockquote className="font-heading text-ink mt-5 flex-1 text-xl leading-relaxed">
                {item.quote}
              </blockquote>
              <figcaption className="border-line mt-6 border-t pt-4">
                <span className="text-brown-dark block font-medium">{item.name}</span>
                <span className="text-stone block text-sm">{item.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={labels.previous}
          className={buttonClass}
        >
          <ChevronLeft aria-hidden="true" className="size-5 stroke-[1.5]" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={labels.next}
          className={buttonClass}
        >
          <ChevronRight aria-hidden="true" className="size-5 stroke-[1.5]" />
        </button>
      </div>
    </section>
  );
}
