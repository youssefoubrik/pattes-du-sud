import { getEditableCopy } from "@/lib/editable-copy";
import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { isLocale } from "@/i18n/routing";
import { getSettings } from "@/lib/db";
import { pageMetadata } from "@/lib/metadata";
import { pageMessages } from "@/messages/pages";
import { sendContact } from "./actions";

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
  searchParams,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const query = await searchParams;
  const t = getEditableCopy("pages", locale, pageMessages[locale]).contact;
  const s = getSettings();

  return (
    <main id="main-content" className="flex-1">
      <PageIntro title={t.title} intro={t.intro} />
      <Section className="bg-secondary">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {s.whatsappNumber && (
              <a
                href={`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(t.whatsappText)}`}
                className="rounded-3xl bg-background p-6 hover:underline"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="text-primary-hover"
                />
                <h2 className="mt-3 text-2xl text-heading">{t.whatsapp}</h2>
                <p className="mt-2" dir="ltr">
                  {s.whatsappDisplay || s.whatsappNumber}
                </p>
              </a>
            )}
            {s.email && (
              <a
                href={`mailto:${s.email}`}
                className="rounded-3xl bg-background p-6 hover:underline"
              >
                <Mail aria-hidden="true" className="text-primary-hover" />
                <h2 className="mt-3 text-2xl text-heading">{t.email}</h2>
                <p className="mt-2 break-all" dir="ltr">
                  {s.email}
                </p>
              </a>
            )}
          </div>
          {!s.email && !s.whatsappNumber && <p>{t.unavailable}</p>}
          <p className="mt-8">{t.arrange}</p>
        </Container>
      </Section>
      <Section>
        <Container className="max-w-2xl">
          <h2 className="text-3xl text-heading">{t.form}</h2>
          {query.sent && (
            <p role="status" className="mt-5 rounded-xl bg-secondary p-4">
              {t.sent}
            </p>
          )}
          {query.error && (
            <p role="alert" className="mt-5 rounded-xl bg-secondary p-4">
              {t.error}
            </p>
          )}
          <form action={sendContact} className="mt-7 grid gap-5">
            <input type="hidden" name="locale" value={locale} />
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="font-semibold">
              {t.name}
              <input
                name="name"
                required
                maxLength={120}
                className="mt-2 block min-h-12 w-full rounded-xl border border-border bg-surface px-4 font-normal"
              />
            </label>
            <label className="font-semibold">
              {t.emailField}
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                className="mt-2 block min-h-12 w-full rounded-xl border border-border bg-surface px-4 font-normal"
              />
            </label>
            <label className="font-semibold">
              {t.message}
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={3000}
                rows={6}
                className="mt-2 block w-full rounded-xl border border-border bg-surface p-4 font-normal"
              />
            </label>
            <button
              type="submit"
              className="min-h-12 justify-self-start rounded-full bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover"
            >
              {t.send}
            </button>
          </form>
        </Container>
      </Section>
    </main>
  );
}
