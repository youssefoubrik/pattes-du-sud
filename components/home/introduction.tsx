import { getEditableCopy } from "@/lib/editable-copy";
import { AnimalGreeting } from "@/components/animal-greeting";
import { LocationLabel } from "@/components/location-label";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionImage } from "@/components/ui/section-image";
import { homeContent } from "@/content/home";
import { getMediaSrc } from "@/lib/media";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { homeMessages } from "@/messages/home";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { animalMessages } from "@/messages/animals";

export function Introduction({ locale }: { locale: Locale }) {
  const text = getEditableCopy("home", locale, homeMessages[locale]);
  const image = homeContent.introductionImage;
  const photoSrc = getMediaSrc("home.introduction", image.src);
  const photoText = animalMessages[locale];
  const numberFormat = new Intl.NumberFormat(locale);
  const photoLabel = photoText.photoLabel
    .replace("{number}", numberFormat.format(1))
    .replace("{total}", numberFormat.format(1));

  return (
    <Section
      aria-labelledby="introduction-title"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <LocationLabel locale={locale} className="mb-5 text-sm font-medium" />
          <h1
            id="introduction-title"
            className="max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl"
          >
            {text.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">
            {text.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={`/${locale}/donate`} variant="donate" className="min-h-13">
              {messages[locale].donate}
            </ButtonLink>
            <ButtonLink
              href={`/${locale}/companions`}
              variant="secondary"
              arrow
              className="min-h-13 max-w-full gap-3 py-2 text-center"
            >
              {text.meetAnimals}
            </ButtonLink>
          </div>
        </div>

        <PhotoGalleryLightbox
          photos={[{ src: photoSrc, alt: text.imageAlt }]}
          locale={locale}
          label={text.imageAlt}
          closeLabel={photoText.closePhotoViewer}
          previousLabel={photoText.previousPhoto}
          nextLabel={photoText.nextPhoto}
          photoLabel={photoText.photoLabel}
        >
          <figure className="relative">
            <button
              type="button"
              data-photo-view-index={0}
              aria-label={photoText.viewPhoto.replace("{photo}", photoLabel)}
              className="group block w-full cursor-zoom-in rounded-3xl text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <SectionImage
                src={photoSrc}
                alt={text.imageAlt}
                preload
                objectPosition="60% center"
              />
            </button>
            <AnimalGreeting
              greeting={text.animalGreeting.replace("{name}", homeContent.introductionAnimalName)}
              message={text.animalWelcome}
            />
          </figure>
        </PhotoGalleryLightbox>
      </Container>
    </Section>
  );
}
