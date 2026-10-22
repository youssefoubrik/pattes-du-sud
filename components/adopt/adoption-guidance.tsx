import { getEditableCopy } from "@/lib/editable-copy";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function AdoptionGuidance({ locale }: { locale: Locale }) {
  const text = getEditableCopy("pages", locale, pageMessages[locale]).adopt;

  return (
    <Section aria-labelledby="adoption-guidance-title" className="relative">
      <SectionDivider direction="leave" />
      <Container className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 id="adoption-guidance-title" className="text-2xl text-heading">{text.localTitle}</h2>
          <p className="mt-3 leading-relaxed">{text.local}</p>
        </div>
        <div>
          <h2 className="text-2xl text-heading">{text.internationalTitle}</h2>
          <p className="mt-3 leading-relaxed">{text.international}</p>
        </div>
        <ButtonLink
          href={`/${locale}/contact`}
          variant="secondary"
          arrow
          className="w-fit max-w-full md:col-span-2"
        >
          {text.contact}
        </ButtonLink>
      </Container>
    </Section>
  );
}
