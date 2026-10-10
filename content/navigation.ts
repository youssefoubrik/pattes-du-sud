import type { Locale } from "@/i18n/routing";
import type { Messages } from "@/messages/en";

export const navigation: { label: keyof Pick<Messages, "about" | "animals" | "volunteer" | "contact">; href: string }[] = [
  { label: "about", href: "/about" },
  { label: "animals", href: "/animals" },
  { label: "volunteer", href: "/volunteer" },
  { label: "contact", href: "/contact" },
];

export const languages: { locale: Locale; name: string }[] = [
  { locale: "en", name: "English" },
  { locale: "fr", name: "Français" },
  { locale: "de", name: "Deutsch" },
  { locale: "ar", name: "العربية" },
];
