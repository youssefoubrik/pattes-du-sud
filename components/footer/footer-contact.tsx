import Link from "next/link";
import { FooterContactDetails } from "@/components/footer/footer-contact-details";
import { footerLinkClass } from "@/components/footer/footer-link";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { footerMessages } from "@/messages/footer";
import { localizedRoute, routePaths } from "@/lib/routes";

export function FooterContact({ locale }: { locale: Locale }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-heading">{footerMessages[locale].contact}</h2>
      <Link href={localizedRoute(locale, routePaths.contact)} className={`${footerLinkClass} mt-2`}>
        {messages[locale].contact}
      </Link>
      <FooterContactDetails locale={locale} />
    </section>
  );
}
