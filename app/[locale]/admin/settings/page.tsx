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
  responseTimeHours: "Typical response time (hours)",
  openingHours: "Opening hours (optional)",
  closingHours: "Closing hours (optional)",
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
  const errorField =
    typeof query.field === "string" && query.field in labels
      ? labels[query.field as keyof Settings]
      : "URL field";
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
        {query.error === "url" && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            {`Enter a valid HTTPS URL for ${errorField}.`}
          </p>
        )}
        {query.error === "paypal" && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            {`The ${errorField} must be a PayPal checkout URL beginning with https://www.paypal.com/.`}
          </p>
        )}
        {query.error === "number" && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            Confirmed animals helped and adoptions must be whole numbers.
          </p>
        )}
        {query.error === "response-time" && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            Typical response time must be between 1 and 720 hours.
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
                    : key === "responseTimeHours"
                      ? "number"
                      : key === "instagram" ||
                          key === "facebook" ||
                          key === "mapEmbedUrl" ||
                          key === "paypalDonateUrl" ||
                          key === "paypalMonthlyUrl"
                        ? "url"
                        : "text"
                }
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-surface px-4 font-normal"
                min={key === "responseTimeHours" ? 1 : undefined}
                max={key === "responseTimeHours" ? 720 : undefined}
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
