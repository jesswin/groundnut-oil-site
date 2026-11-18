"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductCard, type ProductCardData } from "./product-card";

export interface FilterableProduct extends ProductCardData {
  type: string;
  packSizeIds: string[];
  packImages: Record<string, { src: string; alt: string }>;
}
interface Choice {
  id: string;
  label: string;
}

function FilterGroup({
  legend,
  choices,
  value,
  onChange,
  allLabel,
}: {
  legend: string;
  choices: Choice[];
  value: string;
  onChange: (id: string) => void;
  allLabel: string;
}) {
  return (
    <fieldset>
      <legend className="text-brown-dark mb-2 font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {[{ id: "", label: allLabel }, ...choices].map((choice) => (
          <button
            key={choice.id}
            type="button"
            aria-pressed={value === choice.id}
            onClick={() => onChange(choice.id)}
            className={cn(
              "border-input text-brown-dark hover:border-brown min-h-11 rounded-sm border bg-transparent px-4 text-base font-medium transition-colors",
              value === choice.id && "border-brown bg-brown text-cream",
            )}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** Product grid with client-side filters for type and pack size. */
export function ProductFilter({
  products,
  types,
  packs,
}: {
  products: FilterableProduct[];
  types: Choice[];
  packs: Choice[];
}) {
  const tp = useTranslations("products");
  const tc = useTranslations("common");
  const [type, setType] = useState("");
  const [pack, setPack] = useState("");

  const visible = products.filter(
    (product) => (!type || product.type === type) && (!pack || product.packSizeIds.includes(pack)),
  );

  return (
    <div>
      <section
        aria-label={tp("filtersLabel")}
        className="card-surface grid gap-6 p-5 sm:p-7 lg:grid-cols-2"
      >
        <FilterGroup
          legend={tp("filterType")}
          choices={types}
          value={type}
          onChange={setType}
          allLabel={tp("all")}
        />
        <FilterGroup
          legend={tp("filterPack")}
          choices={packs}
          value={pack}
          onChange={setPack}
          allLabel={tp("all")}
        />
      </section>

      <p role="status" className="text-stone mt-6">
        {tp("count", { count: visible.length })}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => {
            const packImage = pack ? product.packImages[pack] : undefined;
            const card = packImage
              ? { ...product, image: packImage.src, imageAlt: packImage.alt }
              : product;
            return (
              <li key={product.slug}>
                <ProductCard product={card} cta={tc("viewDetails")} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="card-surface mt-4 p-10 text-center">
          <p className="text-lg">{tp("noResults")}</p>
          <button
            type="button"
            className="btn btn-outline mt-5"
            onClick={() => {
              setType("");
              setPack("");
            }}
          >
            {tp("clearFilters")}
          </button>
        </div>
      )}
    </div>
  );
}
