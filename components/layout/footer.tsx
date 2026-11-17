import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/icon";
import { Link } from "@/i18n/navigation";
import { formatAddress, products, siteConfig, t, telUrl, whatsappUrl } from "@/lib/site-config";
import { Copyright } from "./copyright";
import { Logo } from "./logo";

const socials = [
  { key: "instagram", name: "Instagram", Icon: InstagramIcon },
  { key: "facebook", name: "Facebook", Icon: FacebookIcon },
  { key: "youtube", name: "YouTube", Icon: YoutubeIcon },
  { key: "linkedin", name: "LinkedIn", Icon: LinkedinIcon },
] as const;

/** Year the site was last built; the browser replaces it with the current year. */
const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  const locale = useLocale();
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");
  const tc = useTranslations("common");
  const brand = t(siteConfig.brandName, locale);

  const explore = [
    { href: "/about", label: tn("about") },
    { href: "/process", label: tn("process") },
    { href: "/quality", label: tn("quality") },
    { href: "/bulk-orders", label: tn("bulkOrders") },
    { href: "/distributor", label: tn("distributor") },
    { href: "/blog", label: tn("blog") },
    { href: "/faq", label: tn("faq") },
    { href: "/contact", label: tn("contact") },
  ];
  const contactLink = "text-cream/85 hover:text-gold underline-offset-4 hover:underline";
  const linkClass =
    "text-cream/85 hover:text-gold inline-block py-1 underline-offset-4 hover:underline";

  return (
    <footer className="bg-brown-dark text-cream texture-grain">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1fr_1.45fr] lg:gap-12">
        <div>
          <div className="[&_span]:text-cream">
            <Logo brand={brand} />
          </div>
          <p className="text-cream/85 mt-4 max-w-xs">{t(siteConfig.description, locale)}</p>
          <p className="text-gold mt-4 text-sm">
            {tf("company", { company: t(siteConfig.companyName, locale) })}
          </p>
          <dl className="text-cream/85 mt-5 space-y-1 text-sm">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">{tf("fssai")}</dt>
              <dd>{siteConfig.certifications.fssai}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">{tf("gst")}</dt>
              <dd>{siteConfig.certifications.gst}</dd>
            </div>
          </dl>
        </div>

        <nav aria-label={tf("explore")}>
          <h2 className="caps text-gold font-sans">{tf("explore")}</h2>
          <ul className="mt-3">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={tf("products")}>
          <h2 className="caps text-gold font-sans">{tf("products")}</h2>
          <ul className="mt-3">
            {products.map((product) => (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`} className={linkClass}>
                  {t(product.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="caps text-gold font-sans">{tf("contact")}</h2>
          <ul className="text-cream/85 mt-4 space-y-3.5 text-[0.95rem] leading-6">
            <li className="flex gap-3.5">
              <MapPin
                aria-hidden="true"
                className="text-gold mt-[3px] size-[18px] shrink-0 stroke-[1.5]"
              />
              <address className="not-italic">
                {formatAddress(locale).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex gap-3.5">
              <Phone
                aria-hidden="true"
                className="text-gold mt-[3px] size-[18px] shrink-0 stroke-[1.5]"
              />
              <a href={telUrl()} className={contactLink}>
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-3.5">
              <WhatsAppIcon className="text-gold mt-[3px] size-[18px] shrink-0 stroke-[1.5]" />
              <a
                href={whatsappUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLink}
              >
                {tc("whatsappUs")}
              </a>
            </li>
            <li className="flex gap-3.5">
              <Mail
                aria-hidden="true"
                className="text-gold mt-[3px] size-[18px] shrink-0 stroke-[1.5]"
              />
              <a href={`mailto:${siteConfig.emails.info}`} className={contactLink}>
                {siteConfig.emails.info.split("@")[0]}
                <wbr />@{siteConfig.emails.info.split("@")[1]}
              </a>
            </li>
            <li className="flex gap-3.5">
              <Clock
                aria-hidden="true"
                className="text-gold mt-[3px] size-[18px] shrink-0 stroke-[1.5]"
              />
              <span>{t(siteConfig.businessHours, locale)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-cream/15 border-t">
        <div className="container-page text-cream/80 flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <Copyright brand={brand} fallbackYear={BUILD_YEAR} />
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link href="/privacy-policy" className={linkClass}>
                {tf("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                {tf("terms")}
              </Link>
            </li>
          </ul>
          <ul aria-label={tf("followUs")} className="flex gap-2">
            {socials
              .filter(({ key }) => siteConfig.social[key])
              .map(({ key, name, Icon }) => (
                <li key={key}>
                  <a
                    href={siteConfig.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tf("social", { network: name })}
                    className="border-cream/25 hover:bg-gold hover:text-brown-dark inline-flex size-11 items-center justify-center rounded-full border transition-colors"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
