"use client";

import { useState } from "react";
import { AnimalPreview } from "@/components/animal-preview";
import type { Animal } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";

type SpeciesFilter = "all" | Animal["species"];
type StatusFilter = "all" | "available" | "adopted";

export function AnimalGallery({
  animals,
  locale,
}: {
  animals: Animal[];
  locale: Locale;
}) {
  const [species, setSpecies] = useState<SpeciesFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const text = animalGalleryMessages[locale];
  const visible = animals.filter(
    (animal) =>
      (species === "all" || animal.species === species) &&
      (status === "all" || animal.status === status),
  );

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
          onSelect={setSpecies}
        />
        <FilterGroup
          label={text.statusLabel}
          options={[
            { value: "all", label: text.all },
            { value: "available", label: text.available },
            { value: "adopted", label: text.adopted },
          ]}
          selected={status}
          onSelect={setStatus}
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
            {visible.map((animal) => (
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
