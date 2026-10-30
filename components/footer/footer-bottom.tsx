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
      <nav aria-label={footer.footerLinks}>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <li>
            <Link href={localizedRoute(locale, routePaths.privacy)} className={footerLinkClass}>
              {footer.privacy}
            </Link>
          </li>
          <li className="flex min-h-11 items-center gap-1.5 text-sm">
            <span>{footer.websiteBy}</span>
            <a
              href="https://www.linkedin.com/in/youssefoubrik/"
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              Youssef
            </a>
          </li>
          <li>
            <a href="mailto:yo.oubrik@gmail.com" className={footerLinkClass}>
              yo.oubrik@gmail.com
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
