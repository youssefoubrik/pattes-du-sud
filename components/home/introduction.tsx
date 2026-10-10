import { ArrowRight } from "lucide-react";
import { LocationLabel } from "@/components/location-label";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionImage } from "@/components/ui/section-image";
import { homeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { homeMessages } from "@/messages/home";

export function Introduction({ locale }: { locale: Locale }) {
  const text = homeMessages[locale];
  const image = homeContent.introductionImage;

  return (
    <Section
      aria-labelledby="introduction-title"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <LocationLabel locale={locale} className="mb-5 text-sm font-medium" />
          <h1
            id="introduction-title"
            className="max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl"
          >
            {text.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground">
            {text.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={`/${locale}/donate`} variant="donate" className="min-h-13">
              {messages[locale].donate}
            </ButtonLink>
            <ButtonLink
              href={`/${locale}/animals`}
              variant="secondary"
              className="min-h-13 gap-3"
            >
              {text.meetAnimals}
              <ArrowRight
                size={20}
                className="shrink-0 rtl:rotate-180"
                aria-hidden="true"
              />
            </ButtonLink>
          </div>
        </div>

        <figure>
          <SectionImage
            src={image.src}
            alt={text.imageAlt}
            preload
            objectPosition="60% center"
          />
        </figure>
      </Container>
    </Section>
  );
}
