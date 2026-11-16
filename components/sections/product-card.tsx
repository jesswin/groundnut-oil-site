import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface ProductCardData {
  slug: string;
  name: string;
  shortDescription: string;
  typeLabel: string;
  image: string;
  imageAlt: string;
  packLabels: string[];
}

/** Product card. Plain props only, so it works in server and client components. */
export function ProductCard({ product, cta }: { product: ProductCardData; cta: string }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="bg-cream-dark relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="eyebrow">{product.typeLabel}</p>
        <h3 className="mt-2 text-2xl">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="text-stone mt-2">{product.shortDescription}</p>
        <ul className="text-stone mt-4 flex flex-wrap gap-x-2 gap-y-1 text-sm">
          {product.packLabels.map((label) => (
            <li
              key={label}
              className="not-last:after:text-gold not-last:after:ml-2 not-last:after:content-['·']"
            >
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-6" aria-hidden="true">
          <span className="link-line caps">
            {cta}
            <ArrowRight className="size-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </p>
      </div>
    </article>
  );
}
