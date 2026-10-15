import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Heart, PawPrint } from "lucide-react";
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
          <Link
            href={`/${locale}/companions`}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-heading transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-heading"
          >
            <ArrowLeft
              size={18}
              className="text-primary rtl:rotate-180"
              aria-hidden="true"
            />
            {t.back}
          </Link>
          <div className="mt-7">
            <div className="mx-auto max-w-4xl">
              <CompanionPhotoGallery
                name={animal.name}
                speciesLabel={common.species[animal.species]}
                photos={animal.photos}
                locale={locale}
              />
            </div>
            <div className="mx-auto mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
                <div className="min-w-0">
                  <h1 className="text-5xl text-heading">{animal.name}</h1>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <p className="inline-flex items-center gap-2 text-base font-semibold text-accent">
                      <PawPrint size={18} aria-hidden="true" />
                      {common.species[animal.species]}
                    </p>
                    <p className="inline-flex items-center gap-2 text-base font-semibold text-primary-hover">
                      <Heart size={17} aria-hidden="true" />
                      {common.status[animal.status]}
                    </p>
                  </div>
                </div>
                {animal.status === "available" && (
                  <Link
                    href={whatsapp}
                    className="group flex min-h-12 w-full max-w-md items-center gap-3 rounded-full border-2 border-dashed border-heading/40 bg-secondary px-3 py-2 transition-[box-shadow,translate] duration-200 hover:shadow-sm motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                  >
                    <PawPrint
                      size={25}
                      className="shrink-0 text-primary transition-transform duration-200 motion-safe:group-hover:scale-110 group-hover:text-primary-hover motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                    <span className="font-bold text-heading">{t.adopt}</span>
                    <ArrowRight
                      size={18}
                      className="text-primary rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>
              <h2 className="mt-9 text-2xl text-heading">{t.facts}</h2>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                {animal.ageYears && (
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground">{t.age}</dt>
                    <dd className="mt-1 font-bold text-heading">
                      {common.age.replace("{age}", String(animal.ageYears))}
                    </dd>
                  </div>
                )}
                {animal.sex && (
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground">{t.sex}</dt>
                    <dd className="mt-1 font-bold text-heading">{t[animal.sex]}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-semibold text-muted-foreground">{t.vaccinated}</dt>
                  <dd className="mt-1 font-bold leading-snug text-heading">
                    {animal.vaccinated === "yes" ? t.vaccinatedYes : t.vaccinatedNo}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-muted-foreground">{t.sterilized}</dt>
                  <dd className="mt-1 font-bold leading-snug text-heading">
                    {animal.sterilized === "yes" ? t.sterilizedYes : t.sterilizedNo}
                  </dd>
                </div>
              </dl>
              {(animal.story || animal.personality) && (
                <section className="mt-9 border-t border-border pt-7">
                  <h2 className="text-2xl text-heading">{t.story}</h2>
                  <div className="mt-3 max-w-2xl space-y-4 text-lg leading-relaxed text-foreground">
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
                </section>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/${locale}/donate`} variant="donate">
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
            <div className="mx-auto mt-7 max-w-4xl">
              <div className="aspect-[4/3] rounded-2xl bg-secondary" />
              <div className="mt-8 space-y-5 py-2">
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
