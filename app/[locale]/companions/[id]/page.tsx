import { getEditableCopy } from "@/lib/editable-copy";
import { localizedRoute, routePaths } from "@/lib/routes";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CompanionPhotoGallery } from "@/components/companions/companion-photo-gallery";
import { CompanionProfileActions } from "@/components/companions/companion-profile-actions";
import { CompanionProfileFacts } from "@/components/companions/companion-profile-facts";
import { CompanionProfileHeading } from "@/components/companions/companion-profile-heading";
import { CompanionProfileStory } from "@/components/companions/companion-profile-story";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { getAnimal, getSettings } from "@/lib/db";
import { pageMetadata } from "@/lib/metadata";
import { parseAnimalId } from "@/lib/animal-id";
import { animalMessages } from "@/messages/animals";
import { pageMessages } from "@/messages/pages";
import { animalCopyForLocale } from "@/lib/animal-copy";
import { getCompanionProfileFacts } from "@/lib/companion-profile";
import { splitParagraphs } from "@/lib/text";
import { whatsappUrl } from "@/lib/whatsapp";

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
  return pageMetadata(
    locale,
    routePaths.companion(id),
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
  const t = getEditableCopy("pages", locale, pageMessages[locale]).animal;
  const common = animalMessages[locale];
  const story = animalCopyForLocale(animal.story, locale);
  const settings = getSettings();
  const whatsapp = whatsappUrl(
    settings.whatsappNumber,
    common.adoptionMessage.replace("{name}", animal.name),
  );
  const storyText = story || (animal.personality && common.personality[animal.personality]) || "";
  const paragraphs = splitParagraphs(storyText);
  const facts = getCompanionProfileFacts(animal, common, t);
  return (
    <main id="main-content" className="flex-1">
      <Section>
        <Container>
          <BackLink href={localizedRoute(locale, routePaths.companions)}>
            {t.back}
          </BackLink>
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
              <CompanionProfileHeading
                name={animal.name}
                species={common.species[animal.species]}
                status={common.status[animal.status]}
                adoptionHref={animal.status === "available" ? whatsapp : undefined}
                adoptLabel={t.adopt}
              />
              <CompanionProfileFacts title={t.facts} facts={facts} />
              <CompanionProfileStory title={t.story} paragraphs={paragraphs} />
              <CompanionProfileActions
                donateHref={localizedRoute(locale, routePaths.donate)}
                donateLabel={t.help}
                shareLabel={t.share}
                shareFallback={t.shareFallback}
                title={animal.name}
              />
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
