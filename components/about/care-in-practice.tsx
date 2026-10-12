import { House, Soup, Stethoscope, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionDivider } from "@/components/ui/section-divider";
import type { Locale } from "@/i18n/routing";
import { aboutMessages } from "@/messages/about";
import { homeMessages } from "@/messages/home";

const services = [
  { id: "medical", icon: Stethoscope },
  { id: "foodShelter", icon: Soup },
  { id: "adoption", icon: House },
  { id: "education", icon: UsersRound },
] as const;

export function CareInPractice({ locale }: { locale: Locale }) {
  const text = aboutMessages[locale].care;
  const serviceText = homeMessages[locale].whatWeDo;

  return (
    <Section aria-labelledby="about-care-title" className="relative bg-secondary">
      <SectionDivider direction="enter" />
      <Container className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="about-care-title" className="text-3xl font-semibold text-heading sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground">{text.introduction}</p>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-6">
            {services.map(({ id, icon: Icon }) => (
              <li key={id} className="border-t border-border pt-4">
                <Icon size={24} strokeWidth={1.7} className="text-primary-hover" aria-hidden="true" />
                <h3 className="mt-3 text-base font-bold leading-snug text-heading sm:text-lg">
                  {serviceText[id].title}
                </h3>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-s-2 border-primary ps-4 leading-relaxed text-foreground">
            {text.followUp}
          </p>
        </div>
      </Container>
    </Section>
  );
}
