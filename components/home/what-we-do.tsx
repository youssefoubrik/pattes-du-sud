import { getPageContent } from "@/lib/database/page-content";
import { House, Soup, Stethoscope, UsersRound } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { homeContent } from "@/content/home";
import { getMediaSrc } from "@/lib/database/uploaded-media";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { animalMessages } from "@/messages/animals";

const services = [
  { id: "medical", icon: Stethoscope },
  { id: "foodShelter", icon: Soup },
  { id: "adoption", icon: House },
  { id: "education", icon: UsersRound },
] as const;

export function WhatWeDo({ locale }: { locale: Locale }) {
  const text = getPageContent("home", locale, homeMessages[locale]).whatWeDo;
  const images = homeContent.workImages;
  const photos = [
    { src: getMediaSrc("home.feeding", images.feeding.src), alt: text.imageAlt, objectPosition: "center 60%" },
    { src: getMediaSrc("home.veterinary", images.veterinary.src), alt: text.veterinaryImageAlt },
    { src: getMediaSrc("home.companionship", images.companionship.src), alt: text.companionshipImageAlt },
  ];
  const photoText = animalMessages[locale];
  const numberFormat = new Intl.NumberFormat(locale);

  return (
    <Section aria-labelledby="what-we-do-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <PhotoGalleryLightbox
          photos={photos}
          locale={locale}
          label={text.imageCaption}
          closeLabel={photoText.closePhotoViewer}
          previousLabel={photoText.previousPhoto}
          nextLabel={photoText.nextPhoto}
          photoLabel={photoText.photoLabel}
        >
        <figure>
          <div className="grid aspect-6/5 grid-cols-[1.1fr_1fr] grid-rows-2 gap-2 sm:gap-3">
            <button type="button" data-photo-view-index={0} aria-label={photoText.viewPhoto.replace("{photo}", photoText.photoLabel.replace("{number}", numberFormat.format(1)).replace("{total}", numberFormat.format(photos.length)))} className="group relative row-span-2 cursor-zoom-in overflow-hidden rounded-3xl bg-background text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <Image
                src={photos[0].src}
                alt={photos[0].alt}
                fill
                sizes="(min-width: 1024px) 300px, 55vw"
                className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                style={{ objectPosition: photos[0].objectPosition }}
              />
            </button>
            <button type="button" data-photo-view-index={1} aria-label={photoText.viewPhoto.replace("{photo}", photoText.photoLabel.replace("{number}", numberFormat.format(2)).replace("{total}", numberFormat.format(photos.length)))} className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-background text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <Image
                src={photos[1].src}
                alt={photos[1].alt}
                fill
                sizes="(min-width: 1024px) 260px, 45vw"
                className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
              />
            </button>
            <button type="button" data-photo-view-index={2} aria-label={photoText.viewPhoto.replace("{photo}", photoText.photoLabel.replace("{number}", numberFormat.format(3)).replace("{total}", numberFormat.format(photos.length)))} className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-background text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <Image
                src={photos[2].src}
                alt={photos[2].alt}
                fill
                sizes="(min-width: 1024px) 260px, 45vw"
                className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
              />
            </button>
          </div>
          <PhotoCaption>{text.imageCaption}</PhotoCaption>
        </figure>
        </PhotoGalleryLightbox>
        <div>
          <h2 id="what-we-do-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">{text.description}</p>
          <ul className="mt-8 space-y-6">
            {services.map(({ id, icon: Icon }) => (
              <li key={id} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background text-primary-hover">
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-heading">{text[id].title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-foreground">{text[id].description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
