import type { Locale } from "@/i18n/routing";
import type { AboutMessages } from "./types";
import { data as en } from "./en/about";
import { data as fr } from "./fr/about";
import { data as de } from "./de/about";
import { data as ar } from "./ar/about";

export type { AboutMessages } from "./types";
export const aboutMessages: Record<Locale, AboutMessages> = { en, fr, de, ar };
