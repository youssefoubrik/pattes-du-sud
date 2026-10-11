import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { SectionImage } from "@/components/ui/section-image";
import { homeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";

export function OurTeam({ locale }: { locale: Locale }) {
  const text = homeMessages[locale].team;
  const image = homeContent.teamImage;

  return (
    <Section aria-labelledby="our-team-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <figure>
            <SectionImage src={image.src} alt={text.imageAlt} objectPosition="center 45%" />
            <PhotoCaption>{text.imageCaption}</PhotoCaption>
          </figure>
          <div>
            <h2 id="our-team-title" className="text-3xl font-semibold text-heading sm:text-4xl">
              {text.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">
              {text.description}
            </p>
            <blockquote className="mt-5 max-w-lg border-s-2 border-primary ps-4">
              <p className="font-display text-lg leading-relaxed text-heading italic">
                “{text.quote}”
              </p>
              <footer className="mt-2 text-sm font-semibold text-muted-foreground">
                {text.quoteAttribution}
              </footer>
            </blockquote>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink
                href={`/${locale}/volunteer`}
                variant="secondary"
                arrow
                compact
                className="max-w-full gap-2 bg-background py-2 text-center"
              >
                {text.volunteerCta}
              </ButtonLink>
              <Link
                href={`/${locale}/about`}
                className="inline-flex min-h-11 items-center font-bold text-heading underline decoration-border underline-offset-4 hover:decoration-heading"
              >
                {text.meetTeam}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
