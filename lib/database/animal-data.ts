import { routing } from "@/i18n/routing";
import type { Animal, AnimalPhoto, LocalizedAnimalText } from "@/content/animals";

export type EditableAnimal = Animal & { id: number };

type StoredAnimal = Omit<EditableAnimal, "photos" | "id" | "vaccinated" | "sterilized" | "story"> & {
  story?: LocalizedAnimalText | string;
  personalityCustom?: unknown;
  image?: AnimalPhoto;
  photos?: AnimalPhoto[];
  vaccinated?: EditableAnimal["vaccinated"] | boolean;
  sterilized?: EditableAnimal["sterilized"] | boolean;
};

function parseHealthStatus(value: StoredAnimal["vaccinated"]): NonNullable<EditableAnimal["vaccinated"]> {
  if (value === "yes" || value === "no") return value;
  return value === true ? "yes" : "no";
}

function parseLocalizedAnimalText(value: StoredAnimal["story"]): LocalizedAnimalText | undefined {
  if (typeof value === "string") {
    return Object.fromEntries(routing.locales.map((locale) => [locale, value])) as LocalizedAnimalText;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const localized = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      typeof (value as Partial<LocalizedAnimalText>)[locale] === "string"
        ? (value as Partial<LocalizedAnimalText>)[locale]
        : "",
    ]),
  ) as LocalizedAnimalText;
  return Object.values(localized).some((text) => text.trim()) ? localized : undefined;
}

export function parseAnimalData(data: string): Omit<EditableAnimal, "id"> {
  const record = JSON.parse(data) as StoredAnimal;
  const { image, personalityCustom: _removedCustomText, ...animal } = record;
  void _removedCustomText;
  return {
    ...animal,
    photos: record.photos?.length ? record.photos : image ? [image] : [],
    story: parseLocalizedAnimalText(record.story),
    vaccinated: parseHealthStatus(record.vaccinated),
    sterilized: parseHealthStatus(record.sterilized),
  };
}
