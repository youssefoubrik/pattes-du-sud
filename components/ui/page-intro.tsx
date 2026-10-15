import { Container } from "./container";
import { Section } from "./section";

export function PageIntro({
  title,
  intro,
  children,
  className = "",
}: {
  title: string;
  intro: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Section className={className}>
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed">{intro}</p>
          {children}
        </div>
      </Container>
    </Section>
  );
}
