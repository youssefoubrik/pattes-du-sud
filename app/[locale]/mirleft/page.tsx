import { getPageContent } from "@/lib/database/page-content";
import { localizedRoute, routePaths } from "@/lib/routes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionImage } from "@/components/ui/section-image";
import { homeContent } from "@/content/home";
import { getMediaSrc } from "@/lib/database/uploaded-media";
import { isLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/mirleft">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).mirleft;
  return pageMetadata(locale, "/mirleft", t.title, t.intro);
}
export default async function Mirleft({
  params,
}: PageProps<"/[locale]/mirleft">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).mirleft;
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />
      <Section className="pt-0">
        <Container className="max-w-3xl">
          <SectionImage
            src={getMediaSrc(
              "home.introduction",
              homeContent.introductionImage.src,
            )}
            alt={t.title}
            preload
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={localizedRoute(locale, routePaths.donate)} variant="donate">
              {t.donate}
            </ButtonLink>
            <ButtonLink href={localizedRoute(locale, routePaths.companions)} variant="secondary">
              {t.animals}
            </ButtonLink>
            <ButtonLink href={localizedRoute(locale, routePaths.contact)} variant="secondary">
              {t.contact}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
