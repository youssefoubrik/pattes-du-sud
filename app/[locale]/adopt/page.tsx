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
}: PageProps<"/[locale]/adopt">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).adopt;
  return pageMetadata(locale, "/adopt", t.title, t.intro);
}
export default async function Adopt({ params }: PageProps<"/[locale]/adopt">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).adopt;
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />
      <Section className="bg-secondary">
        <Container>
          <h2 className="text-3xl text-heading">{t.title}</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {t.steps.map((step, i) => (
              <li key={step} className="rounded-3xl bg-background p-6">
                <span className="text-2xl font-bold text-primary-hover">
                  0{i + 1}
                </span>
                <p className="mt-3 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl text-heading">{t.localTitle}</h2>
            <p className="mt-3 leading-relaxed">{t.local}</p>
          </div>
          <div>
            <h2 className="text-2xl text-heading">{t.internationalTitle}</h2>
            <p className="mt-3 leading-relaxed">{t.international}</p>
          </div>
          <ButtonLink
            href={`/${locale}/contact`}
            className="w-fit md:col-span-2"
          >
            {t.contact}
          </ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
