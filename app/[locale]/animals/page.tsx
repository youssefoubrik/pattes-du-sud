import type { Metadata } from "next";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimalGallery } from "@/components/animals/animal-gallery";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAnimals } from "@/lib/db";
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
  const sortedAnimals = getAnimals().sort((a, b) => b.addedAt.localeCompare(a.addedAt));

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Section aria-labelledby="animals-title">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h1 id="animals-title" className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">{text.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground">{text.description}</p>
            <div className="mt-3 flex items-center gap-4 rounded-2xl border border-border bg-secondary px-4 py-3">
              <span className="flex shrink-0 items-center gap-0.5 text-primary" aria-hidden="true">
                <PawPrint size={17} className="-translate-y-1 -rotate-12" />
                <PawPrint size={17} className="translate-y-1 rotate-12" />
                <PawPrint size={17} className="-translate-y-1 -rotate-12" />
              </span>
              <div className="min-w-0">
                <p className="text-lg font-semibold leading-snug text-heading">{text.adoptionTitle}</p>
                <Link href={`/${locale}/adopt`} className="mt-1 inline-flex min-h-11 items-center font-bold text-accent underline underline-offset-4 hover:text-heading">
                  {text.adoptionLink}
                </Link>
              </div>
            </div>
          </div>
          <h2 className="sr-only">{text.title}</h2>
          <AnimalGallery animals={sortedAnimals} locale={locale} />
        </Container>
      </Section>
    </main>
  );
}
