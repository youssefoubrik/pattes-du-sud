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
import { aboutContent } from "@/content/about";
import { siteContent } from "@/content/site";
import { isLocale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { title, description } = aboutMessages[locale];
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

  const text = aboutMessages[locale];
  const image = aboutContent.introductionImage;

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Section aria-labelledby="about-title">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-5 text-sm font-bold text-heading">{text.eyebrow}</p>
            <h1 id="about-title" className="max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              {text.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">{text.introduction}</p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">{text.purpose}</p>
          </div>
          <figure>
            <SectionImage src={image.src} alt={text.imageAlt} preload objectPosition="center 45%" />
            <PhotoCaption>{text.imageCaption}</PhotoCaption>
          </figure>
        </Container>
      </Section>
      <CareInPractice locale={locale} />
      <PeopleBehindCare locale={locale} />
      <AssociationInMirleft locale={locale} />
      <ClosingInvitation locale={locale} />
    </main>
  );
}
