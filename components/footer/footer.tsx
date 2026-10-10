import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { footerContent } from "@/content/footer";
import { navigation } from "@/content/navigation";
import { LogoLink } from "@/components/logo-link";
import { SocialLinks } from "@/components/social-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { footerMessages } from "@/messages/footer";

const linkClass = "inline-flex min-h-11 items-center gap-2 rounded-sm text-heading underline-offset-4 transition-colors hover:text-primary-hover hover:underline";

export function Footer({ locale }: { locale: Locale }) {
  const labels = messages[locale];
  const footer = footerMessages[locale];
  const { officialName, registrationReference, contact } = footerContent;

  return (
    <footer className="mt-auto border-t-2 border-primary bg-background text-foreground">
      <Container className="pt-12">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          <div className="md:col-span-2 lg:col-span-1">
            <LogoLink locale={locale} />
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-foreground">{footer.mission}</p>
            <p className="mt-4 flex items-center gap-2 text-base text-heading">
              <MapPin size={18} className="text-accent" aria-hidden="true" />
              {footer.location}
            </p>
            <p className="mt-5 text-base font-semibold text-heading">{officialName}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">
              {footer.registration}: {registrationReference ?? footer.toConfirm}
            </p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="mb-3 text-xl font-semibold text-primary-hover">{footer.explore}</h2>
            <ul>
              {navigation.filter((item) => item.label !== "contact").map((item) => (
                <li key={item.href}>
                  <Link href={`/${locale}${item.href}`} className={linkClass}>{labels[item.label]}</Link>
                </li>
              ))}
              <li><Link href={`/${locale}/adopt`} className={linkClass}>{footer.adopt}</Link></li>
              <li className="my-3"><ButtonLink href={`/${locale}/donate`}>{labels.donate}</ButtonLink></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-primary-hover">{footer.contact}</h2>
            {contact.isPlaceholder && <p className="mb-2 text-sm">{footer.sampleDetails}</p>}
            <address className="flex flex-col items-start not-italic">
              <a href={`https://wa.me/${contact.whatsappNumber}`} aria-label={`${footer.whatsapp}: ${contact.whatsappDisplay}`} className={linkClass}>
                <MessageCircle size={20} className="text-accent" aria-hidden="true" />
                <span>
                  <span className="block font-medium">WhatsApp</span>
                  <span dir="ltr" className="block text-sm">{contact.whatsappDisplay}</span>
                </span>
              </a>
              <a href={`mailto:${contact.email}`} aria-label={`${footer.email}: ${contact.email}`} className={`${linkClass} max-w-full`}>
                <Mail size={20} className="shrink-0 text-accent" aria-hidden="true" />
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
