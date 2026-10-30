import { getPageContent } from "@/lib/database/page-content";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Supporter } from "@/content/supporters";
import { getSupporters } from "@/lib/database/supporter-records";
import type { Locale } from "@/i18n/routing";
import { homeMessages } from "@/messages/home";

const cardClassName = "flex min-h-32 w-full items-center justify-center rounded-2xl border border-border/70 bg-surface px-6 py-6 text-center shadow-sm shadow-heading/10";

function SupporterName({ supporter }: { supporter: Supporter }) {
  return (
    <span className="flex min-w-0 items-center justify-center gap-4">
      {supporter.logo && (
        <Image
          src={supporter.logo.src}
          alt=""
          width={supporter.logo.width}
          height={supporter.logo.height}
          className="max-h-12 max-w-20 shrink-0 object-contain"
        />
      )}
      <span className="min-w-0 break-words text-lg font-bold leading-snug text-heading">{supporter.name}</span>
    </span>
  );
}

export function Supporters({ locale }: { locale: Locale }) {
  const supporters = getSupporters();
  if (!supporters.length) return null;
  const text = getPageContent("home", locale, homeMessages[locale]).supporters;

  return (
    <Section aria-labelledby="supporters-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="supporters-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground">{text.description}</p>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {supporters.map((supporter) => (
            <li key={supporter.id} className="w-full sm:w-64 lg:w-72">
              {supporter.website ? (
                <a
                  href={supporter.website}
                  className={`${cardClassName} transition-colors hover:border-heading/40`}
                >
                  <SupporterName supporter={supporter} />
                </a>
              ) : (
                <div className={cardClassName}>
                  <SupporterName supporter={supporter} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
