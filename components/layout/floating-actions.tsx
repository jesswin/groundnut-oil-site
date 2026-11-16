import { Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icon";
import { siteConfig, telUrl, whatsappUrl } from "@/lib/site-config";

/** Floating WhatsApp button on every page, plus a click-to-call button on phones. */
export function FloatingActions() {
  const locale = useLocale();
  const tc = useTranslations("common");

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <a
        href={telUrl()}
        aria-label={tc("callNumber", { phone: siteConfig.phone })}
        className="bg-brown text-cream inline-flex size-14 items-center justify-center rounded-full shadow-lg md:hidden"
      >
        <Phone aria-hidden="true" className="size-6" />
      </a>
      <a
        href={whatsappUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tc("chatOnWhatsapp")}
        className="inline-flex size-14 items-center justify-center rounded-full bg-[#1f5c45] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
