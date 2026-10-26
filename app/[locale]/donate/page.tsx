import { getPageContent } from "@/lib/database/page-content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { CopyValue } from "@/components/donate/copy-value";
import { DonationExperience } from "@/components/donate/donation-experience";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
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
  const settings = getSettings();
  const bankDetails = (["bankName", "iban", "rib", "swift"] as const).filter(
    (key) => settings[key],
  );
  const hasPaypal = Boolean(
    settings.paypalDonateUrl || settings.paypalMonthlyUrl,
  );
  const bankLabels = {
    bankName: t.bankName,
    iban: t.iban,
    rib: t.rib,
    swift: t.swift,
  };

  return (
    <main
      id="main-content"
      className="donate-page flex min-h-screen flex-1 flex-col text-foreground"
    >
      <Section className="my-auto w-full pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
        <Container width="content">
          <DonationExperience
            copy={t}
            onceUrl={settings.paypalDonateUrl || null}
            monthlyUrl={settings.paypalMonthlyUrl || null}
            unavailable={
              !hasPaypal && bankDetails.length === 0 ? (
                <p className="rounded-3xl border border-border bg-surface p-6 text-muted-foreground">
                  {t.unavailable}
                </p>
              ) : undefined
            }
            bankTransfer={
              bankDetails.length > 0 ? (
                <details className="group relative z-10 rounded-2xl border border-border bg-surface">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-heading marker:hidden [&::-webkit-details-marker]:hidden">
                    {t.transfer}
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                    />
                  </summary>
                  <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 max-h-[min(28rem,60vh)] overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-md">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t.transferNote}
                    </p>
                    <dl className="mt-3 grid gap-2">
                      {bankDetails.map((key) => (
                        <div
                          key={key}
                          className="grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] items-center gap-3"
                        >
                          <dt className="text-xs font-semibold text-muted-foreground">
                            {bankLabels[key]}
                          </dt>
                          <dd className="flex min-w-0 items-center justify-between gap-2" dir="ltr">
                            <span className="break-all text-sm font-medium text-foreground">
                              {settings[key]}
                            </span>
                            {key !== "bankName" && (
                              <CopyValue
                                value={settings[key]}
                                copiedLabel={t.copied}
                                accessibleLabel={`${t.copy} ${bankLabels[key]}`}
                              />
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </details>
              ) : undefined
            }
          />
        </Container>
      </Section>
    </main>
  );
}
