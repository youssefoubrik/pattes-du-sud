import Link from "next/link";
import { footerContent } from "@/content/footer";
import type { Locale } from "@/i18n/routing";
import { footerMessages } from "@/messages/footer";
import { localizedRoute, routePaths } from "@/lib/routes";
import { footerLinkClass } from "@/components/footer/footer-link";

export function FooterBottom({ locale }: { locale: Locale }) {
  const footer = footerMessages[locale];

  return (
    <div className="flex flex-col gap-3 border-t border-border py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p>© {footerContent.officialName}</p>
      <nav aria-label={footer.privacy}>
        <ul className="flex flex-wrap gap-x-6">
          <li>
            <Link href={localizedRoute(locale, routePaths.privacy)} className={footerLinkClass}>
              {footer.privacy}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
