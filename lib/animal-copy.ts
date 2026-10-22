import type { LocalizedAnimalText } from "@/content/animals";
import type { Locale } from "@/i18n/routing";

export function animalCopyForLocale(
  copy: LocalizedAnimalText | undefined,
  locale: Locale,
) {
  return (
    copy?.[locale]?.trim() ||
    copy?.en?.trim() ||
    ""
  );
}
