import { AnimalPreview } from "@/components/animal-preview";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { getHomepageAnimals } from "@/content/animals";
import { getAnimals } from "@/lib/db";
import type { Locale } from "@/i18n/routing";
import { animalMessages } from "@/messages/animals";

export function MeetAnimals({ locale }: { locale: Locale }) {
  const animals = getHomepageAnimals(getAnimals());
  if (!animals.length) return null;
  const text = animalMessages[locale];

  return (
    <Section aria-labelledby="meet-animals-title" className="relative">
      <SectionDivider direction="leave" paws />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="meet-animals-title"
            className="text-3xl font-semibold text-heading sm:text-4xl"
          >
            {text.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            {text.description}
          </p>
        </div>
        <ul className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {animals.map((animal, index) => (
            <li
              key={animal.id}
              className={`mb-6 break-inside-avoid lg:[&:nth-child(1)]:pt-10 lg:[&:nth-child(5)]:pt-10 ${index < 3 ? "" : "hidden sm:block"}`}
            >
              <AnimalPreview
                animal={animal}
                locale={locale}
                portrait={index % 3 !== 1}
              />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink
            href={`/${locale}/companions`}
            variant="secondary"
            arrow
            className="max-w-full gap-3 py-2"
          >
            {text.meetAll}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
