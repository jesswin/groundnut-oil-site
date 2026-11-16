"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Main image with thumbnail buttons. */
export function ProductGallery({
  images,
  label,
  thumbLabels,
}: {
  images: { src: string; alt: string }[];
  label: string;
  thumbLabels: string[];
}) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div role="group" aria-label={label}>
      <div className="bg-cream-dark relative aspect-square overflow-hidden rounded-3xl">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 520px, 92vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={thumbLabels[index]}
                aria-pressed={index === active}
                className={cn(
                  "border-line relative block size-20 overflow-hidden rounded-xl border-2 sm:size-24",
                  index === active && "border-brown",
                )}
              >
                <Image src={image.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
