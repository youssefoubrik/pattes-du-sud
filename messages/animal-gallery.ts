import type { Locale } from "@/i18n/routing";

type GalleryMessages = {
  title: string;
  description: string;
  speciesLabel: string;
  statusLabel: string;
  all: string;
  dogs: string;
  cats: string;
  available: string;
  adopted: string;
  count: string;
  empty: string;
  adoptionLink: string;
  paginationLabel: string;
  pageOf: string;
  pageLabel: string;
  previousPage: string;
  nextPage: string;
};

export const animalGalleryMessages: Record<Locale, GalleryMessages> = {
  en: {
    title: "Find your companion", description: "Get to know the dogs and cats in our care, and celebrate those who have found a home.",
    speciesLabel: "Companion type", statusLabel: "Status", all: "All", dogs: "Dogs", cats: "Cats", available: "Looking for a home", adopted: "Adopted",
    count: "{count} companions", empty: "No companions match these filters. Try another selection.",
    adoptionLink: "See how adoption works",
    paginationLabel: "Companion gallery pages", pageOf: "Page {page} of {pages}", pageLabel: "Go to page {page}", previousPage: "Previous", nextPage: "Next",
  },
  fr: {
    title: "Trouvez votre compagnon", description: "Découvrez les chiens et les chats dont nous prenons soin, ainsi que ceux qui ont trouvé un foyer.",
    speciesLabel: "Type", statusLabel: "Situation", all: "Tous", dogs: "Chiens", cats: "Chats", available: "Cherche un foyer", adopted: "Adoptés",
    count: "{count} compagnons", empty: "Aucun compagnon ne correspond à ces filtres. Essayez une autre sélection.",
    adoptionLink: "Découvrir l’adoption",
    paginationLabel: "Pages de la galerie des compagnons", pageOf: "Page {page} sur {pages}", pageLabel: "Aller à la page {page}", previousPage: "Précédent", nextPage: "Suivant",
  },
  de: {
    title: "Finde deinen Begleiter", description: "Entdecke die Hunde und Katzen in unserer Obhut und freue dich mit denen, die ein Zuhause gefunden haben.",
    speciesLabel: "Art", statusLabel: "Status", all: "Alle", dogs: "Hunde", cats: "Katzen", available: "Sucht ein Zuhause", adopted: "Adoptiert",
    count: "{count} Begleiter", empty: "Für diese Filter gibt es keine Begleiter. Wähle eine andere Kombination.",
    adoptionLink: "So funktioniert Adoption",
    paginationLabel: "Seiten der Begleitergalerie", pageOf: "Seite {page} von {pages}", pageLabel: "Zu Seite {page}", previousPage: "Zurück", nextPage: "Weiter",
  },
  ar: {
    title: "اعثر على رفيقك", description: "تعرّف على الكلاب والقطط التي نعتني بها، وشاركنا فرحة من وجد منها بيتًا.",
    speciesLabel: "النوع", statusLabel: "الحالة", all: "الكل", dogs: "الكلاب", cats: "القطط", available: "يبحث عن بيت", adopted: "تم تبنّيها",
    count: "عدد الرفاق: {count}", empty: "لا يوجد رفاق يطابقون هذين الخيارين. جرّب اختيارًا آخر.",
    adoptionLink: "كيف يتم التبنّي؟",
    paginationLabel: "صفحات معرض الرفاق", pageOf: "الصفحة {page} من {pages}", pageLabel: "انتقل إلى الصفحة {page}", previousPage: "السابق", nextPage: "التالي",
  },
};
