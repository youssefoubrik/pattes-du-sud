import { getPageContent } from "@/lib/database/page-content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdoptIntroduction } from "@/components/adopt/adopt-introduction";
import { AdoptionGuidance } from "@/components/adopt/adoption-guidance";
import { AdoptionSteps } from "@/components/adopt/adoption-steps";
import { isLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/adopt">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).adopt;
  return pageMetadata(locale, "/adopt", t.title, t.intro);
}
export default async function Adopt({ params }: PageProps<"/[locale]/adopt">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main id="main-content" className="flex-1">
      <AdoptIntroduction locale={locale} />
      <AdoptionSteps locale={locale} />
      <AdoptionGuidance locale={locale} />
    </main>
  );
}
