"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/routing";

export function CompanionListSearch({
  search,
}: {
  search: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(search);

  useEffect(() => setValue(search), [search]);

  useEffect(() => {
    const term = value.trim();
    if (term === search) return;

    const timeout = window.setTimeout(() => {
      router.replace(createUrl(pathname, term, 1), { scroll: false });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [pathname, router, search, value]);

  return (
    <div className="relative mt-5 w-full sm:max-w-md">
      <label className="sr-only" htmlFor="admin-companion-search">
        Search companions by name
      </label>
      <Search
        size={18}
        className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="admin-companion-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Search companions by name"
        className="min-h-11 w-full rounded-xl border border-border bg-surface ps-11 pe-4 focus-visible:border-heading focus-visible:outline-none"
      />
    </div>
  );
}

export function CompanionListPagination({
  locale,
  search,
  page,
  pageCount,
}: {
  locale: Locale;
  search: string;
  page: number;
  pageCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const number = new Intl.NumberFormat(locale);

  function goToPage(nextPage: number) {
    router.push(createUrl(pathname, search, nextPage), {
      scroll: false,
    });
  }

  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Companion list pages"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      <span className="w-full text-center text-sm text-muted-foreground sm:w-auto">
        Page {number.format(page)} of {number.format(pageCount)}
      </span>
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className="min-h-11 cursor-pointer rounded-full border border-border bg-secondary/70 px-4 font-semibold text-heading transition-colors hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => goToPage(pageNumber)}
            aria-label={`Go to page ${number.format(pageNumber)}`}
            aria-current={page === pageNumber ? "page" : undefined}
            className="size-11 cursor-pointer rounded-full border border-border bg-secondary/70 font-bold text-heading transition-colors hover:bg-secondary/80 aria-[current=page]:border-heading aria-[current=page]:bg-heading aria-[current=page]:text-primary-foreground"
          >
            {number.format(pageNumber)}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page === pageCount}
        className="min-h-11 cursor-pointer rounded-full border border-border bg-secondary/70 px-4 font-semibold text-heading transition-colors hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}

function createUrl(pathname: string, search: string, page: number) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
