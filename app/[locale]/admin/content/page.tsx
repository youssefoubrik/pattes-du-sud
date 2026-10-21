import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
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
import { ActionButton } from "@/components/ui/action-button";
import { isLocale, routing } from "@/i18n/routing";
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

const pageGroupNames: Record<string, string> = {
  adopt: "Adopt page",
  volunteer: "Volunteer page",
  contact: "Contact page",
  donate: "Donate page",
  thanks: "Donation thank-you page",
  mirleft: "Mirleft page",
  privacy: "Privacy page",
  legal: "Legal page",
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
  "Legal page": FileText,
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
  const language =
    typeof query.language === "string" && isLocale(query.language)
      ? query.language
      : locale;
  const contentSections = namespaces.map((section) => {
    const base =
      section === "home"
        ? homeMessages[language]
        : section === "about"
          ? aboutMessages[language]
          : pageMessages[language];
    const fields = copyFields(getEditableCopy(section, language, base));
    const groups = new Map<string, typeof fields>();
    for (const field of fields) {
      const title = fieldGroupTitle(section, field.path);
      groups.set(title, [...(groups.get(title) ?? []), field]);
    }
    return { section, groups: [...groups] };
  });
  return (
    <main className="flex-1 py-12">
      <Container className="max-w-4xl">
        <Link
          href={`/${locale}/admin`}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-heading transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-heading"
        >
          <ArrowLeft
            size={18}
            className="text-primary rtl:rotate-180"
            aria-hidden="true"
          />
          Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Edit page text</h1>
        <div className="mt-6" role="group" aria-labelledby="content-language-label">
          <p
            id="content-language-label"
            className="mb-2 text-base font-bold text-heading"
          >
            Language
          </p>
          <nav aria-label="Language" className="flex flex-wrap gap-2">
            {routing.locales.map((item) => (
              <Link
                key={item}
                href={`/${locale}/admin/content?language=${item}`}
                aria-current={item === language ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-secondary/70 px-4 font-bold text-heading transition-colors hover:bg-secondary/80 aria-[current=page]:border-heading aria-[current=page]:bg-heading aria-[current=page]:text-primary-foreground"
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
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
                  key={`${section}-${language}`}
                  action={updateContent}
                  className="mt-5 grid gap-6"
                >
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="language" value={language} />
                  <input type="hidden" name="section" value={section} />
                  {groups.map(([title, groupFields]) => {
                    const GroupIcon = pageGroupIcons[title] ?? FileText;
                    return (
                      <fieldset
                        key={title}
                        className="min-w-0 rounded-2xl border border-border bg-surface p-5"
                      >
                        <legend className="inline-flex items-center gap-2 px-1 text-xl font-semibold text-heading">
                          <GroupIcon size={19} aria-hidden="true" />
                          {title}
                        </legend>
                        <div className="grid gap-5">
                          {groupFields.map(({ path, value }) => (
                            <label key={path} className="block font-semibold">
                              <span className="break-all text-heading">
                                {path}
                              </span>
                              <textarea
                                name={`field:${path}`}
                                defaultValue={value}
                                rows={value.length > 180 ? 4 : 2}
                                className="mt-2 block w-full rounded-xl border border-border bg-surface p-3 font-normal"
                                dir={language === "ar" ? "rtl" : "ltr"}
                              />
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    );
                  })}
                  <ActionButton type="submit" className="justify-self-start">
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
