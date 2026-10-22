import { Suspense } from "react";
import { connection } from "next/server";
import { Mail, MessageCircle } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import type { Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/db";
import { footerMessages } from "@/messages/footer";
import { whatsappUrl } from "@/lib/whatsapp";
import { footerLinkClass } from "@/components/footer/footer-link";

export function FooterContactDetails({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={
      <div aria-hidden="true" className="mt-2 min-h-28 space-y-3">
        <div className="h-11 w-44 rounded-sm bg-border" />
        <div className="h-11 w-40 rounded-sm bg-border" />
      </div>
    }>
      <ContactDetails locale={locale} />
    </Suspense>
  );
}

async function ContactDetails({ locale }: { locale: Locale }) {
  await connection();
  const settings = getSettings();
  const footer = footerMessages[locale];

  return (
    <>
      <address className="flex flex-col items-start not-italic">
        <a href={whatsappUrl(settings.whatsappNumber)} aria-label={`${footer.whatsapp}: ${settings.whatsappDisplay}`} className={footerLinkClass}>
          <MessageCircle size={20} className="text-primary-hover" aria-hidden="true" />
          <span>
            <span className="block font-medium">WhatsApp</span>
            <span dir="ltr" className="block text-sm">{settings.whatsappDisplay}</span>
          </span>
        </a>
        {settings.email && <a href={`mailto:${settings.email}`} aria-label={`${footer.email}: ${settings.email}`} className={`${footerLinkClass} max-w-full`}>
          <Mail size={20} className="shrink-0 text-primary-hover" aria-hidden="true" />
          <span dir="ltr" className="break-all">{settings.email}</span>
        </a>}
      </address>
      {(settings.instagram || settings.facebook) && (
        <div className="mt-5">
          <SocialLinks instagram={settings.instagram} facebook={settings.facebook} label={footer.findUs} />
        </div>
      )}
    </>
  );
}
