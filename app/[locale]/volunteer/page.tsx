import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
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
  const t = getEditableCopy("pages", locale, pageMessages[locale]).volunteer;
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />
      <Section className="bg-secondary">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {t.ways.map((way) => (
              <li
                key={way}
                className="rounded-3xl bg-background p-6 text-lg leading-relaxed"
              >
                {way}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container>
          <p className="max-w-2xl text-lg leading-relaxed">{t.visit}</p>
          <ButtonLink href={`/${locale}/contact`} className="mt-6">
            {t.contact}
          </ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
