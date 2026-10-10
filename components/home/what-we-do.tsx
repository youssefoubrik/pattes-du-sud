import { ArrowRight, House, Soup, Stethoscope, UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { SectionImage } from "@/components/ui/section-image";
import { homeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";

const services = [
  { id: "medical", icon: Stethoscope },
  { id: "foodShelter", icon: Soup },
  { id: "adoption", icon: House },
  { id: "education", icon: UsersRound },
] as const;

export function WhatWeDo({ locale }: { locale: Locale }) {
  const text = homeMessages[locale].whatWeDo;
  const image = homeContent.workImage;

  return (
    <Section aria-labelledby="what-we-do-title" className="relative bg-secondary">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-full -mb-px h-8 w-full fill-secondary sm:h-12 lg:h-16"
      >
        <path d="M0 40C240 72 400 8 680 24S1120 72 1440 24V64H0Z" />
      </svg>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <figure>
          <SectionImage
            src={image.src}
            alt={text.imageAlt}
            objectPosition="center 65%"
          />
          <PhotoCaption>{text.imageCaption}</PhotoCaption>
        </figure>
        <div>
          <h2 id="what-we-do-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">{text.description}</p>
          <ul className="mt-8 space-y-6">
            {services.map(({ id, icon: Icon }) => (
              <li key={id} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background text-primary-hover">
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-heading">{text[id].title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-foreground">{text[id].description}</p>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href={`/${locale}/about`} variant="secondary" compact className="mt-8 max-w-full gap-2 bg-background py-2 text-center">
            {text.meetTeam}
            <ArrowRight size={18} className="shrink-0 rtl:rotate-180" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
