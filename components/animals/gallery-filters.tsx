"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";
import { createGalleryUrl } from "@/components/animals/gallery-url";
import type { AnimalSpeciesFilter, AnimalStatusFilter } from "@/domain/animal";

export function GalleryFilters({
  locale,
  search,
  species,
  status,
}: {
  locale: Locale;
  search: string;
  species: AnimalSpeciesFilter;
  status: AnimalStatusFilter;
}) {
  const text = animalGalleryMessages[locale];
  const pathname = usePathname();
  const router = useRouter();

  function setFilters(nextSpecies: AnimalSpeciesFilter, nextStatus: AnimalStatusFilter) {
    router.replace(createGalleryUrl(pathname, search, nextSpecies, nextStatus, 1), { scroll: false });
  }

  return (
    <>
      <SearchField key={search} search={search} species={species} status={status} locale={locale} />
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

function SearchField({
  search,
  species,
  status,
  locale,
}: {
  search: string;
  species: AnimalSpeciesFilter;
  status: AnimalStatusFilter;
  locale: Locale;
}) {
  const text = animalGalleryMessages[locale];
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(search);

  useEffect(() => {
    const term = value.trim();
    if (term === search) return;
    const timeout = window.setTimeout(() => {
      router.replace(createGalleryUrl(pathname, term, species, status, 1), { scroll: false });
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [pathname, router, search, species, status, value]);

  return (
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
