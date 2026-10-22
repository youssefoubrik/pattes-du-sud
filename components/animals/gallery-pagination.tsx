"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";
import { createGalleryUrl } from "@/components/animals/gallery-url";
import type { AnimalSpeciesFilter, AnimalStatusFilter } from "@/domain/animal";

export function GalleryPagination({
  locale,
  search,
  species,
  status,
  page,
  pageCount,
}: {
  locale: Locale;
  search: string;
  species: AnimalSpeciesFilter;
  status: AnimalStatusFilter;
  page: number;
  pageCount: number;
}) {
  const text = animalGalleryMessages[locale];
  const number = new Intl.NumberFormat(locale);
  const router = useRouter();
  const pathname = usePathname();

  if (pageCount <= 1) return null;

  function navigate(nextPage: number) {
    router.push(createGalleryUrl(pathname, search, species, status, nextPage), { scroll: false });
  }

  return (
    <nav aria-label={text.paginationLabel} className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <span className="w-full text-center text-sm text-muted-foreground sm:w-auto">
        {text.pageOf.replace("{page}", number.format(page)).replace("{pages}", number.format(pageCount))}
      </span>
      <PageButton disabled={page === 1} onClick={() => navigate(page - 1)}>{text.previousPage}</PageButton>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
        <PageButton
          key={pageNumber}
          current={page === pageNumber}
          ariaLabel={text.pageLabel.replace("{page}", number.format(pageNumber))}
          onClick={() => navigate(pageNumber)}
        >
          {number.format(pageNumber)}
        </PageButton>
      ))}
      <PageButton disabled={page === pageCount} onClick={() => navigate(page + 1)}>{text.nextPage}</PageButton>
    </nav>
  );
}

function PageButton({
  children,
  onClick,
  disabled,
  current,
  ariaLabel,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  current?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={current ? "page" : undefined}
      className="min-h-11 cursor-pointer rounded-full border border-border bg-secondary/70 px-4 font-semibold text-heading transition-colors hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50 aria-[current=page]:border-heading aria-[current=page]:bg-heading aria-[current=page]:text-primary-foreground"
    >
      {children}
    </button>
  );
}
