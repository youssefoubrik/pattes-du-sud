import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { navigation } from "@/content/navigation";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { footerMessages } from "@/messages/footer";
import { localizedRoute, routePaths } from "@/lib/routes";
import { footerLinkClass } from "@/components/footer/footer-link";

export function FooterNavigation({ locale }: { locale: Locale }) {
  const footer = footerMessages[locale];

  return (
    <nav aria-labelledby="footer-explore">
      <h2 id="footer-explore" className="mb-3 text-xl font-semibold text-heading">{footer.explore}</h2>
      <ul>
        {navigation.filter((item) => item.label !== "contact").map((item) => (
          <li key={item.href}>
            <Link href={localizedRoute(locale, item.href)} className={footerLinkClass}>
              {messages[locale][item.label]}
            </Link>
          </li>
        ))}
        <li className="my-3">
          <ButtonLink href={localizedRoute(locale, routePaths.donate)} variant="donate">
            {messages[locale].donate}
          </ButtonLink>
        </li>
      </ul>
    </nav>
  );
}
