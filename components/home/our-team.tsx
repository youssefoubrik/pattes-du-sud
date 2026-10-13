import { getEditableCopy } from "@/lib/editable-copy";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { SectionImage } from "@/components/ui/section-image";
import { homeContent } from "@/content/home";
import { getSettings } from "@/lib/db";
import { getMediaSrc } from "@/lib/media";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";

export function OurTeam({ locale }: { locale: Locale }) {
  const text = getEditableCopy("home", locale, homeMessages[locale]).team;
  const image = homeContent.teamImage;
  const settings = getSettings();

  return (
    <Section aria-labelledby="our-team-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <figure className="relative lg:order-2">
            <span aria-hidden="true" className="pointer-events-none absolute -top-12 start-2 flex items-start gap-1 text-heading/30">
              <PawPrint size={24} fill="currentColor" className="-rotate-12 rtl:rotate-12" />
              <PawPrint size={19} fill="currentColor" className="mt-2 rotate-12 rtl:-rotate-12" />
            </span>
            <SectionImage src={getMediaSrc("home.team", image.src)} alt={text.imageAlt} objectPosition="center 45%" />
            <PhotoCaption>{text.imageCaption}</PhotoCaption>
          </figure>
          <div className="lg:order-1">
            <h2 id="our-team-title" className="text-3xl font-semibold text-heading sm:text-4xl">
              {text.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">
              {text.description}
            </p>
            {(settings.impactAnimalsHelped || settings.impactAdoptions) && <dl className="mt-6 flex flex-wrap gap-7">
              {settings.impactAnimalsHelped && <div><dt className="text-sm font-semibold text-heading">{text.animalsHelped}</dt><dd className="text-3xl font-bold text-primary-hover">{settings.impactAnimalsHelped}</dd></div>}
              {settings.impactAdoptions && <div><dt className="text-sm font-semibold text-heading">{text.adoptions}</dt><dd className="text-3xl font-bold text-primary-hover">{settings.impactAdoptions}</dd></div>}
            </dl>}
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
