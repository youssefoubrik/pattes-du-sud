import { AnimalGallery } from "@/components/animals/animal-gallery";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ANIMAL_NAME_MAX_LENGTH } from "@/lib/animal-limits";
import { getPublicAnimalsPage } from "@/lib/db";
import type { Locale } from "@/i18n/routing";

const PAGE_SIZE = 6;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function CompanionsResults({
  locale,
  searchParams,
}: {
  locale: Locale;
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const search = typeof query.q === "string" ? query.q.trim().slice(0, ANIMAL_NAME_MAX_LENGTH) : "";
  const species = query.species === "dog" || query.species === "cat" ? query.species : "all";
  const status = query.status === "available" || query.status === "adopted" ? query.status : "all";
  const requestedPage = typeof query.page === "string" ? Number(query.page) : 1;
  const { animals, total, page, pageCount } = getPublicAnimalsPage(
    search,
    species,
    status,
    PAGE_SIZE,
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
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
