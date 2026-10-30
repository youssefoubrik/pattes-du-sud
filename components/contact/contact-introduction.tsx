import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { ContactText } from "@/components/contact/contact-types";

export function ContactIntroduction({ text }: { text: ContactText }) {
  return (
    <Section className="!pb-4 sm:!pb-6 lg:!pb-8">
      <Container width="content">
        <div className="max-w-3xl">
          <h1 className="text-4xl leading-[1.12] font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            {text.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">{text.intro}</p>
        </div>
      </Container>
    </Section>
  );
}
