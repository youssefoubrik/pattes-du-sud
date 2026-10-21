import Link from "next/link";
import { LogOut } from "lucide-react";
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
      "SELECT path, COUNT(*) AS count FROM events WHERE kind = 'view' AND path LIKE '%/companions/%' GROUP BY path ORDER BY count DESC LIMIT 5",
    )
    .all() as { path: string; count: number }[];
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Link
            href={`/${locale}/admin/animals`}
            className="rounded-3xl border border-border bg-surface p-6 hover:border-primary"
          >
            <h2 className="text-2xl text-heading">Companions</h2>
            <p className="mt-2">
              {animals.length} profiles · Add, update and remove profiles
            </p>
          </Link>
          <Link
            href={`/${locale}/admin/settings`}
            className="rounded-3xl border border-border bg-surface p-6 hover:border-primary"
          >
            <h2 className="text-2xl text-heading">Settings</h2>
            <p className="mt-2">
              {settings.paypalDonateUrl
                ? "PayPal link configured"
                : "Payment details needed"}{" "}
              · Contact and bank details
            </p>
          </Link>
          <Link
            href={`/${locale}/admin/content`}
            className="rounded-3xl border border-border bg-surface p-6 hover:border-primary"
          >
            <h2 className="text-2xl text-heading">Page text</h2>
            <p className="mt-2">
              Edit Home, About and other public pages in four languages
            </p>
          </Link>
          <Link
            href={`/${locale}/admin/media`}
            className="rounded-3xl border border-border bg-surface p-6 hover:border-primary"
          >
            <h2 className="text-2xl text-heading">Page photos</h2>
            <p className="mt-2">Update Home and About photography</p>
          </Link>
        </div>
        <h2 className="mt-12 text-2xl text-heading">Activity</h2>
        <ul className="mt-3 flex flex-wrap gap-5">
          {events.map((event) => (
            <li key={event.kind} className="rounded-xl bg-secondary p-4">
              {event.kind}: {event.count}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-xl text-heading">Most viewed companions</h3>
            <ul className="mt-3 space-y-2">
              {topAnimals.map((row) => (
                <li key={row.path}>
                  {row.path.split("/").pop()}: {row.count}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-heading">Visitor countries</h3>
            <ul className="mt-3 space-y-2">
              {countries.map((row) => (
                <li key={row.country}>
                  {row.country}: {row.count}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl text-heading">QR locations</h3>
          <p className="mt-1 text-sm">
            Use /mirleft?source=location-name for each printed QR code.
          </p>
          <ul className="mt-3 flex flex-wrap gap-5">
            {sources.map((row) => (
              <li key={row.source} className="rounded-xl bg-secondary p-4">
                {row.source}: {row.count}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
