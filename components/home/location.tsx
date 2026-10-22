import { getPageContent } from "@/lib/database/page-content";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { getSettings } from "@/lib/database/site-settings";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";

export function Location({ locale }: { locale: Locale }) {
  const text = getPageContent("home", locale, homeMessages[locale]).location;

  return (
    <Section aria-labelledby="location-title" className="relative">
      <SectionDivider direction="leave" />
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-heading">
            <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
            {text.place}
          </p>
          <h2 id="location-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">
            {text.description}
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-foreground">{text.visitNote}</p>
        </div>

        <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border bg-secondary shadow-sm shadow-heading/10 sm:min-h-88">
          <iframe
            src={getSettings().mapEmbedUrl}
            title={text.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </Container>
    </Section>
  );
}
