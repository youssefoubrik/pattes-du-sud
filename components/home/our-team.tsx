import { getPageContent } from "@/lib/database/page-content";
import { localizedRoute, routePaths } from "@/lib/routes";
import { PawPrint } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { SectionImage } from "@/components/ui/section-image";
import { homeContent } from "@/content/home";
import { getSettings } from "@/lib/database/site-settings";
import { getMediaSrc } from "@/lib/database/uploaded-media";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { animalMessages } from "@/messages/animals";

export function OurTeam({ locale }: { locale: Locale }) {
  const text = getPageContent("home", locale, homeMessages[locale]).team;
  const image = homeContent.teamImage;
  const photoSrc = getMediaSrc("home.team", image.src);
  const photoText = animalMessages[locale];
  const numberFormat = new Intl.NumberFormat(locale);
  const photoLabel = photoText.photoLabel
    .replace("{number}", numberFormat.format(1))
    .replace("{total}", numberFormat.format(1));
  const settings = getSettings();

  return (
    <Section aria-labelledby="our-team-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <span aria-hidden="true" className="pointer-events-none absolute start-[25%] top-2 text-heading/30 sm:start-[12%]">
        <PawPrint size={26} fill="currentColor" className="-rotate-12 rtl:rotate-12" />
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute start-[8%] top-4 text-heading/30">
        <PawPrint size={22} fill="currentColor" className="rotate-12 rtl:-rotate-12" />
      </span>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <PhotoGalleryLightbox
            photos={[{ src: photoSrc, alt: text.imageAlt }]}
            className="lg:order-2"
            locale={locale}
            label={text.imageCaption}
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
                <SectionImage src={photoSrc} alt={text.imageAlt} aspect="landscape" />
              </button>
              <PhotoCaption>{text.imageCaption}</PhotoCaption>
            </figure>
          </PhotoGalleryLightbox>
          <div className="lg:order-1">
            <h2 id="our-team-title" className="text-3xl font-semibold text-heading sm:text-4xl">
              {text.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">
              {text.description}
            </p>
            {(settings.impactAnimalsHelped || settings.impactAdoptions) && <dl className="mt-6 flex flex-wrap gap-7">
              {settings.impactAnimalsHelped && <div><dt className="text-sm font-semibold text-heading">{text.animalsHelped}</dt><dd className="text-3xl font-bold text-primary-hover">{settings.impactAnimalsHelped}</dd></div>}
              {settings.impactAdoptions && <div><dt className="text-sm font-semibold text-heading">{text.adoptions}</dt><dd className="text-3xl font-bold text-primary-hover">{settings.impactAdoptions}</dd></div>}
            </dl>}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink
                href={localizedRoute(locale, routePaths.about)}
                variant="secondary"
                arrow
                compact
                className="max-w-full gap-2 py-2 text-center"
              >
                {text.meetTeam}
              </ButtonLink>
              <ButtonLink
                href={localizedRoute(locale, routePaths.volunteer)}
                variant="link"
              >
                {text.volunteerCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
