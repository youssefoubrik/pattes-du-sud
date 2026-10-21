import Link from "next/link";
import {
  Activity,
  Globe2,
  Images,
  Languages,
  LogOut,
  MapPin,
  PawPrint,
  Settings,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ActionButton } from "@/components/ui/action-button";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getAnimals, getSettings, db } from "@/lib/db";
import { logout } from "./actions";

export const metadata = {
  title: "Editor",
  robots: { index: false, follow: false },
};

const cardClass =
  "group rounded-3xl bg-secondary p-6 transition-colors hover:bg-secondary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const eventLabels: Record<string, string> = {
  view: "Page views",
  donate: "Donate clicks",
  whatsapp: "WhatsApp clicks",
};

function countryFlag(code: string) {
  return String.fromCodePoint(
    ...Array.from(code.toUpperCase(), (letter) =>
      letter.charCodeAt(0) + 127397,
    ),
  );
}

export default async function Admin({ params }: PageProps<"/[locale]/admin">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const animals = getAnimals();
  const settings = getSettings();
  const events = db()
    .prepare("SELECT kind, COUNT(*) AS count FROM events GROUP BY kind")
    .all() as { kind: string; count: number }[];
  const topAnimals = db()
    .prepare(
      "SELECT CAST(SUBSTR(path, INSTR(path, '/companions/') + LENGTH('/companions/')) AS INTEGER) AS animalId, COUNT(*) AS count FROM events WHERE kind = 'view' AND path LIKE '%/companions/%' GROUP BY animalId ORDER BY count DESC LIMIT 5",
    )
    .all() as { animalId: number; count: number }[];
  const countries = db()
    .prepare(
      "SELECT country, COUNT(*) AS count FROM events WHERE country IS NOT NULL GROUP BY country ORDER BY count DESC LIMIT 5",
    )
    .all() as { country: string; count: number }[];
  const sources = db()
    .prepare(
      "SELECT source, COUNT(*) AS count FROM events WHERE source IS NOT NULL GROUP BY source ORDER BY count DESC LIMIT 10",
    )
    .all() as { source: string; count: number }[];
  const animalsById = new Map(animals.map((animal) => [animal.id, animal]));
  const topCompanions = topAnimals.flatMap(({ animalId, count }) => {
    const companion = animalsById.get(animalId);
    return companion ? [{ ...companion, count }] : [];
  });
  const countryNames = new Intl.DisplayNames([locale], { type: "region" });
  return (
    <main className="flex-1 py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl text-heading">Website editor</h1>
          <form action={logout}>
            <input type="hidden" name="locale" value={locale} />
            <ActionButton type="submit" variant="secondary" size="small">
              <LogOut size={17} aria-hidden="true" />
              Sign out
            </ActionButton>
          </form>
        </div>
        <p className="mt-4 max-w-2xl">Manage companion profiles and site details.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/${locale}/admin/animals`} className={cardClass}>
            <h2 className="flex items-center gap-3 text-2xl text-heading group-hover:underline group-hover:underline-offset-4">
              <PawPrint
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Companions
            </h2>
            <p className="mt-2">
              {animals.length} profiles · Add, update and remove profiles
            </p>
          </Link>
          <Link href={`/${locale}/admin/settings`} className={cardClass}>
            <h2 className="flex items-center gap-3 text-2xl text-heading group-hover:underline group-hover:underline-offset-4">
              <Settings
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Settings
            </h2>
            <p className="mt-2">
              {settings.paypalDonateUrl
                ? "PayPal link configured"
                : "Payment details needed"}{" "}
              · Contact and bank details
            </p>
          </Link>
          <Link href={`/${locale}/admin/content`} className={cardClass}>
            <h2 className="flex items-center gap-3 text-2xl text-heading group-hover:underline group-hover:underline-offset-4">
              <Languages
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Page text
            </h2>
            <p className="mt-2">
              Edit Home, About and other public pages in four languages
            </p>
          </Link>
          <Link href={`/${locale}/admin/media`} className={cardClass}>
            <h2 className="flex items-center gap-3 text-2xl text-heading group-hover:underline group-hover:underline-offset-4">
              <Images
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Page photos
            </h2>
            <p className="mt-2">Update Home and About photography</p>
          </Link>
        </div>
        <h2 className="mt-12 text-2xl text-heading">Activity</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          <section
            aria-label="Activity totals"
            className="grid gap-3 py-5 sm:grid-cols-[minmax(12rem,0.3fr)_1fr] sm:gap-8"
          >
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <Activity
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Totals
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {events.map((event) => (
                <li key={event.kind} className="inline-flex items-baseline gap-2">
                  <span>{eventLabels[event.kind] ?? event.kind}</span>
                  <span className="font-semibold text-heading">{event.count}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="grid gap-3 py-5 sm:grid-cols-[minmax(12rem,0.3fr)_1fr] sm:gap-8">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <PawPrint
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Most viewed companions
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {topCompanions.map((companion) => (
                <li key={companion.id} className="inline-flex items-baseline gap-2">
                  <Link
                    href={`/${locale}/companions/${companion.id}`}
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {companion.name} ({companion.species})
                  </Link>
                  <span className="font-semibold text-heading">{companion.count}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="grid gap-3 py-5 sm:grid-cols-[minmax(12rem,0.3fr)_1fr] sm:gap-8">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <Globe2
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Visitor countries
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {countries.map((row) => (
                <li key={row.country} className="inline-flex items-baseline gap-2">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true">
                      {countryFlag(row.country)}
                    </span>
                    <span>{countryNames.of(row.country) ?? row.country}</span>
                  </span>
                  <span className="font-semibold text-heading">{row.count}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="grid gap-3 py-5 sm:grid-cols-[minmax(12rem,0.3fr)_1fr] sm:gap-8">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <MapPin
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              QR locations
            </h3>
            <div>
              <p className="mb-3 text-sm">
                Use /mirleft?source=location-name for each printed QR code.
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {sources.map((row) => (
                  <li
                    key={row.source}
                    className="inline-flex items-baseline gap-2"
                  >
                    <span>{row.source}</span>
                    <span className="font-semibold text-heading">
                      {row.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
