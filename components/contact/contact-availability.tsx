import type { Locale } from "@/i18n/routing";
import { CalendarDays, Clock3 } from "lucide-react";
import type {
  ContactAvailabilitySettings,
  ContactText,
} from "@/components/contact/contact-types";

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
        {text.hoursStart} <strong className="font-semibold text-heading">{opening}</strong>
        {" "}{text.hoursBetween} <strong className="font-semibold text-heading">{closing}</strong>
      </>
    );
  }

  if (opening) {
    return (
      <>
        {text.openingTime} <strong className="font-semibold text-heading">{opening}</strong>
      </>
    );
  }

  if (closing) {
    return (
      <>
        {text.closingTime} <strong className="font-semibold text-heading">{closing}</strong>
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

  const hasHours = Boolean(settings.openingHours || settings.closingHours);

  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm leading-relaxed text-muted-foreground">
      <p className="inline-flex items-center gap-2">
        <Clock3 size={16} className="shrink-0 text-primary" aria-hidden="true" />
        <span>
          {text.responseTime}{" "}
          <strong className="font-semibold text-heading">{responseHours}</strong>{" "}
          {text.responseTimeUnit}
        </span>
      </p>
      {hasHours && (
        <p className="inline-flex items-center gap-2">
          <CalendarDays size={16} className="shrink-0 text-primary" aria-hidden="true" />
          <span>
            <ContactHours
              text={text}
              opening={settings.openingHours}
              closing={settings.closingHours}
            />
          </span>
        </p>
      )}
    </div>
  );
}
