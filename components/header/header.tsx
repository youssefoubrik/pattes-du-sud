import { Suspense } from "react";
import { Menu, X } from "lucide-react";
import { LogoLink } from "@/components/logo-link";
import { ButtonLink } from "@/components/ui/button-link";
import { localizedRoute, routePaths } from "@/lib/routes";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { navigation, languages } from "@/content/navigation";
import { Disclosure } from "./disclosure";
import { Navigation } from "./navigation";
import { LanguageSwitcher } from "./language-switcher";

export function Header({ locale }: { locale: Locale }) {
  const labels = messages[locale];

  return (
    <header className="relative z-40 border-b border-border bg-secondary">
      <a href="#main-content" className="absolute start-4 top-2 z-50 -translate-y-24 rounded-lg bg-heading px-4 py-3 text-primary-foreground focus:translate-y-0">
        {labels.skip}
      </a>
      <Container padding="compact" className="relative flex min-h-20 items-center justify-between gap-2 sm:gap-4 lg:min-h-24">
        <LogoLink locale={locale} responsive />
        <div className="ms-auto hidden xl:block">
          <Suspense fallback={<NavigationFallback locale={locale} mobile={false} />}>
            <Navigation locale={locale} labels={labels} />
          </Suspense>
        </div>
        <div className="hidden xl:block">
          <Suspense fallback={<LanguageSwitcherFallback locale={locale} label={labels.language} />}>
            <LanguageSwitcher locale={locale} label={labels.language} />
          </Suspense>
        </div>
        <ButtonLink href={localizedRoute(locale, routePaths.donate)} variant="donate" compact className="ms-auto text-base! sm:text-[19px]! xl:ms-0">
          {labels.donate}
        </ButtonLink>
        <Disclosure
          label={labels.menu}
          closeLabel={labels.closeMenu}
          mobile
          className="xl:hidden"
          buttonClassName="flex size-11 items-center justify-center rounded-lg text-heading transition-colors hover:bg-secondary"
          panelClassName="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-border bg-secondary px-4 py-4 shadow-sm sm:px-6 lg:max-h-[calc(100dvh-6rem)]"
          trigger={<Menu size={24} aria-hidden="true" />}
          openTrigger={<X size={24} aria-hidden="true" />}
        >
          <Suspense fallback={<NavigationFallback locale={locale} mobile />}>
            <Navigation locale={locale} labels={labels} mobile />
          </Suspense>
          <Suspense fallback={<LanguageSwitcherFallback locale={locale} label={labels.language} mobile />}>
            <LanguageSwitcher locale={locale} label={labels.language} mobile />
          </Suspense>
        </Disclosure>
      </Container>
    </header>
  );
}

function NavigationFallback({ locale, mobile }: { locale: Locale; mobile: boolean }) {
  const labels = messages[locale];
  return (
    <nav aria-label={labels.navigation}>
      <ul className={mobile ? "flex flex-col gap-1" : "flex items-center gap-2 xl:gap-4"}>
        {navigation.map((item) => (
          <li key={item.href}>
            <a
              href={localizedRoute(locale, item.href)}
              className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-heading transition-colors hover:bg-secondary"
            >
              {labels[item.label]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function LanguageSwitcherFallback({ locale, label, mobile = false }: { locale: Locale; label: string; mobile?: boolean }) {
  const options = (
    <ul className={mobile ? "grid grid-cols-2 gap-1" : "p-1"}>
      {languages.map((language) => (
        <li key={language.locale}>
          <a
            href={localizedRoute(language.locale, "")}
            hrefLang={language.locale}
            lang={language.locale}
            className="flex min-h-11 items-center rounded-lg px-3 text-base text-heading transition-colors hover:bg-secondary"
          >
            {language.name}
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
    <details className="relative">
      <summary aria-label={label} className="flex min-h-11 cursor-pointer list-none items-center rounded-lg px-3 text-sm font-medium text-heading">
        {locale.toUpperCase()}
      </summary>
      <div className="absolute end-0 top-full mt-2 w-44 rounded-xl border border-border bg-background shadow-lg">
        {options}
      </div>
    </details>
  );
}
