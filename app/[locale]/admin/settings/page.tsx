import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getSettings, type Settings } from "@/lib/db";
import { updateSettings } from "../actions";

export const metadata = {
  title: "Editor settings",
  robots: { index: false, follow: false },
};
const labels: Record<keyof Settings, string> = {
  email: "Public email",
  whatsappNumber: "WhatsApp number (digits only)",
  whatsappDisplay: "WhatsApp display number",
  instagram: "Instagram URL",
  facebook: "Facebook URL",
  registrationReference: "Registration reference",
  paypalDonateUrl: "PayPal donation link",
  paypalMonthlyUrl: "PayPal monthly donation link",
  iban: "IBAN",
  rib: "RIB",
  swift: "SWIFT / BIC",
  bankName: "Bank name",
  mapEmbedUrl: "Google Maps embed URL",
  impactAnimalsHelped: "Confirmed animals helped",
  impactAdoptions: "Confirmed adoptions",
};

export default async function SettingsPage({
  params,
  searchParams,
}: PageProps<"/[locale]/admin/settings">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const settings = getSettings();
  const query = await searchParams;
  return (
    <main className="flex-1 py-12">
      <Container className="max-w-3xl">
        <Link href={`/${locale}/admin`} className="text-accent underline">
          ← Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Settings</h1>
        {query.saved && (
          <p role="status" className="mt-4 rounded-xl bg-secondary p-4">
            Changes saved.
          </p>
        )}
        {query.error && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            Please check the URL or PayPal email.
          </p>
        )}
        <form
          action={updateSettings}
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          <input type="hidden" name="locale" value={locale} />
          {(Object.keys(labels) as (keyof Settings)[]).map((key) => (
            <label
              key={key}
              className={`block font-semibold ${key === "mapEmbedUrl" ? "sm:col-span-2" : ""}`}
            >
              {labels[key]}
              <input
                name={key}
                defaultValue={settings[key]}
                type={
                  key === "email"
                    ? "email"
                    : key === "instagram" ||
                        key === "facebook" ||
                        key === "mapEmbedUrl" ||
                        key === "paypalDonateUrl" ||
                        key === "paypalMonthlyUrl"
                      ? "url"
                      : "text"
                }
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-surface px-4 font-normal"
              />
            </label>
          ))}
          <button
            type="submit"
            className="min-h-12 rounded-full bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover sm:col-span-2 sm:justify-self-start"
          >
            Save settings
          </button>
        </form>
      </Container>
    </main>
  );
}
