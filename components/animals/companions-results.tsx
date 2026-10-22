import { AnimalGallery } from "@/components/animals/animal-gallery";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPublicAnimalsPage } from "@/lib/db";
import type { Locale } from "@/i18n/routing";
import {
  normalizeGallerySearch,
  parseGalleryPage,
  parseGallerySpecies,
  parseGalleryStatus,
  type GallerySearchParams,
} from "@/lib/animal-gallery-params";

const PAGE_SIZE = 6;

type SearchParams = Promise<GallerySearchParams>;

export async function CompanionsResults({
  locale,
  searchParams,
}: {
  locale: Locale;
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const search = normalizeGallerySearch(typeof query.q === "string" ? query.q : undefined);
  const species = parseGallerySpecies(query.species);
  const status = parseGalleryStatus(query.status);
  const { animals, total, page, pageCount } = getPublicAnimalsPage(
    search,
    species,
    status,
    PAGE_SIZE,
    parseGalleryPage(query.page),
  );
  return (
    <Section aria-labelledby="companions-title" className="!pt-0">
      <Container>
        <AnimalGallery
          animals={animals}
          locale={locale}
          search={search}
          species={species}
          status={status}
          total={total}
          page={page}
          pageCount={pageCount}
        />
      </Container>
    </Section>
  );
}
