import type { Locale } from "@/i18n/routing";
import type { ContactAvailabilitySettings, ContactText } from "@/components/contact/contact-types";

function ContactHours({
  text,
  opening,
  closing,
}: {
  text: ContactText;
  opening: string;
  closing: string;
}) {
  if (opening && closing) {
    return (
      <>
        {" "}{text.hoursStart} <strong className="font-bold text-heading">{opening}</strong>
        {" "}{text.hoursBetween} <strong className="font-bold text-heading">{closing}</strong>
        .
      </>
    );
  }

  if (opening) {
    return (
      <>
        {" "}{text.openingTime} <strong className="font-bold text-heading">{opening}</strong>
        .
      </>
    );
  }

  if (closing) {
    return (
      <>
        {" "}{text.closingTime} <strong className="font-bold text-heading">{closing}</strong>
        .
      </>
    );
  }

  return null;
}

export function ContactAvailability({
  locale,
  text,
  settings,
}: {
  locale: Locale;
  text: ContactText;
  settings: ContactAvailabilitySettings;
}) {
  const responseHours = new Intl.NumberFormat(locale).format(Number(settings.responseTimeHours));

  return (
    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
      {text.responseTime} <strong className="font-bold text-heading">{responseHours}</strong> {text.responseTimeUnit}
      <ContactHours text={text} opening={settings.openingHours} closing={settings.closingHours} />
    </p>
  );
}
