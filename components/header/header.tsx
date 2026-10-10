import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { Disclosure } from "./disclosure";
import { Navigation } from "./navigation";
import { LanguageSwitcher } from "./language-switcher";

export function Header({ locale }: { locale: Locale }) {
  const labels = messages[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <a href="#main-content" className="absolute start-4 top-2 z-50 -translate-y-24 rounded-lg bg-heading px-4 py-3 text-primary-foreground focus:translate-y-0">
        {labels.skip}
      </a>
      <div className="relative mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:min-h-24 lg:px-8">
        <Link href={`/${locale}`} aria-label={labels.home} className="shrink-0 rounded-sm">
          <Image
            src={siteContent.logo.src}
            width={siteContent.logo.width}
            height={siteContent.logo.height}
            alt={siteContent.name}
            sizes="(min-width: 640px) 204px, (min-width: 375px) 128px, 88px"
            loading="eager"
            className="h-auto w-[88px] min-[375px]:w-[128px] sm:w-[204px]"
          />
        </Link>
        <div className="ms-auto hidden lg:block">
          <Navigation locale={locale} labels={labels} />
        </div>
        <div className="hidden lg:block">
          <LanguageSwitcher locale={locale} label={labels.language} />
        </div>
        <Link href={`/${locale}/donate`} className="ms-auto inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-[19px] font-bold text-primary-foreground transition-colors hover:bg-primary-hover sm:px-6 lg:ms-0">
          {labels.donate}
        </Link>
        <Disclosure
          label={labels.menu}
          closeLabel={labels.closeMenu}
          mobile
          className="lg:hidden"
          buttonClassName="flex size-11 items-center justify-center rounded-lg text-heading transition-colors hover:bg-secondary"
          panelClassName="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-border bg-background px-4 py-4 shadow-sm sm:px-6"
          trigger={<Menu size={24} aria-hidden="true" />}
          openTrigger={<X size={24} aria-hidden="true" />}
        >
          <Navigation locale={locale} labels={labels} mobile />
          <LanguageSwitcher locale={locale} label={labels.language} mobile />
        </Disclosure>
      </div>
    </header>
  );
}
