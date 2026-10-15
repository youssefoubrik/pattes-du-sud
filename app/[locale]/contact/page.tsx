import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { getSettings } from "@/lib/db";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";

function ContactMethod({
  href,
  icon: Icon,
  title,
  detail,
  hint,
  className = "",
  detailClassName = "",
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  hint: string;
  className?: string;
  detailClassName?: string;
}) {
  return (
    <a
      href={href}
      className={`group rounded-3xl bg-secondary p-6 ${className}`}
    >
      <Icon aria-hidden="true" className="text-primary-hover" />
      <h2 className="mt-3 flex items-center gap-2 text-xl font-semibold text-heading">
        <span className="group-hover:underline">{title}</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </h2>
      <p className={`mt-2 ${detailClassName}`} dir="ltr">
        {detail}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
    </a>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).contact;
  return pageMetadata(locale, "/contact", t.title, t.intro);
}

export default async function Contact({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getEditableCopy("pages", locale, pageMessages[locale]).contact;
  const s = getSettings();
  const responseTime = t.responseTime.replace(
    "{hours}",
    new Intl.NumberFormat(locale).format(Number(s.responseTimeHours)),
  );

  return (
    <main id="main-content" className="flex-1">
      <PageIntro
        title={t.title}
        intro={t.intro}
        className="!pb-4"
      />
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {s.whatsappNumber && (
              <ContactMethod
                href={`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(t.whatsappText)}`}
                icon={MessageCircle}
                title={t.whatsapp}
                hint={t.whatsappOpens}
                className="transition-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heading"
                detail={s.whatsappDisplay || s.whatsappNumber}
              />
            )}
            {s.email && (
              <ContactMethod
                href={`mailto:${s.email}`}
                icon={Mail}
                title={t.email}
                hint={t.emailOpens}
                className="transition-shadow hover:opacity-95 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heading"
                detail={s.email}
                detailClassName="break-all"
              />
            )}
          </div>
          {!s.email && !s.whatsappNumber && <p>{t.unavailable}</p>}
          <div className="mt-8 space-y-3">
            <p>{responseTime}</p>
            {(s.openingHours || s.closingHours) && (
              <div className="rounded-2xl bg-background p-5">
                <h2 className="text-lg font-semibold text-heading">
                  {t.hoursTitle}
                </h2>
                <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                  {s.openingHours && (
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        {t.openingHours}
                      </dt>
                      <dd>{s.openingHours}</dd>
                    </div>
                  )}
                  {s.closingHours && (
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        {t.closingHours}
                      </dt>
                      <dd>{s.closingHours}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold text-heading">
              {t.mapTitle}
            </h2>
            <p className="mb-4 max-w-2xl">{t.arrange}</p>
            <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border bg-background sm:min-h-96">
              <iframe
                src={s.mapEmbedUrl}
                title={t.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
