import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { footerContent } from "@/content/footer";
import { isLocale } from "@/i18n/routing";
import { getSettings } from "@/lib/db";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).legal;
  return pageMetadata(locale, "/legal", t.title, t.intro);
}
export default async function Legal({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).legal;
  const s = getSettings();
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />
      <Section className="pt-0">
        <Container>
          <dl className="max-w-xl divide-y divide-border rounded-2xl border border-border bg-surface px-5">
            <div className="py-4">
              <dt className="font-semibold text-heading">{t.name}</dt>
              <dd>{footerContent.officialName}</dd>
            </div>
            {s.registrationReference && (
              <div className="py-4">
                <dt className="font-semibold text-heading">{t.registration}</dt>
                <dd>{s.registrationReference}</dd>
              </div>
            )}
            <div className="py-4">
              <dt className="font-semibold text-heading">{t.contact}</dt>
              <dd>{s.email || s.whatsappDisplay || "Mirleft, Morocco"}</dd>
            </div>
          </dl>
        </Container>
      </Section>
    </main>
  );
}
