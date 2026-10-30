import { getPageContent } from "@/lib/database/page-content";
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
  const t = getPageContent("pages", locale, pageMessages[locale]).privacy;
  return pageMetadata(locale, "/privacy", t.title, t.intro);
}
export default async function Privacy({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).privacy;
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} className="!pb-0" />
      <Section className="!pt-0">
        <Container className="max-w-3xl text-lg leading-relaxed">
          <ul className="list-disc space-y-5 ps-6 marker:text-primary">
            <li>
              <span className="font-semibold text-heading">{t.analyticsTitle}.</span>{" "}
              {t.analytics}
            </li>
            <li>
              <span className="font-semibold text-heading">{t.mapTitle}.</span>{" "}
              {t.map}
            </li>
            <li>
              <span className="font-semibold text-heading">{t.contactMethodsTitle}.</span>{" "}
              {t.contactMethods}
            </li>
            <li>
              <span className="font-semibold text-heading">{t.cookiesTitle}.</span>{" "}
              {t.cookies}
            </li>
            <li>
              <span className="font-semibold text-heading">{t.paymentsTitle}.</span>{" "}
              {t.payments}
            </li>
            <li>
              <span className="font-semibold text-heading">{t.questionsTitle}.</span>{" "}
              {t.contact}
            </li>
          </ul>
        </Container>
      </Section>
    </main>
  );
}
