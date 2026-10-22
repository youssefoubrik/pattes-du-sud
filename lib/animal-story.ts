import type { LocalizedAnimalText } from "@/content/animals";
import type { Locale } from "@/i18n/routing";

export function animalStoryForLocale(
  story: LocalizedAnimalText | undefined,
  locale: Locale,
) {
  return (
    story?.[locale]?.trim() ||
    story?.en?.trim() ||
    ""
  );
}
