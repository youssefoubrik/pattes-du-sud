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
    title: "Meet the animals", description: "Get to know the dogs and cats in our care, and celebrate those who have found a home.",
    speciesLabel: "Animal", statusLabel: "Status", all: "All", dogs: "Dogs", cats: "Cats", available: "Looking for a home", adopted: "Adopted",
    count: "{count} animals", empty: "No animals match these filters. Try another selection.",
    adoptionLink: "See how adoption works",
    paginationLabel: "Animal gallery pages", pageOf: "Page {page} of {pages}", pageLabel: "Go to page {page}", previousPage: "Previous", nextPage: "Next",
  },
  fr: {
    title: "Rencontrez nos animaux", description: "Découvrez les chiens et les chats dont nous prenons soin, ainsi que ceux qui ont trouvé un foyer.",
    speciesLabel: "Animal", statusLabel: "Situation", all: "Tous", dogs: "Chiens", cats: "Chats", available: "Cherche un foyer", adopted: "Adoptés",
    count: "{count} animaux", empty: "Aucun animal ne correspond à ces filtres. Essayez une autre sélection.",
    adoptionLink: "Découvrir l’adoption",
    paginationLabel: "Pages de la galerie des animaux", pageOf: "Page {page} sur {pages}", pageLabel: "Aller à la page {page}", previousPage: "Précédent", nextPage: "Suivant",
  },
  de: {
    title: "Lerne die Tiere kennen", description: "Entdecke die Hunde und Katzen in unserer Obhut und freue dich mit denen, die ein Zuhause gefunden haben.",
    speciesLabel: "Tier", statusLabel: "Status", all: "Alle", dogs: "Hunde", cats: "Katzen", available: "Sucht ein Zuhause", adopted: "Adoptiert",
    count: "{count} Tiere", empty: "Für diese Filter gibt es keine Tiere. Wähle eine andere Kombination.",
    adoptionLink: "So funktioniert Adoption",
    paginationLabel: "Seiten der Tiergalerie", pageOf: "Seite {page} von {pages}", pageLabel: "Zu Seite {page}", previousPage: "Zurück", nextPage: "Weiter",
  },
  ar: {
    title: "تعرّف على الحيوانات", description: "تعرّف على الكلاب والقطط التي نعتني بها، وشاركنا فرحة من وجد منها بيتًا.",
    speciesLabel: "الحيوان", statusLabel: "الحالة", all: "الكل", dogs: "الكلاب", cats: "القطط", available: "يبحث عن بيت", adopted: "تم تبنّيها",
    count: "عدد الحيوانات: {count}", empty: "لا توجد حيوانات تطابق هذين الخيارين. جرّب اختيارًا آخر.",
    adoptionLink: "كيف يتم التبنّي؟",
    paginationLabel: "صفحات معرض الحيوانات", pageOf: "الصفحة {page} من {pages}", pageLabel: "انتقل إلى الصفحة {page}", previousPage: "السابق", nextPage: "التالي",
  },
};
