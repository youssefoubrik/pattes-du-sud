import { PawPrint } from "lucide-react";
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
      <SectionDivider direction="enter" paws />
      <Container>
        <div className="max-w-3xl">
          <h2 id="adoption-steps-title" className="text-2xl font-semibold text-heading sm:text-3xl">{text.stepsTitle}</h2>
          <p className="mt-3 text-lg leading-relaxed text-foreground">
            {text.stepsDescription}
          </p>
        </div>
        <div className="relative mt-7">
          <span aria-hidden="true" className="absolute inset-x-[16.666%] top-8 hidden h-px bg-border md:block" />
          <span
            aria-hidden="true"
            className="absolute start-[33.333%] top-5 z-20 hidden -translate-x-1/2 items-center justify-center rounded-full bg-secondary p-1 text-heading/55 md:inline-flex"
          >
            <PawPrint size={16} fill="currentColor" />
          </span>
          <span
            aria-hidden="true"
            className="absolute start-[66.667%] top-5 z-20 hidden -translate-x-1/2 items-center justify-center rounded-full bg-secondary p-1 text-heading/55 md:inline-flex"
          >
            <PawPrint size={16} fill="currentColor" />
          </span>
          <ol className="grid gap-7 md:grid-cols-3 md:gap-10">
            {text.steps.map((step, i) => (
              <li key={step} className="min-w-0 text-center">
                <span
                  aria-hidden="true"
                  className="relative z-10 inline-flex size-16 items-center justify-center rounded-full border border-border bg-background font-display text-3xl leading-none font-normal tracking-tight text-heading shadow-sm sm:text-4xl"
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold text-heading">
                  {text.stepTitles[i]}
                </h3>
                <p className="mx-auto mt-1 max-w-sm leading-relaxed text-foreground">
                  {step}
                </p>
                {i < text.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mt-3 inline-flex text-heading/35 md:hidden"
                  >
                    <PawPrint size={16} fill="currentColor" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
