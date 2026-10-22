import { getEditableCopy } from "@/lib/editable-copy";
import { PageIntro } from "@/components/ui/page-intro";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function AdoptIntroduction({ locale }: { locale: Locale }) {
  const text = getEditableCopy("pages", locale, pageMessages[locale]).adopt;
  return <PageIntro title={text.title} intro={text.intro} />;
}
