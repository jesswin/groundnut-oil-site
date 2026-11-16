import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/site-config";

/** Closing call-to-action: bulk enquiry and WhatsApp. */
export function CtaBand({ title, text }: { title: string; text: string }) {
  const locale = useLocale();
  const tc = useTranslations("common");

  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="bg-gold-soft texture-grain border-gold/50 relative overflow-hidden border px-6 py-16 text-center sm:px-12 sm:py-24">
            <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="text-brown mx-auto mt-5 max-w-xl text-lg">{text}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/bulk-orders" className="btn btn-brown">
                {tc("enquireBulk")}
              </Link>
              <a
                href={whatsappUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon className="size-5" />
                {tc("whatsappUs")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
