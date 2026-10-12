import type { Locale } from "@/i18n/routing";

type LocalizedText = Record<Locale, string>;

type TeamMember = {
  id: string;
  firstName: string;
  role: LocalizedText;
  work: LocalizedText;
  portrait: { src: string; width: number; height: number };
};

type AboutContent = {
  introductionImage: { src: string; width: number; height: number };
  teamMembers: TeamMember[];
};

export const aboutContent: AboutContent = {
  // Use an association photo showing the team caring for animals in Mirleft.
  introductionImage: {
    src: "/images/home-team-stock.jpg",
    width: 1200,
    height: 800,
  },
  // Temporary example profiles. Replace every name, detail, and stock portrait with approved team information before publication.
  // Portrait sources: https://unsplash.com/photos/photo-1534528741775-53994a69daeb,
  // https://unsplash.com/photos/photo-1500648767791-00dcc994a43e,
  // https://unsplash.com/photos/photo-1517841905240-472988babdf9,
  // https://unsplash.com/photos/photo-1507003211169-0a1dd7228f2d.
  teamMembers: [
    {
      id: "amina",
      firstName: "Amina",
      role: { en: "Animal care", fr: "Soins aux animaux", de: "Tierbetreuung", ar: "رعاية الحيوانات" },
      work: {
        en: "Checks on animals and helps organise their daily care.",
        fr: "Prend des nouvelles des animaux et aide à organiser leurs soins quotidiens.",
        de: "Sieht nach den Tieren und hilft, ihre tägliche Versorgung zu organisieren.",
        ar: "تتابع أحوال الحيوانات وتساعد في تنظيم رعايتها اليومية.",
      },
      portrait: { src: "/images/team-amina-stock.jpg", width: 600, height: 750 },
    },
    {
      id: "youssef",
      firstName: "Youssef",
      role: { en: "Veterinary liaison", fr: "Lien avec les vétérinaires", de: "Kontakt zu Tierärzten", ar: "التنسيق مع الأطباء البيطريين" },
      work: {
        en: "Helps arrange appointments and follow-up treatment.",
        fr: "Aide à organiser les rendez-vous et le suivi des traitements.",
        de: "Hilft bei Terminen und der Nachsorge nach Behandlungen.",
        ar: "يساعد في ترتيب المواعيد ومتابعة العلاج.",
      },
      portrait: { src: "/images/team-youssef-stock.jpg", width: 600, height: 750 },
    },
    {
      id: "salma",
      firstName: "Salma",
      role: { en: "Adoption support", fr: "Accompagnement des adoptions", de: "Adoptionsbegleitung", ar: "متابعة التبنّي" },
      work: {
        en: "Helps people learn about animals looking for a home.",
        fr: "Aide les personnes à découvrir les animaux qui cherchent un foyer.",
        de: "Hilft Menschen, Tiere kennenzulernen, die ein Zuhause suchen.",
        ar: "تساعد المهتمين على التعرّف إلى الحيوانات التي تبحث عن بيت.",
      },
      portrait: { src: "/images/team-salma-stock.jpg", width: 600, height: 750 },
    },
    {
      id: "karim",
      firstName: "Karim",
      role: { en: "Volunteer coordination", fr: "Coordination des bénévoles", de: "Freiwilligenkoordination", ar: "تنسيق المتطوعين" },
      work: {
        en: "Helps visitors find practical ways to support the work.",
        fr: "Aide les visiteurs à trouver comment soutenir les actions sur place.",
        de: "Zeigt Besuchern, wie sie die Arbeit vor Ort unterstützen können.",
        ar: "يساعد الزوار على إيجاد طرق عملية لدعم العمل.",
      },
      portrait: { src: "/images/team-karim-stock.jpg", width: 600, height: 750 },
    },
  ],
};
