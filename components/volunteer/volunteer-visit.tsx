import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { localizedRoute, routePaths } from "@/lib/routes";
import { getPageContent } from "@/lib/database/page-content";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function VolunteerVisit({ locale }: { locale: Locale }) {
  const text = getPageContent("pages", locale, pageMessages[locale]).volunteer;

  return (
    <Section className="!pt-6 sm:!pt-8 lg:!pt-10">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
            {text.visitTitle}
          </h2>
          <p className="mt-3 text-lg leading-relaxed">{text.visit}</p>
          <ol className="mt-5 space-y-3">
            {text.visitSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-heading"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <ButtonLink
            href={localizedRoute(locale, routePaths.contact)}
            variant="secondary"
            arrow
            className="mt-6"
          >
            {text.arrangeVisit}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
