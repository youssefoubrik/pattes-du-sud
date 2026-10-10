import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { footerContent } from "@/content/footer";
import { navigation } from "@/content/navigation";
import { siteContent } from "@/content/site";
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
      <div className="mx-auto max-w-7xl px-6 pt-12 sm:px-8 lg:px-8">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-16">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} aria-label={labels.home} className="inline-block rounded-sm">
              <Image
                src={siteContent.logo.src}
                width={siteContent.logo.width}
                height={siteContent.logo.height}
                alt={officialName}
                sizes="224px"
                className="h-auto w-56 max-w-full"
              />
            </Link>
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
              <li className="my-3"><Link href={`/${locale}/donate`} className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-[19px] font-bold text-primary-foreground transition-colors hover:bg-primary-hover">{labels.donate}</Link></li>
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
            <p id="footer-social" className="mt-5 text-sm font-semibold text-heading">{footer.findUs}</p>
            <ul className="mt-2 flex flex-wrap gap-3" aria-labelledby="footer-social">
              <li>
                <a href={contact.instagram} aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full border border-border text-heading transition-colors hover:border-primary-hover hover:text-primary-hover">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={contact.facebook} aria-label="Facebook" className="flex size-11 items-center justify-center rounded-full border border-border text-heading transition-colors hover:border-primary-hover hover:text-primary-hover">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" />
                  </svg>
                </a>
              </li>
            </ul>
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
      </div>
    </footer>
  );
}
