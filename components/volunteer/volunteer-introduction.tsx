import { PageIntro } from "@/components/ui/page-intro";
import { getPageContent } from "@/lib/database/page-content";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function VolunteerIntroduction({ locale }: { locale: Locale }) {
  const text = getPageContent("pages", locale, pageMessages[locale]).volunteer;

  return (
    <PageIntro title={text.title} intro={text.intro} className="pb-4! sm:pb-6!" />
  );
}
