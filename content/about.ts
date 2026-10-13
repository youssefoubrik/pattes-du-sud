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
  foundingStory: LocalizedText | null;
  teamMembers: TeamMember[];
};

export const aboutContent: AboutContent = {
  // Use an association photo showing the team caring for animals in Mirleft.
  introductionImage: {
    src: "/images/home-team-stock.jpg",
    width: 1200,
    height: 800,
  },
  // A dated account of the founding can be added here when its details are confirmed.
  foundingStory: null,
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
        en: "Visits animals, notes changes in their condition, and plans daily care.",
        fr: "Rend visite aux animaux, note l’évolution de leur état et organise les soins quotidiens.",
        de: "Besucht die Tiere, beobachtet Veränderungen und plant ihre tägliche Versorgung.",
        ar: "تزور الحيوانات وتلاحظ تغيّر حالتها وتنظّم رعايتها اليومية.",
      },
      portrait: { src: "/images/team-amina-stock.jpg", width: 600, height: 750 },
    },
    {
      id: "youssef",
      firstName: "Youssef",
      role: { en: "Veterinary liaison", fr: "Lien avec les vétérinaires", de: "Kontakt zu Tierärzten", ar: "التنسيق مع الأطباء البيطريين" },
      work: {
        en: "Contacts veterinary practices, arranges appointments, and follows treatment plans.",
        fr: "Contacte les vétérinaires, organise les rendez-vous et suit les traitements.",
        de: "Kontaktiert Tierarztpraxen, vereinbart Termine und verfolgt Behandlungspläne.",
        ar: "يتواصل مع العيادات البيطرية ويرتّب المواعيد ويتابع خطط العلاج.",
      },
      portrait: { src: "/images/team-youssef-stock.jpg", width: 600, height: 750 },
    },
    {
      id: "salma",
      firstName: "Salma",
      role: { en: "Adoption support", fr: "Accompagnement des adoptions", de: "Adoptionsbegleitung", ar: "متابعة التبنّي" },
      work: {
        en: "Introduces prospective adopters to animals and helps with their first questions.",
        fr: "Présente les animaux aux personnes souhaitant adopter et répond à leurs premières questions.",
        de: "Stellt Interessierten die Tiere vor und beantwortet ihre ersten Fragen zur Adoption.",
        ar: "تعرّف الراغبين في التبنّي بالحيوانات وتجيب عن أسئلتهم الأولى.",
      },
      portrait: { src: "/images/team-salma-stock.jpg", width: 600, height: 750 },
    },
    {
      id: "karim",
      firstName: "Karim",
      role: { en: "Volunteer coordination", fr: "Coordination des bénévoles", de: "Freiwilligenkoordination", ar: "تنسيق المتطوعين" },
      work: {
        en: "Welcomes volunteer enquiries and coordinates useful tasks for visitors.",
        fr: "Accueille les demandes de bénévolat et coordonne les tâches utiles pour les visiteurs.",
        de: "Beantwortet Anfragen von Freiwilligen und koordiniert Aufgaben für Besucher.",
        ar: "يستقبل طلبات التطوع وينسّق المهام المناسبة للزوار.",
      },
      portrait: { src: "/images/team-karim-stock.jpg", width: 600, height: 750 },
    },
  ],
};
