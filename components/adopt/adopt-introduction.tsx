import { getPageContent } from "@/lib/database/page-content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionImage } from "@/components/ui/section-image";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { adoptContent } from "@/content/adopt";
import { getMediaSrc } from "@/lib/database/uploaded-media";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";
import { animalMessages } from "@/messages/animals";

export function AdoptIntroduction({ locale }: { locale: Locale }) {
  const text = getPageContent("pages", locale, pageMessages[locale]).adopt;
  const photoSrc = getMediaSrc("adopt.introduction", adoptContent.introductionImage.src);
  const photoText = animalMessages[locale];
  const numberFormat = new Intl.NumberFormat(locale);
  const photoLabel = photoText.photoLabel
    .replace("{number}", numberFormat.format(1))
    .replace("{total}", numberFormat.format(1));

  return (
    <Section aria-labelledby="adopt-title">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 id="adopt-title" className="max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            {text.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">{text.intro}</p>
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
          <figure>
            <button
              type="button"
              data-photo-view-index={0}
              aria-label={photoText.viewPhoto.replace("{photo}", photoLabel)}
              className="group block w-full cursor-zoom-in rounded-3xl text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <SectionImage src={photoSrc} alt={text.imageAlt} preload objectPosition="60% center" />
            </button>
            <PhotoCaption>{text.imageCaption}</PhotoCaption>
          </figure>
        </PhotoGalleryLightbox>
      </Container>
    </Section>
  );
}
