"use client";

import { useState } from "react";
import { AnimalPreview } from "@/components/animal-preview";
import type { Animal } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";

type SpeciesFilter = "all" | Animal["species"];
type StatusFilter = "all" | "available" | "adopted";
const PAGE_SIZE = 6;

export function AnimalGallery({
  animals,
  locale,
}: {
  animals: Animal[];
  locale: Locale;
}) {
  const [species, setSpecies] = useState<SpeciesFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const text = animalGalleryMessages[locale];
  const visible = animals.filter(
    (animal) =>
      (species === "all" || animal.species === species) &&
      (status === "all" || animal.status === status),
  );
  const pageCount = Math.ceil(visible.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(pageCount, 1));
  const pageAnimals = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-col gap-5 bg-surface p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <FilterGroup
          label={text.speciesLabel}
          options={[
            { value: "all", label: text.all },
            { value: "dog", label: text.dogs },
            { value: "cat", label: text.cats },
          ]}
          selected={species}
          onSelect={(value) => {
            setSpecies(value);
            setPage(1);
          }}
        />
        <FilterGroup
          label={text.statusLabel}
          options={[
            { value: "all", label: text.all },
            { value: "available", label: text.available },
            { value: "adopted", label: text.adopted },
          ]}
          selected={status}
          onSelect={(value) => {
            setStatus(value);
            setPage(1);
          }}
        />
      </div>
      <div className="pt-7">
        <p
          className="text-sm font-semibold text-muted-foreground"
          aria-live="polite"
        >
          {text.count.replace(
            "{count}",
            new Intl.NumberFormat(locale).format(visible.length),
          )}
        </p>
        {visible.length ? (
          <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageAnimals.map((animal) => (
              <li key={animal.slug}>
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
              {text.pageOf
                .replace("{page}", new Intl.NumberFormat(locale).format(currentPage))
                .replace("{pages}", new Intl.NumberFormat(locale).format(pageCount))}
            </span>
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="min-h-11 cursor-pointer rounded-full border border-border bg-surface px-4 font-semibold text-heading transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {text.previousPage}
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                aria-label={text.pageLabel.replace("{page}", new Intl.NumberFormat(locale).format(pageNumber))}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                className="size-11 cursor-pointer rounded-full border border-border bg-surface font-bold text-heading transition-colors hover:bg-secondary aria-[current=page]:border-heading aria-[current=page]:bg-heading aria-[current=page]:text-primary-foreground"
              >
                {new Intl.NumberFormat(locale).format(pageNumber)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              className="min-h-11 cursor-pointer rounded-full border border-border bg-surface px-4 font-semibold text-heading transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {text.nextPage}
            </button>
          </nav>
        )}
      </div>
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
      <p className="mb-2 text-sm font-bold text-heading">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected === option.value}
            onClick={() => onSelect(option.value)}
            className="min-h-11 rounded-full border border-border px-4 text-sm font-bold text-heading transition-colors hover:bg-secondary aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-primary-foreground"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
