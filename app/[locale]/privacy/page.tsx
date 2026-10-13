import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).privacy;
  return pageMetadata(locale, "/privacy", t.title, t.intro);
}
export default async function Privacy({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).privacy;
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />
      <Section className="pt-0">
        <Container className="max-w-3xl space-y-5 text-lg leading-relaxed">
          <p>{t.data}</p>
          <p>{t.payments}</p>
          <p>{t.contact}</p>
        </Container>
      </Section>
    </main>
  );
}
