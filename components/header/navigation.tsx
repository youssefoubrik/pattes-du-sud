"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";
import type { Locale } from "@/i18n/routing";
import type { Messages } from "@/messages/en";

export function Navigation({ locale, labels, mobile = false }: { locale: Locale; labels: Messages; mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav aria-label={labels.navigation}>
      <ul className={mobile ? "flex flex-col gap-1" : "flex items-center gap-2 xl:gap-4"}>
        {navigation.map((item) => {
          const href = `/${locale}${item.href}`;
          const current = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={item.href}>
              <Link href={href} aria-current={current ? "page" : undefined} className={`flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-heading transition-colors hover:bg-secondary ${current ? "bg-secondary underline decoration-2 underline-offset-8" : ""}`}>
                {labels[item.label]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
