import { getPageContent } from "@/lib/database/page-content";
import { PageIntro } from "@/components/ui/page-intro";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function AdoptIntroduction({ locale }: { locale: Locale }) {
  const text = getPageContent("pages", locale, pageMessages[locale]).adopt;
  return <PageIntro title={text.title} intro={text.intro} />;
}
