import type { Locale } from "@/i18n/routing";

export type AnimalSpecies = "dog" | "cat";
export type AnimalStatus = "available" | "inCare" | "adopted";
export type PublicAnimalStatus = Extract<AnimalStatus, "available" | "adopted">;
export type AnimalSpeciesFilter = AnimalSpecies | "all";
export type AnimalStatusFilter = PublicAnimalStatus | "all";
export type AnimalPersonality =
  | "gentle"
  | "playful"
  | "curious"
  | "shy"
  | "affectionate"
  | "calm"
  | "energetic"
  | "independent";
export type AnimalSex = "female" | "male";
export type AnimalHealthValue = "yes" | "no";

export type LocalizedAnimalText = Record<Locale, string>;

export type AnimalPhoto = {
  src: string;
  alt?: string;
  objectPosition?: string;
};

export type Animal = {
  name: string;
  species: AnimalSpecies;
  status: AnimalStatus;
  ageYears?: number;
  sex?: AnimalSex;
  vaccinated?: AnimalHealthValue;
  sterilized?: AnimalHealthValue;
  personality?: AnimalPersonality;
  story?: LocalizedAnimalText;
  photos: AnimalPhoto[];
  addedAt: string;
  featuredOrder?: number;
};
