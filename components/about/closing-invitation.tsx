import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { aboutMessages } from "@/messages/about";

export function ClosingInvitation({ locale }: { locale: Locale }) {
  const labels = messages[locale];

  return (
    <Section aria-labelledby="about-closing-title" className="relative bg-background">
      <SectionDivider direction="leave" />
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <h2 id="about-closing-title" className="max-w-2xl text-2xl font-semibold leading-snug text-heading sm:text-3xl">
          {aboutMessages[locale].closingInvitation}
        </h2>
        <ButtonLink href={`/${locale}/donate`} variant="donate">
          {labels.donate}
        </ButtonLink>
      </Container>
    </Section>
  );
}
