import { getEditableCopy } from "@/lib/editable-copy";
import { House, Soup, Stethoscope, UsersRound } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PhotoCaption } from "@/components/ui/photo-caption";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { homeContent } from "@/content/home";
import { getMediaSrc } from "@/lib/media";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";

const services = [
  { id: "medical", icon: Stethoscope },
  { id: "foodShelter", icon: Soup },
  { id: "adoption", icon: House },
  { id: "education", icon: UsersRound },
] as const;

export function WhatWeDo({ locale }: { locale: Locale }) {
  const text = getEditableCopy("home", locale, homeMessages[locale]).whatWeDo;
  const images = homeContent.workImages;

  return (
    <Section aria-labelledby="what-we-do-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <figure>
          <div className="grid aspect-6/5 grid-cols-[1.1fr_1fr] grid-rows-2 gap-2 sm:gap-3">
            <div className="relative row-span-2 overflow-hidden rounded-3xl bg-background">
              <Image
                src={getMediaSrc("home.feeding", images.feeding.src)}
                alt={text.imageAlt}
                fill
                sizes="(min-width: 1024px) 300px, 55vw"
                className="object-cover"
                style={{ objectPosition: "center 60%" }}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-background">
              <Image
                src={getMediaSrc("home.veterinary", images.veterinary.src)}
                alt={text.veterinaryImageAlt}
                fill
                sizes="(min-width: 1024px) 260px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-background">
              <Image
                src={getMediaSrc("home.companionship", images.companionship.src)}
                alt={text.companionshipImageAlt}
                fill
                sizes="(min-width: 1024px) 260px, 45vw"
                className="object-cover"
              />
            </div>
          </div>
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
        </div>
      </Container>
    </Section>
  );
}
