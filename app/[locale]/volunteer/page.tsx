import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VolunteerIntroduction } from "@/components/volunteer/volunteer-introduction";
import { VolunteerVisit } from "@/components/volunteer/volunteer-visit";
import { VolunteerWaysToHelp } from "@/components/volunteer/volunteer-ways-to-help";
import { isLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

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
  return (
    <main id="main-content" className="flex-1">
      <VolunteerIntroduction locale={locale} />
      <VolunteerWaysToHelp locale={locale} />
      <VolunteerVisit locale={locale} />
    </main>
  );
}
