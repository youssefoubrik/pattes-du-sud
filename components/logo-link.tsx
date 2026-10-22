import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { localizedRoute, routePaths } from "@/lib/routes";

type Props = { locale: Locale; responsive?: boolean };

export function LogoLink({ locale, responsive = false }: Props) {
  return (
    <Link href={localizedRoute(locale, routePaths.home)} aria-label={messages[locale].home} className="inline-block shrink-0 rounded-sm">
      <Image
        src={siteContent.logo.src}
        width={siteContent.logo.width}
        height={siteContent.logo.height}
        alt={siteContent.name}
        sizes={responsive ? "(min-width: 640px) 204px, (min-width: 375px) 128px, 88px" : "224px"}
        loading={responsive ? "eager" : "lazy"}
        className={responsive ? "h-auto w-[88px] min-[375px]:w-[128px] sm:w-[204px]" : "h-auto w-56 max-w-full"}
      />
    </Link>
  );
}
