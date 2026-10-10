import { MapPin } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";

export function LocationLabel({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <p className={`flex items-center gap-2 text-heading ${className}`}>
      <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
      {messages[locale].location}
    </p>
  );
}
