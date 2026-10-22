import type { Locale } from "@/i18n/routing";
import type { FooterMessages } from "./types";
import { data as en } from "./en/footer";
import { data as fr } from "./fr/footer";
import { data as de } from "./de/footer";
import { data as ar } from "./ar/footer";

export type { FooterMessages } from "./types";
export const footerMessages: Record<Locale, FooterMessages> = { en, fr, de, ar };
