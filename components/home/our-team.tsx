import { getEditableCopy } from "@/lib/editable-copy";
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
      <span aria-hidden="true" className="pointer-events-none absolute start-[12%] top-2 text-heading/30">
        <PawPrint size={26} fill="currentColor" className="-rotate-12 rtl:rotate-12" />
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute start-[8%] top-4 text-heading/30">
        <PawPrint size={22} fill="currentColor" className="rotate-12 rtl:-rotate-12" />
      </span>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <figure className="lg:order-2">
            <SectionImage src={getMediaSrc("home.team", image.src)} alt={text.imageAlt} aspect="landscape" />
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
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink
                href={`/${locale}/about`}
                variant="secondary"
                arrow
                compact
                className="max-w-full gap-2 py-2 text-center"
              >
                {text.meetTeam}
              </ButtonLink>
              <ButtonLink
                href={`/${locale}/volunteer`}
                variant="link"
              >
                {text.volunteerCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
