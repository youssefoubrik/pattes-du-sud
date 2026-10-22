import type { Locale } from "@/i18n/routing";
import type { GalleryMessages } from "./types";
import { data as en } from "./en/animal-gallery";
import { data as fr } from "./fr/animal-gallery";
import { data as de } from "./de/animal-gallery";
import { data as ar } from "./ar/animal-gallery";

export type { GalleryMessages } from "./types";
export const animalGalleryMessages: Record<Locale, GalleryMessages> = { en, fr, de, ar };
