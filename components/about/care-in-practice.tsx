import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";

export function CareInPractice({ locale }: { locale: Locale }) {
  const text = aboutMessages[locale].care;

  return (
    <Section aria-labelledby="about-care-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="about-care-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">{text.introduction}</p>
        </div>
        <div>
          <ol className="space-y-5">
            {text.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4 border-t border-border pt-4">
                <span aria-hidden="true" className="font-display text-xl font-semibold text-primary-hover">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-heading">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="mt-7 border-s-2 border-primary ps-4">
            <h3 className="font-bold text-heading">{text.redCollar.title}</h3>
            <p className="mt-1 leading-relaxed text-foreground">{text.redCollar.description}</p>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
