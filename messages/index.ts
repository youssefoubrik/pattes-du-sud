import type { Locale } from "@/i18n/routing";
import type { Messages } from "./en/common";
import { data as en } from "./en/common";
import { data as fr } from "./fr/common";
import { data as de } from "./de/common";
import { data as ar } from "./ar/common";

export type { Messages } from "./en/common";
export const messages: Record<Locale, Messages> = { en, fr, de, ar };
