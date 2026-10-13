import { getEditableCopy } from "@/lib/editable-copy";
import { MapPin } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import { footerContent } from "@/content/footer";
import { getSettings } from "@/lib/db";
import type { Locale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";
import { footerMessages } from "@/messages/footer";

export function AssociationInMirleft({ locale }: { locale: Locale }) {
  const text = getEditableCopy("about", locale, aboutMessages[locale]).association;
  const footerText = footerMessages[locale];
  const { officialName } = footerContent;
  const settings = getSettings();
  const registrationReference = settings.registrationReference;
  const contact = settings;

  return (
    <Section aria-labelledby="about-association-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-heading">
            <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
            {text.place}
          </p>
          <h2 id="about-association-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-5 leading-relaxed text-foreground">{text.visitNote}</p>
          <ButtonLink href={`/${locale}/contact`} variant="secondary" arrow className="mt-5 w-fit max-w-full bg-background">
            {text.contact}
          </ButtonLink>
          {(contact.instagram || contact.facebook) && (
            <div className="mt-6">
              <SocialLinks instagram={contact.instagram} facebook={contact.facebook} label={footerText.findUs} />
            </div>
          )}
        </div>

        <div>
          <dl className="rounded-2xl border border-border bg-background px-5 sm:px-6">
            <div className="py-4">
              <dt className="text-sm font-bold text-muted-foreground">{text.officialName}</dt>
              <dd className="mt-1 text-lg font-semibold text-heading">{officialName}</dd>
            </div>
            {registrationReference && (
              <div className="border-t border-border py-4">
                <dt className="text-sm font-bold text-muted-foreground">{footerText.registration}</dt>
                <dd className="mt-1 text-lg font-semibold text-heading">{registrationReference}</dd>
              </div>
            )}
            <div className="border-t border-border py-4">
              <dt className="text-sm font-bold text-muted-foreground">{text.areaLabel}</dt>
              <dd className="mt-1 text-lg font-semibold text-heading">{text.area}</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-2xl border border-border bg-background px-5 py-5 sm:px-6">
            <h3 className="text-lg font-semibold text-heading">{text.recordsTitle}</h3>
            <ul className="mt-3 list-disc space-y-2 ps-5 leading-relaxed text-foreground marker:text-primary-hover">
              {text.records.map((record) => <li key={record}>{record}</li>)}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
