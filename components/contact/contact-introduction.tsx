import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { ContactText } from "@/components/contact/contact-types";

export function ContactIntroduction({ text }: { text: ContactText }) {
  return (
    <Section className="pt-8 pb-4 sm:pt-10 sm:pb-4 lg:pt-12 lg:pb-4">
      <Container width="content">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
            {text.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed">{text.intro}</p>
        </div>
      </Container>
    </Section>
  );
}
