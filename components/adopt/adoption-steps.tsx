import { getEditableCopy } from "@/lib/editable-copy";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { pageMessages } from "@/messages/pages";

export function AdoptionSteps({ locale }: { locale: Locale }) {
  const text = getEditableCopy("pages", locale, pageMessages[locale]).adopt;

  return (
    <Section aria-labelledby="adoption-steps-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container>
        <h2 id="adoption-steps-title" className="text-3xl text-heading">{text.title}</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {text.steps.map((step, i) => (
            <li key={step} className="rounded-3xl bg-background p-6">
              <span aria-hidden="true" className="text-2xl font-bold text-primary-hover">
                0{i + 1}
              </span>
              <p className="mt-3 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
