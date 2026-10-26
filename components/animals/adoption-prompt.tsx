import type { Locale } from "@/i18n/routing";
import { localizedRoute, routePaths } from "@/lib/routes";
import { animalGalleryMessages } from "@/messages/animal-gallery";
import { ButtonLink } from "@/components/ui/button-link";

export function AdoptionPrompt({ locale }: { locale: Locale }) {
  const text = animalGalleryMessages[locale];

  return (
    <ButtonLink
      href={localizedRoute(locale, routePaths.adopt)}
      variant="secondary"
      arrow
      compact
      className="max-w-full gap-3 py-2 text-base! sm:mt-1"
    >
      {text.adoptionLink}
    </ButtonLink>
  );
}
