import { getPageContent } from "@/lib/database/page-content";
import { localizedRoute, routePaths } from "@/lib/routes";
import Image from "next/image";
import { getMediaSrc } from "@/lib/database/uploaded-media";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { aboutContent } from "@/content/about";
import type { Locale } from "@/i18n/routing";
import { animalMessages } from "@/messages/animals";
import { aboutMessages } from "@/messages/about";

export function PeopleBehindCare({ locale }: { locale: Locale }) {
  const text = getPageContent("about", locale, aboutMessages[locale]).team;
  const members = aboutContent.teamMembers.slice(0, 4);
  const photoText = animalMessages[locale];
  const numberFormat = new Intl.NumberFormat(locale);
  const photos = members.map((member) => ({
    src: getMediaSrc(`about.team.${member.id}`, member.portrait.src),
    alt: `${member.firstName}, ${member.role[locale]}`,
  }));

  return (
    <Section aria-labelledby="about-team-title" className="relative bg-background">
      <SectionDivider direction="leave" />
      <Container>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10">
          <div>
            <h2 id="about-team-title" className="text-3xl font-semibold text-heading sm:text-4xl">
              {text.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
              {text.introduction}
            </p>
          </div>
          <ButtonLink href={localizedRoute(locale, routePaths.volunteer)} variant="secondary" arrow className="w-fit max-w-full md:mt-1">
            {text.volunteer}
          </ButtonLink>
        </div>

        {members.length > 0 && (
          <PhotoGalleryLightbox
            photos={photos}
            locale={locale}
            label={text.title}
            closeLabel={photoText.closePhotoViewer}
            previousLabel={photoText.previousPhoto}
            nextLabel={photoText.nextPhoto}
            photoLabel={photoText.photoLabel}
          >
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 lg:mt-10 lg:gap-x-8">
              {members.map((member, index) => {
                const currentPhotoLabel = photoText.photoLabel
                  .replace("{number}", numberFormat.format(index + 1))
                  .replace("{total}", numberFormat.format(members.length));
                const viewLabel = photoText.viewPhoto.replace("{photo}", currentPhotoLabel);

                return (
                  <li key={member.id}>
                    <article>
                      <button
                        type="button"
                        data-photo-view-index={index}
                        aria-label={viewLabel}
                        className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-xl bg-secondary text-start focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading"
                      >
                        <Image
                          src={photos[index].src}
                          alt=""
                          fill
                          sizes="(max-width: 767px) 50vw, 25vw"
                          className="object-cover transition-transform duration-200 motion-safe:group-hover:scale-[1.03]"
                        />
                      </button>
                      <div className="mt-4 min-w-0">
                        <h3 className="text-xl font-semibold text-heading">{member.firstName}</h3>
                        <p className="mt-1 break-words text-sm font-bold leading-snug text-primary-hover">{member.role[locale]}</p>
                        <p className="mt-2 break-words text-sm leading-relaxed text-foreground">{member.work[locale]}</p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </PhotoGalleryLightbox>
        )}
      </Container>
    </Section>
  );
}
