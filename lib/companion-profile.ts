import type { Animal } from "@/domain/animal";
import { animalMessages } from "@/messages/animals";
import { pageMessages } from "@/messages/pages";

export type CompanionFact = { label: string; value: string };

export function getCompanionProfileFacts(
  animal: Animal,
  common: (typeof animalMessages)["en"],
  text: (typeof pageMessages)["en"]["animal"],
): CompanionFact[] {
  return [
    {
      label: text.age,
      value:
        animal.ageYears !== undefined
          ? common.age.replace("{age}", String(animal.ageYears))
          : common.ageUnknown,
    },
    ...(animal.sex ? [{ label: text.sex, value: text[animal.sex] }] : []),
    {
      label: text.vaccinated,
      value: animal.vaccinated === "yes" ? text.vaccinatedYes : text.vaccinatedNo,
    },
    {
      label: text.sterilized,
      value: animal.sterilized === "yes" ? text.sterilizedYes : text.sterilizedNo,
    },
  ];
}
