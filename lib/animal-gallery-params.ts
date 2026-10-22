import type { AnimalSpeciesFilter, AnimalStatusFilter } from "@/domain/animal";
import { ANIMAL_NAME_MAX_LENGTH } from "@/lib/animal-limits";

export type GallerySearchParams = Record<string, string | string[] | undefined>;

export function normalizeGallerySearch(value: string | undefined) {
  return value?.trim().slice(0, ANIMAL_NAME_MAX_LENGTH) ?? "";
}

export function parseGallerySpecies(value: string | string[] | undefined): AnimalSpeciesFilter {
  return value === "dog" || value === "cat" ? value : "all";
}

export function parseGalleryStatus(value: string | string[] | undefined): AnimalStatusFilter {
  return value === "available" || value === "adopted" ? value : "all";
}

export function parseGalleryPage(value: string | string[] | undefined) {
  const page = typeof value === "string" ? Number(value) : 1;
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
