import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompanionPhotoGallery } from "@/components/companions/companion-photo-gallery";
import { ShareButton } from "@/components/animals/share-button";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { getAnimal, getSettings } from "@/lib/db";
import { pageMetadata } from "@/lib/metadata";
import { animalMessages } from "@/messages/animals";
import { pageMessages } from "@/messages/pages";

function parseAnimalId(value: string) {
  if (!/^[1-9]\d*$/.test(value)) return undefined;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : undefined;
}

type CompanionPageParams = Pick<PageProps<"/[locale]/companions/[id]">, "params">;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/companions/[id]">): Promise<Metadata> {
  const { locale, id: rawId } = await params;
  if (!isLocale(locale)) notFound();
  const id = parseAnimalId(rawId);
  if (!id) notFound();
  const animal = getAnimal(id);
  if (!animal) notFound();
  const primaryPhoto = animal.photos[0];
  if (!primaryPhoto) notFound();
  return pageMetadata(
    locale,
    `/companions/${id}`,
    animal.name,
    `${animal.name} · ${animalMessages[locale].status[animal.status]} · ${animalMessages[locale].species[animal.species]}`,
    primaryPhoto.src,
  );
}

export default function AnimalDetail({
  params,
}: CompanionPageParams) {
  return (
    <Suspense fallback={<CompanionFallback />}>
      <AnimalDetailContent params={params} />
    </Suspense>
  );
}

async function AnimalDetailContent({
  params,
}: CompanionPageParams) {
  const { locale, id: rawId } = await params;
  if (!isLocale(locale)) notFound();
  const id = parseAnimalId(rawId);
  if (!id) notFound();
  const animal = getAnimal(id);
  if (!animal) notFound();
  if (!animal.photos.length) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).animal;
  const common = animalMessages[locale];
  const settings = getSettings();
  const whatsapp = settings.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hello, I would like to ask about adopting ${animal.name}.`)}`
    : `/${locale}/contact`;
  return (
    <main id="main-content" className="flex-1">
      <Section>
        <Container>
          <Link href={`/${locale}/companions`} className="text-accent underline">
            ← {t.back}
          </Link>
          <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <CompanionPhotoGallery
              name={animal.name}
              speciesLabel={common.species[animal.species]}
              photos={animal.photos}
              locale={locale}
            />
            <div>
              <p className="inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-sm font-bold text-heading">
                {common.status[animal.status]}
              </p>
              <h1 className="mt-2 text-5xl text-heading">{animal.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {common.species[animal.species]}
              </p>
              {animal.status === "available" && (
                <div className="mt-6">
                  <ButtonLink href={whatsapp} arrow>
                    {t.adopt}
                  </ButtonLink>
                </div>
              )}
              <h2 className="mt-9 text-2xl text-heading">{t.facts}</h2>
              <dl className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface px-5">
                {animal.ageYears && (
                  <div className="flex justify-between gap-5 py-3">
                    <dt>{t.age}</dt>
                    <dd>
                      {common.age.replace("{age}", String(animal.ageYears))}
                    </dd>
                  </div>
                )}
                {animal.sex && (
                  <div className="flex justify-between gap-5 py-3">
                    <dt>{t.sex}</dt>
                    <dd>{t[animal.sex]}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-5 py-3">
                  <dt>{t.vaccinated}</dt>
                  <dd>{animal.vaccinated ? t.yes : t.unknown}</dd>
                </div>
                <div className="flex justify-between gap-5 py-3">
                  <dt>{t.sterilized}</dt>
                  <dd>{animal.sterilized ? t.yes : t.unknown}</dd>
                </div>
              </dl>
              {(animal.story || animal.personality) && (
                <>
                  <h2 className="mt-9 text-2xl text-heading">{t.story}</h2>
                  <div className="mt-3 max-w-[58ch] space-y-4 text-lg leading-8">
                    {(animal.story ||
                      (animal.personality &&
                        common.personality[animal.personality]) ||
                      "")
                      .split(/\n\s*\n/)
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p key={index} className="whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </>
              )}
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink
                  href={`/${locale}/donate`}
                  variant={animal.status === "available" ? "secondary" : "donate"}
                >
                  {t.help}
                </ButtonLink>
                <ShareButton
                  title={animal.name}
                  label={t.share}
                  copied={t.shareFallback}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function CompanionFallback() {
  return (
    <main aria-busy="true" className="flex-1">
      <Section>
        <Container>
          <div aria-hidden="true" className="motion-safe:animate-pulse">
            <div className="h-5 w-36 rounded bg-secondary" />
            <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="aspect-4/5 rounded-3xl bg-secondary" />
              <div className="space-y-5 py-2">
                <div className="h-5 w-32 rounded bg-secondary" />
                <div className="h-12 w-2/3 rounded bg-secondary" />
                <div className="h-6 w-1/3 rounded bg-secondary" />
                <div className="mt-9 h-40 rounded-2xl bg-secondary" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
