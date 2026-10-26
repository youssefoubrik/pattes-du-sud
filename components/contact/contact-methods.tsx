import {
  ArrowRight,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import type {
  ContactChannelsSettings,
  ContactText,
} from "@/components/contact/contact-types";

function ContactMethod({
  href,
  icon: Icon,
  title,
  detail,
  hint,
  primary = false,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  hint: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className="group flex min-h-48 flex-col rounded-2xl border border-border bg-surface p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-6"
    >
      <span
        className={`flex size-11 items-center justify-center rounded-xl ${
          primary ? "bg-primary/10 text-primary" : "bg-secondary text-heading"
        }`}
      >
        <Icon size={21} aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-xl font-semibold text-heading">{title}</h2>
      <p className="mt-2 break-all text-foreground" dir="ltr">
        {detail}
      </p>
      <span
        className={`mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold ${
          primary ? "text-primary" : "text-heading"
        }`}
      >
        <span className="group-hover:underline group-focus-visible:underline">
          {hint}
        </span>
        <ArrowRight
          size={17}
          aria-hidden="true"
          className="rtl:rotate-180"
        />
      </span>
    </a>
  );
}

export function ContactMethods({
  text,
  settings,
}: {
  text: ContactText;
  settings: ContactChannelsSettings;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {settings.whatsappNumber && (
        <ContactMethod
          href={whatsappUrl(settings.whatsappNumber, text.whatsappText)}
          icon={MessageCircle}
          title={text.whatsapp}
          hint={text.whatsappOpens}
          detail={settings.whatsappDisplay || settings.whatsappNumber}
          primary
        />
      )}
      {settings.email && (
        <ContactMethod
          href={`mailto:${settings.email}`}
          icon={Mail}
          title={text.email}
          hint={text.emailOpens}
          detail={settings.email}
        />
      )}
    </div>
  );
}
