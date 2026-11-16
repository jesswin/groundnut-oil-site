import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { WhatsAppIcon } from "@/components/icon";
import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/seo";
import { formatAddress, siteConfig, t, telUrl, whatsappUrl } from "@/lib/site-config";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: tc("title"),
    description: tc("description"),
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations({ locale, namespace: "contact" });
  const tcommon = await getTranslations({ locale, namespace: "common" });
  const link = "text-brown-dark font-medium underline underline-offset-4 hover:text-leaf-dark";
  const iconClass = "text-leaf-dark mt-1 size-6 shrink-0";

  return (
    <>
      <PageHero
        title={tc("title")}
        text={tc("intro")}
        crumbs={[{ name: tc("title"), path: "/contact" }]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <ul className="space-y-4">
            <li className="card-surface flex gap-4 p-5">
              <MapPin aria-hidden="true" className={iconClass} />
              <div>
                <h2 className="text-brown-dark font-sans text-base font-semibold">
                  {tc("addressTitle")}
                </h2>
                <address className="text-stone not-italic">
                  {formatAddress(locale).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </li>
            <li className="card-surface flex gap-4 p-5">
              <Phone aria-hidden="true" className={iconClass} />
              <div>
                <h2 className="text-brown-dark font-sans text-base font-semibold">
                  {tc("phoneTitle")}
                </h2>
                <p>
                  <a href={telUrl()} className={link}>
                    {siteConfig.phone}
                  </a>
                </p>
              </div>
            </li>
            <li className="card-surface flex gap-4 p-5">
              <WhatsAppIcon className={iconClass} />
              <div>
                <h2 className="text-brown-dark font-sans text-base font-semibold">
                  {tc("whatsappTitle")}
                </h2>
                <p>
                  <a
                    href={whatsappUrl(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    {tcommon("chatOnWhatsapp")}
                  </a>
                </p>
              </div>
            </li>
            <li className="card-surface flex gap-4 p-5">
              <Mail aria-hidden="true" className={iconClass} />
              <div className="min-w-0">
                <h2 className="text-brown-dark font-sans text-base font-semibold">
                  {tc("emailTitle")}
                </h2>
                <p className="text-stone">
                  {tc("generalEnquiries")}:{" "}
                  <a href={`mailto:${siteConfig.emails.info}`} className={`${link} break-all`}>
                    {siteConfig.emails.info}
                  </a>
                </p>
                <p className="text-stone">
                  {tc("salesEnquiries")}:{" "}
                  <a href={`mailto:${siteConfig.emails.sales}`} className={`${link} break-all`}>
                    {siteConfig.emails.sales}
                  </a>
                </p>
              </div>
            </li>
            <li className="card-surface flex gap-4 p-5">
              <Clock aria-hidden="true" className={iconClass} />
              <div>
                <h2 className="text-brown-dark font-sans text-base font-semibold">
                  {tc("hoursTitle")}
                </h2>
                <p className="text-stone">{t(siteConfig.businessHours, locale)}</p>
              </div>
            </li>
          </ul>

          <div className="card-surface p-6 sm:p-9">
            <h2 className="mb-6 text-2xl sm:text-3xl">{tc("formTitle")}</h2>
            <EnquiryForm kind="contact" />
          </div>
        </div>
      </section>

      <section aria-label={tc("mapTitle")} className="pb-16 sm:pb-24">
        <div className="container-page">
          {siteConfig.mapEmbedUrl ? (
            <iframe
              src={siteConfig.mapEmbedUrl}
              title={tc("mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-line h-[26rem] w-full rounded-3xl border"
            />
          ) : (
            <div className="border-input bg-cream-dark texture-grain flex h-72 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-6 text-center">
              <MapPin aria-hidden="true" className="text-brown size-10" />
              <p className="text-stone max-w-md">{tcommon("placeholderMap")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
