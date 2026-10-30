import { getPageContent } from "@/lib/database/page-content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function AdoptionSteps({ locale }: { locale: Locale }) {
  const text = getPageContent("pages", locale, pageMessages[locale]).adopt;

  return (
    <Section aria-labelledby="adoption-steps-title" className="relative !py-8 bg-secondary sm:!py-10 lg:!py-12">
      <SectionDivider direction="enter" />
      <Container>
        <div className="max-w-3xl">
          <h2 id="adoption-steps-title" className="text-2xl font-semibold text-heading sm:text-3xl">{text.stepsTitle}</h2>
        </div>
        <div className="relative mt-7">
          <span aria-hidden="true" className="absolute inset-x-[16.666%] top-8 hidden h-px bg-border md:block" />
          <ol className="grid gap-7 md:grid-cols-3 md:gap-10">
          {text.steps.map((step, i) => (
            <li key={step} className="min-w-0 text-center">
              <span aria-hidden="true" className="relative z-10 inline-block bg-secondary px-3 font-display text-5xl leading-none font-normal tracking-tight text-primary sm:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mx-auto mt-3 max-w-sm leading-relaxed text-foreground">{step}</p>
            </li>
          ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
