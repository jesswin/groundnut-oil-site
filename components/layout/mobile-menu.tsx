"use client";

import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icon";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { isActive, type NavItem } from "./nav-links";

interface MobileMenuProps {
  brand: string;
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

/** Full-screen menu for small screens (focus is trapped and Esc closes it). */
export function MobileMenu({ brand, items, labels, telHref, whatsappHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={labels.open}
        className="text-brown-dark hover:text-gold-deep inline-flex size-11 items-center justify-center transition-colors xl:hidden"
      >
        <Menu aria-hidden="true" className="size-6 stroke-[1.5]" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="bg-cream w-full gap-0 p-0 shadow-none data-[side=right]:w-full data-[side=right]:border-l-0 sm:data-[side=right]:max-w-md sm:data-[side=right]:border-l"
      >
        <div className="border-line/70 flex h-[4.5rem] shrink-0 items-center justify-between border-b px-5 sm:px-8">
          <Logo brand={brand} />
          <SheetTitle className="sr-only">{labels.menu}</SheetTitle>
          <SheetClose
            aria-label={labels.close}
            className="text-brown-dark hover:text-gold-deep -mr-2 inline-flex size-11 items-center justify-center transition-colors"
          >
            <X aria-hidden="true" className="size-6 stroke-[1.5]" />
          </SheetClose>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <nav aria-label={labels.nav} className="px-5 pt-4 sm:px-8">
            <ul>
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-line/70 border-b">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "font-heading group flex min-h-14 items-center justify-between gap-4 text-[1.45rem] leading-tight transition-colors",
                        active ? "text-gold-deep" : "text-brown-dark hover:text-gold-deep",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                          "size-4 shrink-0 stroke-[1.5] transition-opacity",
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto space-y-6 px-5 pt-10 pb-8 sm:px-8">
            <div>
              <p className="eyebrow mb-2">{labels.language}</p>
              <LanguageSwitcher label={labels.language} variant="inline" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={telHref} className="btn btn-outline px-3">
                <Phone aria-hidden="true" className="size-4 stroke-[1.5]" />
                {labels.call}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp px-3"
              >
                <WhatsAppIcon className="size-4" />
                {labels.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
