import { AnimalPreview } from "@/components/animal-preview";
import { GalleryFilters } from "@/components/animals/gallery-filters";
import { GalleryPagination } from "@/components/animals/gallery-pagination";
import type { Animal } from "@/content/animals";
import type { Locale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";
import type { SpeciesFilter, StatusFilter } from "@/components/animals/gallery-url";

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

  return (
    <div>
      <GalleryFilters locale={locale} search={search} species={species} status={status} />
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
            {search || species !== "all" || status !== "all" ? text.empty : text.emptyCollection}
          </p>
        )}
        <GalleryPagination
          locale={locale}
          search={search}
          species={species}
          status={status}
          page={page}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}
