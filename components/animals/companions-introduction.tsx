import { AdoptionPrompt } from "@/components/animals/adoption-prompt";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";
import { animalGalleryMessages } from "@/messages/animal-gallery";

export function CompanionsIntroduction({ locale }: { locale: Locale }) {
  const text = animalGalleryMessages[locale];

  return (
    <Section aria-labelledby="companions-title" className="!pb-0">
      <Container>
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 id="companions-title" className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              {text.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground">{text.description}</p>
          </div>
          <AdoptionPrompt locale={locale} />
        </div>
      </Container>
    </Section>
  );
}
