"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { AnimalPreview } from "@/components/animal-preview";
import type { Animal } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";

type SpeciesFilter = "all" | Animal["species"];
type StatusFilter = "all" | "available" | "adopted";

export function AnimalGallery({
  animals,
  locale,
  search,
  species,
  status,
  total,
  page,
  pageCount,
}: {
  animals: (Animal & { id: number })[];
  locale: Locale;
  search: string;
  species: SpeciesFilter;
  status: StatusFilter;
  total: number;
  page: number;
  pageCount: number;
}) {
  const text = animalGalleryMessages[locale];
  const number = new Intl.NumberFormat(locale);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <GalleryFilters
        locale={locale}
        search={search}
        species={species}
        status={status}
      />
      <div className="pt-7">
        <p className="text-sm font-semibold text-muted-foreground" aria-live="polite">
          {text.count.replace("{count}", number.format(total))}
        </p>
        {animals.length ? (
          <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => (
              <li key={animal.id}>
                <AnimalPreview animal={animal} locale={locale} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 rounded-3xl bg-secondary p-8 text-center text-foreground">
            {text.empty}
          </p>
        )}
        {pageCount > 1 && (
          <nav aria-label={text.paginationLabel} className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="w-full text-center text-sm text-muted-foreground sm:w-auto">
              {text.pageOf.replace("{page}", number.format(page)).replace("{pages}", number.format(pageCount))}
            </span>
            <PageButton disabled={page === 1} onClick={() => router.push(createUrl(pathname, search, species, status, page - 1), { scroll: false })}>{text.previousPage}</PageButton>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <PageButton
                key={pageNumber}
                current={page === pageNumber}
                ariaLabel={text.pageLabel.replace("{page}", number.format(pageNumber))}
                onClick={() => router.push(createUrl(pathname, search, species, status, pageNumber), { scroll: false })}
              >
                {number.format(pageNumber)}
              </PageButton>
            ))}
            <PageButton disabled={page === pageCount} onClick={() => router.push(createUrl(pathname, search, species, status, page + 1), { scroll: false })}>{text.nextPage}</PageButton>
          </nav>
        )}
      </div>
    </div>
  );
}

function GalleryFilters({
  locale,
  search,
  species,
  status,
}: {
  locale: Locale;
  search: string;
  species: SpeciesFilter;
  status: StatusFilter;
}) {
  const text = animalGalleryMessages[locale];
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(search);

  useEffect(() => setValue(search), [search]);
  useEffect(() => {
    const term = value.trim();
    if (term === search) return;
    const timeout = window.setTimeout(() => {
      router.replace(createUrl(pathname, term, species, status, 1), { scroll: false });
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [pathname, router, search, species, status, value]);

  function setFilters(nextSpecies: SpeciesFilter, nextStatus: StatusFilter) {
    router.replace(createUrl(pathname, search, nextSpecies, nextStatus, 1), { scroll: false });
  }

  return (
    <>
      <div className="relative mb-6 w-full sm:max-w-md">
        <label className="sr-only" htmlFor="companion-name-search">{text.searchLabel}</label>
        <Search size={18} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          id="companion-name-search"
          type="search"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder={text.searchPlaceholder}
          className="min-h-11 w-full rounded-xl border border-border bg-surface ps-11 pe-4 focus-visible:border-heading focus-visible:outline-none"
        />
      </div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <FilterGroup
          label={text.speciesLabel}
          options={[{ value: "all", label: text.all }, { value: "dog", label: text.dogs }, { value: "cat", label: text.cats }]}
          selected={species}
          onSelect={(next) => setFilters(next, status)}
        />
        <FilterGroup
          label={text.statusLabel}
          options={[{ value: "all", label: text.all }, { value: "available", label: text.available }, { value: "adopted", label: text.adopted }]}
          selected={status}
          onSelect={(next) => setFilters(species, next)}
        />
      </div>
    </>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="min-w-0">
      <p className="mb-2 text-base font-bold text-heading">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected === option.value}
            onClick={() => onSelect(option.value)}
            className="min-h-11 cursor-pointer rounded-full border border-border bg-secondary/70 px-4 text-base font-bold text-heading transition-colors hover:bg-secondary/80 aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-primary-foreground aria-pressed:hover:border-heading aria-pressed:hover:bg-heading aria-pressed:hover:text-primary-foreground"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
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

function createUrl(
  pathname: string,
  search: string,
  species: SpeciesFilter,
  status: StatusFilter,
  page: number,
) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (species !== "all") params.set("species", species);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
