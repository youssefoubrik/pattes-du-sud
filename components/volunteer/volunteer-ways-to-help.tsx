import Image from "next/image";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { animalMessages } from "@/messages/animals";
import { pageMessages } from "@/messages/pages";
import { volunteerContent } from "@/content/volunteer";
import { getPageContent } from "@/lib/database/page-content";
import { getMediaSrc } from "@/lib/database/uploaded-media";
import type { Locale } from "@/i18n/routing";

export function VolunteerWaysToHelp({ locale }: { locale: Locale }) {
  const text = getPageContent("pages", locale, pageMessages[locale]).volunteer;
  const photos = volunteerContent.actionImages.map((photo, index) => ({
    src: getMediaSrc(photo.key, photo.src),
    alt: text.actionImageAlts[index],
  }));
  const photoText = animalMessages[locale];

  return (
    <Section className="pt-6! pb-6! sm:pt-8! sm:pb-8! lg:pt-10! lg:pb-10!">
      <Container>
        <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
          {text.actionImagesTitle}
        </h2>
        <PhotoGalleryLightbox
          photos={photos}
          locale={locale}
          label={text.actionImagesTitle}
          closeLabel={photoText.closePhotoViewer}
          previousLabel={photoText.previousPhoto}
          nextLabel={photoText.nextPhoto}
          photoLabel={photoText.photoLabel}
        >
          <ul className="mt-4 space-y-7 sm:space-y-10">
            {volunteerContent.actionImages.map((photo, index) => (
              <li key={photo.key}>
                <article className="grid grid-cols-1 items-start gap-4 sm:gap-6 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[1100px]:items-center min-[1100px]:gap-10">
                  <figure className={index % 2 === 1 ? "min-[1100px]:order-2" : undefined}>
                    <button
                      type="button"
                      data-photo-view-index={index}
                      aria-label={photoText.viewPhoto.replace(
                        "{photo}",
                        text.actionImageCaptions[index],
                      )}
                      className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Image
                        src={photos[index].src}
                        alt={photos[index].alt}
                        fill
                        sizes="(min-width: 640px) 288px, 100vw"
                        className="rounded-md object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                      />
                    </button>
                    <PhotoCaption className="!mt-3">{text.actionImageCaptions[index]}</PhotoCaption>
                  </figure>
                  <div className={index % 2 === 1 ? "min-[1100px]:order-1" : undefined}>
                    <h3 className="text-xl font-semibold text-heading">
                      {text.wayTitles[index]}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed">{text.ways[index]}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </PhotoGalleryLightbox>
      </Container>
    </Section>
  );
}
