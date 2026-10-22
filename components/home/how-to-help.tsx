import { getPageContent } from "@/lib/database/page-content";
import { localizedRoute, routePaths } from "@/lib/routes";
import { HandHeart, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";

export function HowToHelp({ locale }: { locale: Locale }) {
  const text = getPageContent("home", locale, homeMessages[locale]).howToHelp;

  return (
    <Section aria-labelledby="how-to-help-title" className="relative">
      <SectionDivider direction="leave" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-to-help-title"
            className="text-3xl font-semibold text-heading sm:text-4xl"
          >
            {text.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            {text.description}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-heading/5 sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-heading">
              <HandHeart size={25} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-heading">
              {text.donate.title}
            </h3>
            <p className="mt-3 flex-1 leading-relaxed text-foreground">
              {text.donate.description}
            </p>
            <ButtonLink
              href={localizedRoute(locale, routePaths.donate)}
              variant="donate"
              className="mt-7 self-start"
            >
              {text.donate.cta}
            </ButtonLink>
          </article>

          <article className="flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-heading/5 sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-heading">
              <MessageCircle size={24} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-heading">
              {text.volunteer.title}
            </h3>
            <p className="mt-3 flex-1 leading-relaxed text-foreground">
              {text.volunteer.description}
            </p>
            <ButtonLink
              href={localizedRoute(locale, routePaths.volunteer)}
              variant="secondary"
              arrow
              className="mt-7 self-start"
            >
              {text.volunteer.cta}
            </ButtonLink>
          </article>
        </div>

      </Container>
    </Section>
  );
}
