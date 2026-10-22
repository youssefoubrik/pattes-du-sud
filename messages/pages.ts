import type { Locale } from "@/i18n/routing";
import type { PageMessages } from "./types";
import { data as en } from "./en/pages";
import { data as fr } from "./fr/pages";
import { data as de } from "./de/pages";
import { data as ar } from "./ar/pages";

export type { PageMessages } from "./types";
export const pageMessages: Record<Locale, PageMessages> = { en, fr, de, ar };
