import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareInPractice } from "@/components/about/care-in-practice";
import { AssociationInMirleft } from "@/components/about/association-in-mirleft";
import { ClosingInvitation } from "@/components/about/closing-invitation";
import { PeopleBehindCare } from "@/components/about/people-behind-care";
import { Container } from "@/components/ui/container";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { SectionImage } from "@/components/ui/section-image";
import { PhotoGalleryLightbox } from "@/components/media/photo-gallery-lightbox";
import { aboutContent } from "@/content/about";
import { getMediaSrc } from "@/lib/media";
import { siteContent } from "@/content/site";
import { isLocale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";
import { animalMessages } from "@/messages/animals";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { title, description } = getEditableCopy("about", locale, aboutMessages[locale]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: `${title} | ${siteContent.name}`,
    description,
    ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: `/${locale}/about` } } : {}),
    openGraph: { title, description, siteName: siteContent.name, type: "website", locale },
    twitter: { card: "summary", title, description },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = getEditableCopy("about", locale, aboutMessages[locale]);
  const image = aboutContent.introductionImage;
  const photoSrc = getMediaSrc("about.introduction", image.src);
  const photoText = animalMessages[locale];
  const numberFormat = new Intl.NumberFormat(locale);
  const photoLabel = photoText.photoLabel
    .replace("{number}", numberFormat.format(1))
    .replace("{total}", numberFormat.format(1));

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Section aria-labelledby="about-title">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 id="about-title" className="max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              {text.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">{text.introduction}</p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">{text.purpose}</p>
            {aboutContent.foundingStory && (
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">
                {aboutContent.foundingStory[locale]}
              </p>
            )}
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
                <SectionImage src={photoSrc} alt={text.imageAlt} preload objectPosition="center 45%" />
              </button>
              <PhotoCaption>{text.imageCaption}</PhotoCaption>
            </figure>
          </PhotoGalleryLightbox>
        </Container>
      </Section>
      <CareInPractice locale={locale} />
      <PeopleBehindCare locale={locale} />
      <AssociationInMirleft locale={locale} />
      <ClosingInvitation locale={locale} />
    </main>
  );
}
