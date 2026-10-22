import { ArrowUpRight, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import type { ContactChannelsSettings, ContactText } from "@/components/contact/contact-types";

function ContactMethod({
  href,
  icon: Icon,
  title,
  detail,
  hint,
  detailClassName = "",
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  hint: string;
  detailClassName?: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-3xl bg-secondary p-6 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heading"
    >
      <Icon aria-hidden="true" className="text-primary-hover" />
      <h2 className="mt-3 flex items-center gap-2 text-xl font-semibold text-heading">
        <span className="group-hover:underline">{title}</span>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"
        />
      </h2>
      <p className={`mt-2 ${detailClassName}`} dir="ltr">
        {detail}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
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
    <div className="grid gap-5 md:grid-cols-2">
      <ContactMethod
        href={whatsappUrl(settings.whatsappNumber, text.whatsappText)}
        icon={MessageCircle}
        title={text.whatsapp}
        hint={text.whatsappOpens}
        detail={settings.whatsappDisplay || settings.whatsappNumber}
      />
      {settings.email && (
        <ContactMethod
          href={`mailto:${settings.email}`}
          icon={Mail}
          title={text.email}
          hint={text.emailOpens}
          detail={settings.email}
          detailClassName="break-all"
        />
      )}
    </div>
  );
}
