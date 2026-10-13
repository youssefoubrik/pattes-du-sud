import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopyValue } from "@/components/donate/copy-value";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { getSettings } from "@/lib/db";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/donate">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).donate;
  return pageMetadata(locale, "/donate", t.title, t.intro);
}
export default async function Donate({
  params,
}: PageProps<"/[locale]/donate">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).donate;
  const s = getSettings();
  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />
      <Section className="bg-secondary">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-background p-6 sm:p-8">
            <h2 className="text-3xl text-heading">PayPal</h2>
            <p className="mt-3">{t.amount}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {s.paypalDonateUrl && (
                <ButtonLink href={s.paypalDonateUrl} variant="donate">
                  {t.once}
                </ButtonLink>
              )}
              {s.paypalMonthlyUrl && (
                <ButtonLink href={s.paypalMonthlyUrl} variant="secondary">
                  {t.monthly}
                </ButtonLink>
              )}
            </div>
            {!s.paypalDonateUrl && !s.paypalMonthlyUrl && (
              <p className="mt-5">{t.unavailable}</p>
            )}
          </div>
          <div className="rounded-3xl bg-background p-6 sm:p-8">
            <h2 className="text-3xl text-heading">{t.transfer}</h2>
            <p className="mt-3 leading-relaxed">{t.transferNote}</p>
            {(["bankName", "iban", "rib", "swift"] as const)
              .filter((key) => s[key])
              .map((key) => (
                <div
                  key={key}
                  className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-border py-2"
                >
                  <div>
                    <p className="text-sm font-bold uppercase text-muted-foreground">
                      {key}
                    </p>
                    <p className="break-all" dir="ltr">
                      {s[key]}
                    </p>
                  </div>
                  <CopyValue
                    value={s[key]}
                    label={t.copy}
                    copiedLabel={t.copied}
                  />
                </div>
              ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="max-w-3xl">
          <h2 className="text-3xl text-heading">{t.impact}</h2>
          <p className="mt-4 text-lg leading-relaxed">{t.impactText}</p>
        </Container>
      </Section>
    </main>
  );
}
