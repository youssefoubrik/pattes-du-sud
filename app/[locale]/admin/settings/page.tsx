import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ChartColumn,
  Heart,
  Landmark,
  MapPin,
  Phone,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ActionButton } from "@/components/ui/action-button";
import { ActionNotice } from "@/components/admin/action-notice";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { getSettings, type Settings } from "@/lib/db";
import { updateSettings } from "../actions";

export const metadata = {
  title: "Editor settings",
  robots: { index: false, follow: false },
};

export const instant = false;
const labels: Record<keyof Settings, string> = {
  email: "Public email",
  whatsappNumber: "WhatsApp number",
  whatsappDisplay: "WhatsApp number",
  responseTimeHours: "Typical response time (hours)",
  openingHours: "Opening hours",
  closingHours: "Closing hours",
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
  impactAnimalsHelped: "Companions helped",
  impactAdoptions: "Confirmed adoptions",
};
const fieldHints: Record<keyof Settings, string> = {
  email: "Public contact address, for example contact@example.org.",
  whatsappNumber: "Enter the full number, including the country code, e.g. +212 612 345 678.",
  whatsappDisplay: "Include the country code, e.g. +212 612 345 678.",
  responseTimeHours: "Whole number from 1 to 720.",
  openingHours: "Use local time, e.g. 09:00.",
  closingHours: "Use local time, e.g. 18:00.",
  instagram: "Full HTTPS link to the association’s Instagram profile.",
  facebook: "Full HTTPS link to the association’s Facebook page.",
  registrationReference: "Copy the reference as shown on official documents.",
  paypalDonateUrl: "PayPal checkout link beginning with https://www.paypal.com/.",
  paypalMonthlyUrl: "PayPal monthly checkout link beginning with https://www.paypal.com/.",
  iban: "Enter the IBAN exactly as provided by the bank.",
  rib: "Enter the RIB exactly as provided by the bank.",
  swift: "Enter the SWIFT/BIC exactly as provided by the bank.",
  bankName: "Name of the bank holding the association’s account.",
  mapEmbedUrl: "Paste the Google Maps embed URL, not a regular map share link.",
  impactAnimalsHelped: "Enter a whole number.",
  impactAdoptions: "Enter a whole number.",
};
const fieldGroups: {
  title: string;
  icon: LucideIcon;
  fields: (keyof Settings)[];
}[] = [
  {
    title: "Contact and availability",
    icon: Phone,
    fields: [
      "email",
      "whatsappNumber",
      "responseTimeHours",
      "openingHours",
      "closingHours",
    ],
  },
  { title: "Social links", icon: Share2, fields: ["instagram", "facebook"] },
  {
    title: "Association details",
    icon: Building2,
    fields: ["registrationReference"],
  },
  {
    title: "Donation links",
    icon: Heart,
    fields: ["paypalDonateUrl", "paypalMonthlyUrl"],
  },
  {
    title: "Bank transfer details",
    icon: Landmark,
    fields: ["bankName", "iban", "rib", "swift"],
  },
  { title: "Location", icon: MapPin, fields: ["mapEmbedUrl"] },
  {
    title: "Impact figures",
    icon: ChartColumn,
    fields: ["impactAnimalsHelped", "impactAdoptions"],
  },
];

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
        <Link
          href={`/${locale}/admin`}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-heading transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-heading"
        >
          <ArrowLeft
            size={18}
            className="text-primary rtl:rotate-180"
            aria-hidden="true"
          />
          Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Settings</h1>
        {query.saved && (
          <ActionNotice
            key={String(query.notice ?? "saved")}
            message="Settings saved."
            queryParam="saved"
          />
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
            Enter whole numbers for companions helped and adoptions.
          </p>
        )}
        {query.error === "response-time" && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            Typical response time must be between 1 and 720 hours.
          </p>
        )}
        {query.error === "required" && (
          <p role="alert" className="mt-4 rounded-xl bg-secondary p-4">
            {`Enter a value for ${errorField}.`}
          </p>
        )}
        <form
          action={updateSettings}
          className="mt-8 grid gap-6"
        >
          <input type="hidden" name="locale" value={locale} />
          {fieldGroups.map((group) => (
            <fieldset
              key={group.title}
              className="min-w-0 rounded-2xl border border-border bg-surface p-5"
            >
              <legend className="inline-flex items-center gap-2 px-1 text-xl font-semibold text-heading">
                <group.icon size={19} aria-hidden="true" />
                {group.title}
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                {group.fields.map((key) => {
                  return (
                    <label
                      key={key}
                      className={`block font-semibold ${key === "mapEmbedUrl" ? "sm:col-span-2" : ""}`}
                    >
                      {labels[key]}
                      {" "}
                      <span aria-hidden="true" className="text-required">
                        *
                      </span>
                      <span className="sr-only"> required</span>
                      {key === "whatsappNumber" ? (
                        <input
                          name={key}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          defaultValue={settings.whatsappDisplay || settings.whatsappNumber}
                          placeholder="+212 612 345 678"
                          className="mt-2 min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-normal focus-visible:outline-none focus-visible:border-heading"
                        />
                      ) : (
                        <input
                          name={key}
                          required
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
                          className="mt-2 min-h-11 w-full rounded-xl border border-border bg-surface px-3 font-normal focus-visible:outline-none focus-visible:border-heading"
                          min={key === "responseTimeHours" ? 1 : undefined}
                          max={key === "responseTimeHours" ? 720 : undefined}
                        />
                      )}
                      <span className="mt-1 block text-sm font-normal text-muted-foreground">
                        {fieldHints[key]}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
          <ActionButton type="submit" className="justify-self-start">
            Save settings
          </ActionButton>
        </form>
      </Container>
    </main>
  );
}
