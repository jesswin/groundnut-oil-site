"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Copyright line with the current year, read in the browser so a static page never goes stale. */
export function Copyright({ brand, fallbackYear }: { brand: string; fallbackYear: number }) {
  const tf = useTranslations("footer");
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => fallbackYear,
  );
  return <p suppressHydrationWarning>{tf("rights", { year: String(year), brand })}</p>;
}
