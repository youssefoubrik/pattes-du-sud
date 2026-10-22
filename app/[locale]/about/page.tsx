import { getEditableCopy } from "@/lib/editable-copy";
import { localizedRoute, routePaths } from "@/lib/routes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutIntroduction } from "@/components/about/about-introduction";
import { CareInPractice } from "@/components/about/care-in-practice";
import { AssociationInMirleft } from "@/components/about/association-in-mirleft";
import { ClosingInvitation } from "@/components/about/closing-invitation";
import { PeopleBehindCare } from "@/components/about/people-behind-care";
import { siteContent } from "@/content/site";
import { isLocale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { title, description } = getEditableCopy("about", locale, aboutMessages[locale]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: `${title} | ${siteContent.name}`,
    description,
    ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: `${localizedRoute(locale, routePaths.about)}` } } : {}),
    openGraph: { title, description, siteName: siteContent.name, type: "website", locale },
    twitter: { card: "summary", title, description },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <AboutIntroduction locale={locale} />
      <CareInPractice locale={locale} />
      <PeopleBehindCare locale={locale} />
      <AssociationInMirleft locale={locale} />
      <ClosingInvitation locale={locale} />
    </main>
  );
}
