import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimalGallery } from "@/components/animals/animal-gallery";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { animals } from "@/content/animals";
import { siteContent } from "@/content/site";
import { isLocale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { title, description } = animalGalleryMessages[locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: `${title} | ${siteContent.name}`,
    description,
    ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: `/${locale}/animals` } } : {}),
    openGraph: { title, description, siteName: siteContent.name, type: "website", locale },
    twitter: { card: "summary", title, description },
  };
}

export default async function AnimalsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = animalGalleryMessages[locale];
  const sortedAnimals = [...animals].sort((a, b) => b.addedAt.localeCompare(a.addedAt));

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Section aria-labelledby="animals-title">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h1 id="animals-title" className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">{text.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground">{text.description}</p>
          </div>
          <h2 className="sr-only">{text.title}</h2>
          <AnimalGallery animals={sortedAnimals} locale={locale} />
        </Container>
      </Section>
      <Section className="bg-secondary" aria-labelledby="adoption-title">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="adoption-title" className="text-3xl font-semibold text-heading">{text.adoptionTitle}</h2>
            <p className="mt-3 text-lg text-foreground">{text.adoptionDescription}</p>
          </div>
          <ButtonLink href={`/${locale}/adopt`} variant="secondary" arrow>{text.adoptionLink}</ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
