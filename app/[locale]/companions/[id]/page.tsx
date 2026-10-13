import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/companions/[id]">): Promise<Metadata> {
  const { locale, id: rawId } = await params;
  if (!isLocale(locale)) notFound();
  const id = parseAnimalId(rawId);
  if (!id) notFound();
  const animal = getAnimal(id);
  if (!animal) notFound();
  return pageMetadata(
    locale,
    `/companions/${id}`,
    animal.name,
    `${animal.name} · ${animalMessages[locale].status[animal.status]} · ${animalMessages[locale].species[animal.species]}`,
    animal.image.src,
  );
}

export default async function AnimalDetail({
  params,
}: PageProps<"/[locale]/companions/[id]">) {
  const { locale, id: rawId } = await params;
  if (!isLocale(locale)) notFound();
  const id = parseAnimalId(rawId);
  if (!id) notFound();
  const animal = getAnimal(id);
  if (!animal) notFound();
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
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-secondary">
              <Image
                src={animal.image.src}
                alt={`${common.species[animal.species]} ${animal.name}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                preload
              />
            </div>
            <div>
              <p className="font-bold text-primary-hover">
                {common.status[animal.status]}
              </p>
              <h1 className="mt-2 text-5xl text-heading">{animal.name}</h1>
              <p className="mt-3 text-lg">{common.species[animal.species]}</p>
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
                  <p className="mt-3 whitespace-pre-line text-lg leading-relaxed">
                    {animal.story ||
                      (animal.personality &&
                        common.personality[animal.personality])}
                  </p>
                </>
              )}
              <div className="mt-9 flex flex-wrap gap-3">
                {animal.status === "available" && (
                  <ButtonLink href={whatsapp}>{t.adopt}</ButtonLink>
                )}
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
