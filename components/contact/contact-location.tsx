import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Settings } from "@/lib/db";
import type { ContactText } from "@/components/contact/contact-types";

export function ContactLocation({
  text,
  mapEmbedUrl,
}: {
  text: ContactText;
  mapEmbedUrl: Settings["mapEmbedUrl"];
}) {
  return (
    <Section className="!pt-0">
      <Container>
        <h2 className="mb-4 text-2xl font-semibold text-heading">{text.mapTitle}</h2>
        <p className="mb-4 max-w-2xl">{text.arrange}</p>
        <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border bg-background sm:min-h-96">
          <iframe
            src={mapEmbedUrl}
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
