"use client";

import { Check, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, locales } from "@/i18n/locales";
import { cn } from "@/lib/utils";

/**
 * Language switcher showing native names. Links point at the same page in the other
 * language; next-intl stores the choice in the NEXT_LOCALE cookie.
 */
export function LanguageSwitcher({
  label,
  variant = "dropdown",
}: {
  label: string;
  variant?: "dropdown" | "inline";
}) {
  const current = useLocale();
  const pathname = usePathname();

  if (variant === "inline") {
    return (
      <div role="group" aria-label={label} className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            lang={locale}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "text-stone hover:text-brown-dark border-b border-transparent py-1 text-base transition-colors",
              locale === current && "text-brown-dark border-gold",
            )}
          >
            {localeNames[locale]}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${label}: ${localeNames[current as keyof typeof localeNames]}`}
        className="border-line text-brown-dark hover:bg-cream-dark inline-flex min-h-10 items-center gap-1.5 rounded-sm border px-3 text-sm font-medium"
      >
        <Globe aria-hidden="true" className="size-4" />
        <span lang={current}>{localeNames[current as keyof typeof localeNames]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1.5">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className="cursor-pointer justify-between px-3 py-2 text-base"
            render={<Link href={pathname} locale={locale} lang={locale} hrefLang={locale} />}
          >
            {localeNames[locale]}
            {locale === current && <Check aria-hidden="true" className="text-leaf-dark size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
