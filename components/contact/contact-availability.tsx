import type { Locale } from "@/i18n/routing";
import type { ContactAvailabilitySettings, ContactText } from "@/components/contact/contact-types";

export function ContactAvailability({
  locale,
  text,
  settings,
}: {
  locale: Locale;
  text: ContactText;
  settings: ContactAvailabilitySettings;
}) {
  const responseTime = text.responseTime.replace(
    "{hours}",
    new Intl.NumberFormat(locale).format(Number(settings.responseTimeHours)),
  );

  return (
    <div className="mt-8 space-y-3">
      <p>{responseTime}</p>
      {(settings.openingHours || settings.closingHours) && (
        <div className="rounded-2xl bg-background p-5">
          <h2 className="text-lg font-semibold text-heading">{text.hoursTitle}</h2>
          <dl className="mt-2 grid gap-2 sm:grid-cols-2">
            {settings.openingHours && (
              <div>
                <dt className="text-sm text-muted-foreground">{text.openingHours}</dt>
                <dd>{settings.openingHours}</dd>
              </div>
            )}
            {settings.closingHours && (
              <div>
                <dt className="text-sm text-muted-foreground">{text.closingHours}</dt>
                <dd>{settings.closingHours}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
