import type { Locale } from "@/i18n/routing";
import { en, type Messages } from "./en";
import { fr } from "./fr";
import { de } from "./de";
import { ar } from "./ar";

export const messages: Record<Locale, Messages> = { en, fr, de, ar };
