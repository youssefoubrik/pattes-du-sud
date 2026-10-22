"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { languages } from "@/content/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedRoute } from "@/lib/routes";
import { Disclosure } from "./disclosure";

export function LanguageSwitcher({ locale, label, mobile = false }: { locale: Locale; label: string; mobile?: boolean }) {
  const pathname = usePathname();
  const path = pathname.replace(/^\/(en|fr|de|ar)(?=\/|$)/, "");
  const options = (
    <ul className={mobile ? "grid grid-cols-2 gap-1" : "p-1"}>
      {languages.map((language) => (
        <li key={language.locale}>
          <a
            href={localizedRoute(language.locale, path)}
            hrefLang={language.locale}
            lang={language.locale}
            aria-current={locale === language.locale ? "true" : undefined}
            className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 text-base text-heading transition-colors hover:bg-secondary aria-[current=true]:bg-secondary"
            onClick={(event) => {
              // Keep filters and anchors when changing language.
              event.currentTarget.href += window.location.search + window.location.hash;
            }}
          >
            <span dir="auto">{language.name}</span>
            {locale === language.locale && <Check size={16} aria-hidden="true" />}
          </a>
        </li>
      ))}
    </ul>
  );

  if (mobile) {
    return (
      <div className="mt-4 border-t border-border pt-4">
        <p className="mb-2 px-3 text-sm font-medium text-muted-foreground">{label}</p>
        {options}
      </div>
    );
  }

  return (
    <Disclosure
      label={label}
      className="relative"
      buttonClassName="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-heading transition-colors hover:bg-secondary"
      panelClassName="absolute end-0 top-full mt-2 w-44 rounded-xl border border-border bg-background shadow-lg"
      trigger={<><Globe size={18} aria-hidden="true" /><span>{locale.toUpperCase()}</span><ChevronDown size={14} aria-hidden="true" /></>}
    >
      {options}
    </Disclosure>
  );
}
