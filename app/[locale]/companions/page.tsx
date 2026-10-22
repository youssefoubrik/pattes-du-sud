import type { Metadata } from "next";
import { localizedRoute, routePaths } from "@/lib/routes";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CompanionsIntroduction } from "@/components/animals/companions-introduction";
import { CompanionsResults } from "@/components/animals/companions-results";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteContent } from "@/content/site";
import { isLocale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";

type Props = PageProps<"/[locale]/companions">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { title, description } = animalGalleryMessages[locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: `${title} | ${siteContent.name}`,
    description,
    ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: `${localizedRoute(locale, routePaths.companions)}` } } : {}),
    openGraph: { title, description, siteName: siteContent.name, type: "website", locale },
    twitter: { card: "summary", title, description },
  };
}

export default async function AnimalsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <CompanionsIntroduction locale={locale} />
      <Suspense
        fallback={
          <Section className="!pt-0">
            <Container>
              <p className="text-sm font-semibold text-muted-foreground" role="status">
                {animalGalleryMessages[locale].loading}
              </p>
            </Container>
          </Section>
        }
      >
        <CompanionsResults locale={locale} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
