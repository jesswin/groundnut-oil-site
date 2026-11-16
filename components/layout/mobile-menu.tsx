"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icon";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { isActive, type NavItem } from "./nav-links";

interface MobileMenuProps {
  items: NavItem[];
  labels: {
    open: string;
    close: string;
    menu: string;
    nav: string;
    language: string;
    call: string;
    whatsapp: string;
  };
  telHref: string;
  whatsappHref: string;
}

/** Accessible slide-in menu for small screens (focus is trapped and Esc closes it). */
export function MobileMenu({ items, labels, telHref, whatsappHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={labels.open}
        className="text-brown-dark hover:bg-cream-dark inline-flex size-11 items-center justify-center rounded-full xl:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="bg-cream w-[88%] gap-0 overflow-y-auto p-0 sm:max-w-sm"
      >
        <div className="border-line flex items-center justify-between border-b px-5 py-3">
          <SheetTitle className="text-lg">{labels.menu}</SheetTitle>
          <SheetClose
            aria-label={labels.close}
            className="text-brown-dark hover:bg-cream-dark inline-flex size-11 items-center justify-center rounded-full"
          >
            <X aria-hidden="true" className="size-6" />
          </SheetClose>
        </div>

        <nav aria-label={labels.nav} className="px-3 py-3">
          <ul>
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-brown-dark flex min-h-12 items-center rounded-xl px-3 text-lg font-medium",
                      active && "bg-gold-soft",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-line space-y-5 border-t px-5 py-5">
          <div>
            <p className="text-stone mb-2 text-sm font-medium">{labels.language}</p>
            <LanguageSwitcher label={labels.language} variant="inline" />
          </div>
          <div className="grid gap-3">
            <a href={telHref} className="btn btn-brown">
              <Phone aria-hidden="true" className="size-5" />
              {labels.call}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon className="size-5" />
              {labels.whatsapp}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
