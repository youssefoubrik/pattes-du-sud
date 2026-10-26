import { getPageContent } from "@/lib/database/page-content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";

export function CareInPractice({ locale }: { locale: Locale }) {
  const text = getPageContent("about", locale, aboutMessages[locale]).care;

  return (
    <Section
      aria-labelledby="about-care-title"
      className="relative !py-8 bg-secondary sm:!py-10 lg:!py-12"
    >
      <SectionDivider direction="enter" />
      <Container>
        <div className="max-w-3xl">
          <h2 id="about-care-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-foreground">{text.introduction}</p>
        </div>
        <div className="relative mt-7">
          <span
            aria-hidden="true"
            className="absolute inset-x-[16.666%] top-8 hidden h-px bg-border md:block"
          />
          <ol className="grid gap-7 md:grid-cols-3 md:gap-10">
            {text.steps.map((step, index) => (
              <li key={step.title} className="min-w-0 text-center">
                <span
                  aria-hidden="true"
                  className="relative z-10 inline-block bg-secondary px-3 font-display text-5xl leading-none font-normal tracking-tight text-primary sm:text-6xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-heading">{step.title}</h3>
                <p className="mx-auto mt-1 max-w-sm leading-relaxed text-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
