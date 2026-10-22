import { PageIntro } from "@/components/ui/page-intro";
import type { ContactText } from "@/components/contact/contact-types";

export function ContactIntroduction({ text }: { text: ContactText }) {
  return <PageIntro title={text.title} intro={text.intro} className="!pb-4" />;
}
