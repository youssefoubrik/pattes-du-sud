import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { getMediaSrc } from "@/lib/media";
import { volunteerContent } from "@/content/volunteer";
import { pageMessages } from "@/messages/pages";
import Image from "next/image";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { animalMessages } from "@/messages/animals";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/volunteer">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).volunteer;
  return pageMetadata(locale, "/volunteer", t.title, t.intro);
}
export default async function Volunteer({
  params,
}: PageProps<"/[locale]/volunteer">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).volunteer;
  const photos = volunteerContent.actionImages.map((photo, index) => ({
    src: getMediaSrc(photo.key, photo.src),
    alt: t.actionImageAlts[index],
  }));
  const photoText = animalMessages[locale];
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} className="pb-4! sm:pb-6!">
        <ButtonLink
          href={`/${locale}/contact`}
          variant="secondary"
          arrow
          className="mt-6"
        >
          {t.arrangeVisit}
        </ButtonLink>
      </PageIntro>
      <Section className="pt-6! pb-10! sm:pt-8! sm:pb-12! lg:pt-10! lg:pb-14!">
        <Container>
          <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
            {t.actionImagesTitle}
          </h2>
          <PhotoGalleryLightbox
            photos={photos}
            locale={locale}
            label={t.actionImagesTitle}
            closeLabel={photoText.closePhotoViewer}
            previousLabel={photoText.previousPhoto}
            nextLabel={photoText.nextPhoto}
            photoLabel={photoText.photoLabel}
          >
            <ul className="mt-4 space-y-10 sm:space-y-14">
              {volunteerContent.actionImages.map((photo, index) => (
                <li key={photo.key}>
                  <article className="grid grid-cols-1 items-start gap-4 sm:gap-6 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[1100px]:items-center min-[1100px]:gap-10">
                    <figure className={index % 2 === 1 ? "min-[1100px]:order-2" : undefined}>
                      <button
                        type="button"
                        data-photo-view-index={index}
                        aria-label={photoText.viewPhoto.replace(
                          "{photo}",
                          t.actionImageCaptions[index],
                        )}
                        className="group relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <Image
                          src={photos[index].src}
                          alt={photos[index].alt}
                          fill
                          sizes="(min-width: 640px) 288px, 100vw"
                          className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03] rounded-md"
                        />
                      </button>
                      <PhotoCaption>{t.actionImageCaptions[index]}</PhotoCaption>
                    </figure>
                    <div className={index % 2 === 1 ? "min-[1100px]:order-1" : undefined}>
                      <h3 className="text-xl font-semibold text-heading">
                        {t.wayTitles[index]}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed">{t.ways[index]}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </PhotoGalleryLightbox>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-semibold text-heading sm:text-3xl">
              {t.visitTitle}
            </h2>
            <p className="mt-3 text-lg leading-relaxed">{t.visit}</p>
            <ol className="mt-5 space-y-3">
              {t.visitSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-heading"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>
    </main>
  );
}
