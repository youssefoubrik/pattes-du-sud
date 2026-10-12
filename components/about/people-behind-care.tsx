import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { aboutContent } from "@/content/about";
import type { Locale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";

export function PeopleBehindCare({ locale }: { locale: Locale }) {
  const text = aboutMessages[locale].team;
  const members = aboutContent.teamMembers.slice(0, 4);

  return (
    <Section aria-labelledby="about-team-title" className="bg-background">
      <Container>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
          <div>
            <h2 id="about-team-title" className="text-3xl font-semibold text-heading sm:text-4xl">
              {text.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
              {text.introduction}
            </p>
          </div>
          <ButtonLink href={`/${locale}/volunteer`} variant="secondary" arrow className="w-fit max-w-full">
            {text.volunteer}
          </ButtonLink>
        </div>

        {members.length > 0 && (
          <>
            <p className="mt-10 text-sm font-semibold text-muted-foreground">{text.sampleNotice}</p>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member) => (
                <li key={member.id}>
                  <article>
                    <div className="aspect-4/5 overflow-hidden rounded-2xl bg-secondary">
                      <Image
                        src={member.portrait.src}
                        alt=""
                        width={member.portrait.width}
                        height={member.portrait.height}
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-heading">{member.firstName}</h3>
                    <p className="mt-1 font-bold text-primary-hover">{member.role[locale]}</p>
                    <p className="mt-2 leading-relaxed text-foreground">{member.work[locale]}</p>
                  </article>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </Section>
  );
}
