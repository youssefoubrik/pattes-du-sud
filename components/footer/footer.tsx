import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { LocationLabel } from "@/components/location-label";
import { footerContent } from "@/content/footer";
import { navigation } from "@/content/navigation";
import { LogoLink } from "@/components/logo-link";
import { SocialLinks } from "@/components/social-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { footerMessages } from "@/messages/footer";

const linkClass = "inline-flex min-h-11 items-center gap-2 rounded-sm text-heading transition-colors hover:text-primary-hover hover:underline hover:underline-offset-4";

export function Footer({ locale }: { locale: Locale }) {
  const labels = messages[locale];
  const footer = footerMessages[locale];
  const { officialName, registrationReference, contact } = footerContent;

  return (
    <footer className="mt-auto border-t border-border bg-secondary text-foreground">
      <Container className="pt-12">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          <div className="md:col-span-2 lg:col-span-1">
            <LogoLink locale={locale} />
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-foreground">{footer.mission}</p>
            <LocationLabel locale={locale} iconClassName="text-primary-hover" className="mt-4 text-base" />
            <p className="mt-5 text-base font-semibold text-heading">{officialName}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">
              {footer.registration}: {registrationReference ?? footer.toConfirm}
            </p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="mb-3 text-xl font-semibold text-heading">{footer.explore}</h2>
            <ul>
              {navigation.filter((item) => item.label !== "contact").map((item) => (
                <li key={item.href}>
                  <Link href={`/${locale}${item.href}`} className={linkClass}>{labels[item.label]}</Link>
                </li>
              ))}
              <li><Link href={`/${locale}/adopt`} className={linkClass}>{footer.adopt}</Link></li>
              <li className="my-3"><ButtonLink href={`/${locale}/donate`} variant="donate">{labels.donate}</ButtonLink></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-heading">{footer.contact}</h2>
            <address className="flex flex-col items-start not-italic">
              <a href={`https://wa.me/${contact.whatsappNumber}`} aria-label={`${footer.whatsapp}: ${contact.whatsappDisplay}`} className={linkClass}>
                <MessageCircle size={20} className="text-primary-hover" aria-hidden="true" />
                <span>
                  <span className="block font-medium">WhatsApp</span>
                  <span dir="ltr" className="block text-sm">{contact.whatsappDisplay}</span>
                </span>
              </a>
              <a href={`mailto:${contact.email}`} aria-label={`${footer.email}: ${contact.email}`} className={`${linkClass} max-w-full`}>
                <Mail size={20} className="shrink-0 text-primary-hover" aria-hidden="true" />
                <span dir="ltr" className="break-all">{contact.email}</span>
              </a>
            </address>
            <Link href={`/${locale}/contact`} className={`${linkClass} mt-2`}>{labels.contact}</Link>
            <div className="mt-5">
              <SocialLinks instagram={contact.instagram} facebook={contact.facebook} label={footer.findUs} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {officialName}</p>
          <nav aria-label={footer.legalNavigation}>
            <ul className="flex flex-wrap gap-x-6">
              <li><Link href={`/${locale}/legal`} className={linkClass}>{footer.legal}</Link></li>
              <li><Link href={`/${locale}/privacy`} className={linkClass}>{footer.privacy}</Link></li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
