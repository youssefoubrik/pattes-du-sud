import Image from "next/image";
import { getPageContent } from "@/lib/database/page-content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopyValue } from "@/components/donate/copy-value";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { isLocale } from "@/i18n/routing";
import { getSettings } from "@/lib/database/site-settings";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/donate">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).donate;
  return pageMetadata(locale, "/donate", t.title, t.intro);
}

export default async function Donate({
  params,
}: PageProps<"/[locale]/donate">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageContent("pages", locale, pageMessages[locale]).donate;
  const s = getSettings();
  const bankDetails = (["bankName", "iban", "rib", "swift"] as const).filter(
    (key) => s[key],
  );
  const transparency = (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold text-heading">
        {t.transparencyTitle}
      </h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        {t.impactText}
      </p>
    </div>
  );

  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />

      <Section className="bg-secondary">
        <Container className="max-w-4xl">
          <div
            className="grid gap-5 md:grid-cols-2"
          >
            <div className="flex flex-col border-l-4 border-primary bg-background p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">
                {t.recommended}
              </p>
              <h2 className="mt-2 text-3xl text-heading">{t.monthly}</h2>
              <p className="mt-3 flex-1 leading-relaxed">{t.monthlyNote}</p>
              {s.paypalMonthlyUrl ? (
                <ButtonLink
                  className="mt-6 w-fit"
                  href={s.paypalMonthlyUrl}
                  variant="donate"
                >
                  {t.give}
                </ButtonLink>
              ) : s.paypalDonateUrl ? (
                <p className="mt-6 text-sm text-muted-foreground">
                  {t.unavailable}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col border border-border bg-background p-6 sm:p-8">
              <h2 className="text-3xl text-heading">{t.once}</h2>
              <p className="mt-3 flex-1 leading-relaxed">{t.onceNote}</p>
              {s.paypalDonateUrl ? (
                <ButtonLink
                  className="mt-6 w-fit"
                  href={s.paypalDonateUrl}
                  variant="secondary"
                >
                  {t.give}
                </ButtonLink>
              ) : s.paypalMonthlyUrl ? (
                <p className="mt-6 text-sm text-muted-foreground">
                  {t.unavailable}
                </p>
              ) : null}
            </div>
          </div>

          {!s.paypalMonthlyUrl && !s.paypalDonateUrl && (
            <p className="mt-5 text-center text-sm text-muted-foreground">
              {t.unavailable}
            </p>
          )}

          <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-3">
            {s.paypalMonthlyUrl || s.paypalDonateUrl ? (
              <span>{t.paypalTrust}</span>
            ) : null}
            <Image
              src="/brand/paypal-mark.jpg"
              alt="PayPal"
              width={38}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        </Container>
      </Section>

      <Section className="relative bg-background">
        <SectionDivider direction="leave" />
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl text-heading">{t.impact}</h2>
          </div>
          <div className="mt-8 grid gap-8 border-t border-border pt-6 md:grid-cols-3 md:gap-10">
            {[
              [t.dailyCare, t.dailyCareText],
              [t.veterinaryCare, t.veterinaryCareText],
              [t.prevention, t.preventionText],
            ].map(([title, description]) => (
              <article key={title} className="border-l-2 border-primary pl-4">
                <h3 className="text-xl font-bold text-heading">{title}</h3>
                <p className="mt-2 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
          {bankDetails.length === 0 && (
            <div className="mt-10 border-t border-border pt-6">
              {transparency}
            </div>
          )}
        </Container>
      </Section>

      {bankDetails.length > 0 && (
        <>
          <Section className="bg-secondary">
            <Container className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl text-heading">{t.transfer}</h2>
                <p className="mt-3 leading-relaxed">{t.transferNote}</p>
              </div>
              <div className="border border-border bg-surface px-5">
                {bankDetails.map((key) => (
                  <div
                    key={key}
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-4 last:border-b-0"
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
          <Section className="relative bg-background">
            <SectionDivider direction="leave" />
            <Container>{transparency}</Container>
          </Section>
        </>
      )}
    </main>
  );
}
