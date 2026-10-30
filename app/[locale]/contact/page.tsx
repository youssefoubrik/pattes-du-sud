import { getPageContent } from "@/lib/database/page-content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactAvailability } from "@/components/contact/contact-availability";
import { ContactIntroduction } from "@/components/contact/contact-introduction";
import { ContactMethods } from "@/components/contact/contact-methods";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { getSettings } from "@/lib/database/site-settings";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).contact;
  return pageMetadata(locale, "/contact", t.title, t.intro);
}

export default async function Contact({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).contact;
  const s = getSettings();

  return (
    <main
      id="main-content"
      className="contact-page flex-1 text-foreground"
    >
      <ContactIntroduction text={t} />
      <Section className="!pt-0 !pb-10 sm:!pb-12">
        <Container width="content">
          {s.whatsappNumber || s.email ? (
            <>
              <ContactMethods text={t} settings={s} />
              <ContactAvailability locale={locale} text={t} settings={s} />
            </>
          ) : (
            <p className="text-muted-foreground">{t.unavailable}</p>
          )}
        </Container>
      </Section>
    </main>
  );
}
