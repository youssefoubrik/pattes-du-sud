import { getPageContent } from "@/lib/database/page-content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function AdoptIntroduction({ locale }: { locale: Locale }) {
  const text = getPageContent("pages", locale, pageMessages[locale]).adopt;
  return (
    <Section aria-labelledby="adopt-title">
      <Container>
        <div className="max-w-3xl">
          <h1 id="adopt-title" className="max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            {text.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">{text.intro}</p>
        </div>
      </Container>
    </Section>
  );
}
