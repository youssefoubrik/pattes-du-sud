import type { Metadata } from "next";
import { ArrowRight, PawPrint } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimalGallery } from "@/components/animals/animal-gallery";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPublicAnimalsPage } from "@/lib/db";
import { ANIMAL_NAME_MAX_LENGTH } from "@/lib/animal-limits";
import { siteContent } from "@/content/site";
import { isLocale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";
import type { Locale } from "@/i18n/routing";

type Props = PageProps<"/[locale]/companions">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { title, description } = animalGalleryMessages[locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: `${title} | ${siteContent.name}`,
    description,
    ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: `/${locale}/companions` } } : {}),
    openGraph: { title, description, siteName: siteContent.name, type: "website", locale },
    twitter: { card: "summary", title, description },
  };
}

const PAGE_SIZE = 6;

export default async function AnimalsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
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
  const text = animalGalleryMessages[locale];

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Section aria-labelledby="companions-title">
        <Container>
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 id="companions-title" className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">{text.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-foreground">{text.description}</p>
            </div>
            <Link
              href={`/${locale}/adopt`}
              className="group flex min-h-20 w-full shrink-0 items-center gap-4 self-start rounded-2xl bg-secondary-button px-4 py-3 text-background transition-[opacity,box-shadow] duration-200 hover:opacity-90 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:mt-1 sm:w-fit sm:min-w-64"
            >
              <PawPrint
                size={25}
                className="shrink-0 text-background transition-transform duration-200 motion-safe:group-hover:scale-110 motion-reduce:transition-none"
                aria-hidden="true"
              />
              <span className="flex flex-col gap-1">
                <span className="font-bold">{text.adoptionPrompt}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">
                  {text.adoptionLink}
                  <ArrowRight size={15} className="rtl:rotate-180" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </div>
          <h2 className="sr-only">{text.title}</h2>
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
    </main>
  );
}
