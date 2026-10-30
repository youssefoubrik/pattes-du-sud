import Link from "next/link";
import { localizedRoute, routePaths } from "@/lib/routes";
import {
  Activity,
  Globe2,
  Handshake,
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
import { QrCodeGenerator } from "@/components/admin/qr-code-generator";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getAnimals } from "@/lib/database/animal-records";
import { getSettings } from "@/lib/database/site-settings";
import { getSiteAnalytics } from "@/lib/database/site-analytics";
import { logout } from "./actions";

export const metadata = {
  title: "Editor",
  robots: { index: false, follow: false },
};

export const instant = false;

const cardClass =
  "group rounded-3xl border border-border bg-secondary p-6 transition-[opacity,box-shadow] duration-200 hover:opacity-90 hover:shadow-sm hover:shadow-heading/10 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

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
  const { pageViews, topAnimals, countries, qrSources } = getSiteAnalytics();
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Link href={localizedRoute(locale, routePaths.adminCompanions)} className={cardClass}>
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
          <Link href={localizedRoute(locale, routePaths.adminSettings)} className={cardClass}>
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
          <Link href={localizedRoute(locale, routePaths.adminContent)} className={cardClass}>
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
          <Link href={localizedRoute(locale, routePaths.adminMedia)} className={cardClass}>
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
          <Link href={localizedRoute(locale, routePaths.adminSupporters)} className={cardClass}>
            <h2 className="flex items-center gap-3 text-2xl text-heading group-hover:underline group-hover:underline-offset-4">
              <Handshake size={22} className="shrink-0 text-primary-hover" aria-hidden="true" />
              Supporters
            </h2>
            <p className="mt-2">Manage supporter names, logos and links</p>
          </Link>
        </div>
        <h2 className="mt-12 text-2xl text-heading">Activity</h2>
        <div className="mt-4 grid gap-5 rounded-2xl border border-border bg-surface p-5">
          <section
            aria-label="Page views"
            className="min-w-0"
          >
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <Activity
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Page views
            </h3>
            <p className="mt-3 font-semibold text-heading">{pageViews}</p>
          </section>
          <section className="min-w-0 border-t border-border pt-5">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <PawPrint
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Most viewed companions
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {topCompanions.map((companion) => (
                <li key={companion.id} className="inline-flex items-baseline gap-2">
                  <Link
                    href={localizedRoute(locale, routePaths.companion(companion.id))}
                    className="text-accent underline underline-offset-4 transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {companion.name} ({companion.species})
                  </Link>
                  <span className="font-semibold text-heading">{companion.count}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="min-w-0 border-t border-border pt-5">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <Globe2
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              Page views by country
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
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
          <section className="min-w-0 border-t border-border pt-5">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-heading">
              <MapPin
                size={22}
                className="shrink-0 text-primary-hover"
                aria-hidden="true"
              />
              QR locations
            </h3>
            <QrCodeGenerator locale={locale} />
            <div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {qrSources.map((row) => (
                  <li
                    key={row.location}
                    className="inline-flex items-baseline gap-2"
                  >
                    <span>{row.location}</span>
                    <span className="font-semibold text-heading">
                      {row.count}
                    </span>
                  </li>
                ))}
              </ul>
              {qrSources.length === 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  No QR scans recorded yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
