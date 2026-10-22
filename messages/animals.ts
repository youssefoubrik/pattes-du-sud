import type { Locale } from "@/i18n/routing";
import type { AnimalMessages } from "./types";
import { data as en } from "./en/animals";
import { data as fr } from "./fr/animals";
import { data as de } from "./de/animals";
import { data as ar } from "./ar/animals";

export type { AnimalMessages } from "./types";
export const animalMessages: Record<Locale, AnimalMessages> = { en, fr, de, ar };
