import type { Locale } from "@/i18n/routing";
import type { Messages } from "@/messages";
import { routePaths } from "@/lib/routes";

export const navigation: { label: keyof Pick<Messages, "homeNav" | "about" | "animals" | "adoptNav" | "volunteer" | "contact">; href: string }[] = [
  { label: "homeNav", href: routePaths.home },
  { label: "animals", href: routePaths.companions },
  { label: "about", href: routePaths.about },
  { label: "adoptNav", href: routePaths.adopt },
  { label: "volunteer", href: routePaths.volunteer },
  { label: "contact", href: routePaths.contact },
];

export const languages: { locale: Locale; name: string }[] = [
  { locale: "en", name: "English" },
  { locale: "fr", name: "Français" },
  { locale: "de", name: "Deutsch" },
  { locale: "ar", name: "العربية" },
];
