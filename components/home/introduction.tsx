import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LocationLabel } from "@/components/location-label";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { homeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { messages } from "@/messages";
import { homeMessages } from "@/messages/home";

export function Introduction({ locale }: { locale: Locale }) {
  const text = homeMessages[locale];
  const image = homeContent.introductionImage;

  return (
    <section
      aria-labelledby="introduction-title"
      className="py-12 sm:py-16 lg:py-20"
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
            <ButtonLink href={`/${locale}/donate`} className="min-h-13">
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
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-secondary lg:aspect-5/4">
            <Image
              src={image.src}
              alt={text.imageAlt}
              fill
              sizes="(min-width: 1280px) 576px, (min-width: 1024px) calc((100vw - 128px) / 2), calc(100vw - 48px)"
              preload
              className="object-cover object-[60%_center]"
            />
          </div>
        </figure>
      </Container>
    </section>
  );
}
