import { getEditableCopy } from "@/lib/editable-copy";
import { localizedRoute, routePaths } from "@/lib/routes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/animals/share-button";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/donate/thank-you">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).thanks;
  return {
    ...pageMetadata(locale, "/donate/thank-you", t.title, t.intro),
    robots: { index: false },
  };
}
export default async function ThankYou({
  params,
}: PageProps<"/[locale]/donate/thank-you">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).thanks;
  return (
    <main id="main-content" className="flex-1">
      <Section>
        <Container className="max-w-2xl text-center">
          <h1 className="text-4xl text-heading sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-lg leading-relaxed">{t.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={localizedRoute(locale, routePaths.home)}>{t.home}</ButtonLink>
            <ShareButton
              title="Pattes du Sud"
              label={t.share}
              copied={t.share}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
