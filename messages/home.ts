import type { Locale } from "@/i18n/routing";
import type { HomeMessages } from "./types";
import { data as en } from "./en/home";
import { data as fr } from "./fr/home";
import { data as de } from "./de/home";
import { data as ar } from "./ar/home";

export type { HomeMessages } from "./types";
export const homeMessages: Record<Locale, HomeMessages> = { en, fr, de, ar };
