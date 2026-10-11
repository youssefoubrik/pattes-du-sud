import { Introduction } from "@/components/home/introduction";
import { MeetAnimals } from "@/components/home/meet-animals";
import { OurTeam } from "@/components/home/our-team";
import { WhatWeDo } from "@/components/home/what-we-do";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <Introduction locale={locale} />
      <WhatWeDo locale={locale} />
      <MeetAnimals locale={locale} />
      <OurTeam locale={locale} />
    </main>
  );
}
