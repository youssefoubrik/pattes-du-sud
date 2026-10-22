import { LocationLabel } from "@/components/location-label";
import { LogoLink } from "@/components/logo-link";
import { footerContent } from "@/content/footer";
import type { Locale } from "@/i18n/routing";
import { footerMessages } from "@/messages/footer";
import { FooterRegistration } from "@/components/footer/footer-registration";

export function FooterBrand({ locale }: { locale: Locale }) {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <LogoLink locale={locale} />
      <p className="mt-4 max-w-sm text-lg leading-relaxed text-foreground">
        {footerMessages[locale].mission}
      </p>
      <LocationLabel locale={locale} iconClassName="text-primary-hover" className="mt-4 text-base" />
      <p className="mt-5 text-base font-semibold text-heading">{footerContent.officialName}</p>
      <FooterRegistration locale={locale} />
    </div>
  );
}
