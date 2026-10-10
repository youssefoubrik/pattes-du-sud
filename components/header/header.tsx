import { Menu, X } from "lucide-react";
import { LogoLink } from "@/components/logo-link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
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
      <Container padding="compact" className="relative flex min-h-20 items-center justify-between gap-2 sm:gap-4 lg:min-h-24">
        <LogoLink locale={locale} responsive />
        <div className="ms-auto hidden lg:block">
          <Navigation locale={locale} labels={labels} />
        </div>
        <div className="hidden lg:block">
          <LanguageSwitcher locale={locale} label={labels.language} />
        </div>
        <ButtonLink href={`/${locale}/donate`} compact className="ms-auto lg:ms-0">
          {labels.donate}
        </ButtonLink>
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
      </Container>
    </header>
  );
}
