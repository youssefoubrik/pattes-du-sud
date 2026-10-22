import { ButtonLink } from "@/components/ui/button-link";
import { PageIntro } from "@/components/ui/page-intro";
import { localizedRoute, routePaths } from "@/lib/routes";
import { getEditableCopy } from "@/lib/editable-copy";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function VolunteerIntroduction({ locale }: { locale: Locale }) {
  const text = getEditableCopy("pages", locale, pageMessages[locale]).volunteer;

  return (
    <PageIntro title={text.title} intro={text.intro} className="pb-4! sm:pb-6!">
      <ButtonLink
        href={localizedRoute(locale, routePaths.contact)}
        variant="secondary"
        arrow
        className="mt-6"
      >
        {text.arrangeVisit}
      </ButtonLink>
    </PageIntro>
  );
}
