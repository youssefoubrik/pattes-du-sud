import { localizedRoute, routePaths } from "@/lib/routes";
import {
  BadgeCheck,
  Building2,
  ChevronDown,
  FileText,
  Handshake,
  Heart,
  HeartPulse,
  House,
  Info,
  Mail,
  MapPin,
  PawPrint,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { BackLink } from "@/components/ui/back-link";
import { ActionButton } from "@/components/ui/action-button";
import { isLocale, routing, type Locale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import {
  copyFields,
  getEditableCopy,
  type CopyNamespace,
} from "@/lib/editable-copy";
import { aboutMessages } from "@/messages/about";
import { homeMessages } from "@/messages/home";
import { pageMessages } from "@/messages/pages";
import { updateContent } from "../actions";

export const metadata = {
  title: "Edit text",
  robots: { index: false, follow: false },
};

export const instant = false;
const namespaces: CopyNamespace[] = ["home", "about", "pages"];
const sectionNames: Record<CopyNamespace, string> = {
  home: "Home page",
  about: "About page",
  pages: "Other pages",
};
const sectionIcons: Record<CopyNamespace, LucideIcon> = {
  home: House,
  about: Users,
  pages: FileText,
};
const languageNames: Record<Locale, string> = {
  en: "English",
  fr: "French",
  de: "German",
  ar: "Arabic",
};
const fieldLabelNames: Record<string, string> = {
  animalGreeting: "Companion greeting",
  animalWelcome: "Companion welcome",
  animalsHelped: "Companions helped",
};
type EditableField = {
  path: string;
  value: string;
  label: string;
  values: Record<Locale, string>;
};

const pageGroupNames: Record<string, string> = {
  adopt: "Adopt page",
  volunteer: "Volunteer page",
  contact: "Contact page",
  donate: "Donate page",
  thanks: "Donation thank-you page",
  mirleft: "Mirleft page",
  privacy: "Privacy page",
  animal: "Companion profile",
};

function fieldGroupTitle(namespace: CopyNamespace, path: string) {
  const section = path.split(".")[0];
  if (namespace === "pages") return pageGroupNames[section] ?? section;
  if (namespace === "home") {
    return (
      {
        whatWeDo: "What we do",
        team: "Team",
        howToHelp: "How to help",
        location: "Location",
        supporters: "Supporters",
      }[section] ?? "Home introduction"
    );
  }
  return (
    {
      care: "Care",
      team: "Team",
      association: "Association details",
      closingInvitation: "Closing invitation",
    }[section] ?? "About introduction"
  );
}

function fieldLabel(path: string) {
  const parts = path.split(".");
  const words = (parts.length > 1 ? parts.slice(1) : parts).map((part) => {
    if (fieldLabelNames[part]) return fieldLabelNames[part];
    if (/^\d+$/.test(part)) return `item ${Number(part) + 1}`;
    return part.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  });
  return words
    .join(" ")
    .replace(/^./, (character) => character.toUpperCase());
}

const pageGroupIcons: Record<string, LucideIcon> = {
  "Home introduction": House,
  "What we do": HeartPulse,
  Team: Users,
  "How to help": Heart,
  Location: MapPin,
  Supporters: Handshake,
  "About introduction": Info,
  Care: HeartPulse,
  "Association details": Building2,
  "Closing invitation": Heart,
  "Adopt page": PawPrint,
  "Volunteer page": Heart,
  "Contact page": Mail,
  "Donate page": Heart,
  "Donation thank-you page": BadgeCheck,
  "Mirleft page": MapPin,
  "Privacy page": Shield,
  "Companion profile": PawPrint,
};

export default async function ContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const query = await searchParams;
  const contentSections = namespaces.map((section) => {
    const localizedFields = {} as Record<Locale, Map<string, string>>;
    for (const language of routing.locales) {
      const base =
        section === "home"
          ? homeMessages[language]
          : section === "about"
            ? aboutMessages[language]
            : pageMessages[language];
      localizedFields[language] = new Map(
        copyFields(getEditableCopy(section, language, base)).map((field) => [
          field.path,
          field.value,
        ]),
      );
    }
    const base =
      section === "home"
        ? homeMessages.en
        : section === "about"
          ? aboutMessages.en
          : pageMessages.en;
    const fields = copyFields(getEditableCopy(section, "en", base));
    const groups = new Map<string, EditableField[]>();
    for (const field of fields) {
      const title = fieldGroupTitle(section, field.path);
      const values = Object.fromEntries(
        routing.locales.map((language) => [
          language,
          localizedFields[language].get(field.path) ?? "",
        ]),
      ) as Record<Locale, string>;
      groups.set(title, [
        ...(groups.get(title) ?? []),
        { ...field, label: fieldLabel(field.path), values },
      ]);
    }
    return { section, groups: [...groups] };
  });
  return (
    <main className="flex-1 py-12">
      <Container className="max-w-4xl">
        <BackLink href={localizedRoute(locale, routePaths.admin)}>
          Editor
        </BackLink>
        <h1 className="mt-5 text-4xl text-heading">Edit page text</h1>
        {query.saved && (
          <p role="status" className="mt-5 rounded-xl bg-secondary p-4">
            Text saved.
          </p>
        )}
        <div className="mt-8 grid gap-8">
          {contentSections.map(({ section, groups }) => {
            const SectionIcon = sectionIcons[section];
            return (
              <section key={section} aria-labelledby={`section-${section}`}>
                <h2
                  id={`section-${section}`}
                  className="inline-flex items-center gap-2 text-2xl font-semibold text-heading"
                >
                  <SectionIcon size={21} aria-hidden="true" />
                  {sectionNames[section]}
                </h2>
                <form
                  key={section}
                  action={updateContent}
                  className="mt-5 grid gap-6"
                >
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="section" value={section} />
                  {groups.map(([title, groupFields]) => {
                    const GroupIcon = pageGroupIcons[title] ?? FileText;
                    return (
                      <details
                        key={title}
                        className="group min-w-0 rounded-2xl border border-border bg-surface"
                      >
                        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-3 text-xl font-semibold text-heading marker:hidden [&::-webkit-details-marker]:hidden">
                          <span className="inline-flex items-center gap-2">
                            <GroupIcon size={19} aria-hidden="true" />
                            {title}
                          </span>
                          <ChevronDown
                            size={19}
                            aria-hidden="true"
                            className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                          />
                        </summary>
                        <div className="grid gap-5 px-5 pb-5 pt-1">
                          {groupFields.map(({ path, label, values }) => (
                            <fieldset
                              key={path}
                              className="min-w-0 rounded-xl border border-border bg-background p-4"
                            >
                              <legend className="px-1 font-semibold text-heading">
                                {label}
                              </legend>
                              <div className="grid gap-4 lg:grid-cols-2">
                                {routing.locales.map((language) => (
                                  <label
                                    key={language}
                                    className="block text-sm font-semibold"
                                  >
                                    {languageNames[language]}
                                    <textarea
                                      name={`field:${path}:${language}`}
                                      defaultValue={values[language]}
                                      rows={values[language].length > 180 ? 4 : 2}
                                      className="mt-2 block w-full rounded-xl border border-border bg-surface p-3 text-base font-normal"
                                      dir={language === "ar" ? "rtl" : "ltr"}
                                    />
                                  </label>
                                ))}
                              </div>
                            </fieldset>
                          ))}
                        </div>
                      </details>
                    );
                  })}
                  <ActionButton
                    type="submit"
                    variant="secondary"
                    className="justify-self-start"
                  >
                    Save text
                  </ActionButton>
                </form>
              </section>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
