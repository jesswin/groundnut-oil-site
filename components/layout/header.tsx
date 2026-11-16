import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig, t, telUrl, whatsappUrl } from "@/lib/site-config";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLinks, type NavItem } from "./nav-links";

export function Logo({ brand }: { brand: string }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* TODO: replace with your logo */}
      <svg viewBox="0 0 64 64" className="size-8 shrink-0" aria-hidden="true">
        <path
          d="M32 7c10 13 16 22 16 32a16 16 0 0 1-32 0c0-10 6-19 16-32z"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2.5"
        />
        <path
          d="M32 25c5 6.500 7.500 11 7.500 15a7.500 7.500 0 0 1-15 0c0-4 2.500-8.500 7.500-15z"
          fill="var(--gold)"
        />
      </svg>
      <span className="font-heading text-brown-dark text-[1.35rem] leading-tight font-medium tracking-tight">
        {brand}
      </span>
    </span>
  );
}

export function Header() {
  const locale = useLocale();
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const brand = t(siteConfig.brandName, locale);

  const desktop: NavItem[] = [
    { href: "/about", label: tn("about") },
    { href: "/products", label: tn("products") },
    { href: "/process", label: tn("process") },
    { href: "/quality", label: tn("quality") },
    { href: "/bulk-orders", label: tn("bulkOrders") },
    { href: "/distributor", label: tn("distributor") },
    { href: "/blog", label: tn("blog") },
    { href: "/contact", label: tn("contact") },
  ];
  const mobile: NavItem[] = [
    { href: "/", label: tn("home") },
    ...desktop.slice(0, 7),
    { href: "/faq", label: tn("faq") },
    desktop[7],
  ];

  return (
    <header className="border-line/70 bg-cream/95 supports-backdrop-filter:bg-cream/85 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[90rem] items-center justify-between gap-3 px-5 sm:px-8">
        <Link href="/" aria-label={tn("homeLink", { brand })} className="shrink-0 rounded-lg">
          <Logo brand={brand} />
        </Link>

        <NavLinks items={desktop} label={tn("primaryLabel")} />

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher label={tn("changeLanguage")} />
          </div>
          <Link
            href="/bulk-orders"
            className="btn btn-sm btn-gold hidden md:inline-flex xl:hidden 2xl:inline-flex"
          >
            {tc("enquireBulk")}
          </Link>
          <MobileMenu
            items={mobile}
            labels={{
              open: tn("openMenu"),
              close: tn("closeMenu"),
              menu: tn("menu"),
              nav: tn("mobileLabel"),
              language: tn("language"),
              call: tc("callUs"),
              whatsapp: tc("whatsappUs"),
            }}
            telHref={telUrl()}
            whatsappHref={whatsappUrl(locale)}
          />
        </div>
      </div>
    </header>
  );
}
