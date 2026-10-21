import type { Locale } from "@/i18n/routing";

type GalleryMessages = {
  title: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  speciesLabel: string;
  statusLabel: string;
  all: string;
  dogs: string;
  cats: string;
  available: string;
  adopted: string;
  count: string;
  loading: string;
  empty: string;
  emptyCollection: string;
  adoptionPrompt: string;
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
    searchLabel: "Search companions by name", searchPlaceholder: "Search by name",
    speciesLabel: "Companion type", statusLabel: "Status", all: "All", dogs: "Dogs", cats: "Cats", available: "Looking for a home", adopted: "Adopted",
    count: "{count} companions", loading: "Loading companions…", empty: "No companions match your search and filters. Try another selection.",
    emptyCollection: "No companions are listed at the moment.",
    adoptionPrompt: "Want to adopt?",
    adoptionLink: "See how it works",
    paginationLabel: "Companion gallery pages", pageOf: "Page {page} of {pages}", pageLabel: "Go to page {page}", previousPage: "Previous", nextPage: "Next",
  },
  fr: {
    title: "Trouvez votre compagnon", description: "Découvrez les chiens et les chats dont nous prenons soin, ainsi que ceux qui ont trouvé un foyer.",
    searchLabel: "Rechercher un compagnon par nom", searchPlaceholder: "Rechercher par nom",
    speciesLabel: "Type", statusLabel: "Situation", all: "Tous", dogs: "Chiens", cats: "Chats", available: "Cherche un foyer", adopted: "Adoptés",
    count: "{count} compagnons", loading: "Chargement des compagnons…", empty: "Aucun compagnon ne correspond à votre recherche et à ces filtres. Essayez une autre sélection.",
    emptyCollection: "Aucun compagnon n’est actuellement présenté.",
    adoptionPrompt: "Envie d’adopter ?",
    adoptionLink: "Voir comment ça marche",
    paginationLabel: "Pages de la galerie des compagnons", pageOf: "Page {page} sur {pages}", pageLabel: "Aller à la page {page}", previousPage: "Précédent", nextPage: "Suivant",
  },
  de: {
    title: "Finde deinen Begleiter", description: "Entdecke die Hunde und Katzen in unserer Obhut und freue dich mit denen, die ein Zuhause gefunden haben.",
    searchLabel: "Begleiter nach Namen suchen", searchPlaceholder: "Nach Namen suchen",
    speciesLabel: "Art", statusLabel: "Status", all: "Alle", dogs: "Hunde", cats: "Katzen", available: "Sucht ein Zuhause", adopted: "Adoptiert",
    count: "{count} Begleiter", loading: "Begleiter werden geladen…", empty: "Für diese Suche und Filter gibt es keine Begleiter. Wähle eine andere Kombination.",
    emptyCollection: "Zurzeit sind keine Begleiter gelistet.",
    adoptionPrompt: "Möchtest du adoptieren?",
    adoptionLink: "So geht’s",
    paginationLabel: "Seiten der Begleitergalerie", pageOf: "Seite {page} von {pages}", pageLabel: "Zu Seite {page}", previousPage: "Zurück", nextPage: "Weiter",
  },
  ar: {
    title: "اعثر على رفيقك", description: "تعرّف على الكلاب والقطط التي نعتني بها، وشاركنا فرحة من وجد منها بيتًا.",
    searchLabel: "ابحث عن رفيق بالاسم", searchPlaceholder: "ابحث بالاسم",
    speciesLabel: "النوع", statusLabel: "الحالة", all: "الكل", dogs: "الكلاب", cats: "القطط", available: "يبحث عن بيت", adopted: "تم تبنّيها",
    count: "عدد الرفاق: {count}", loading: "جارٍ تحميل الرفاق…", empty: "لا يوجد رفاق يطابقون بحثك والفلاتر المحددة. جرّب تغييرها.",
    emptyCollection: "لا يوجد رفاق معروضون حاليًا.",
    adoptionPrompt: "هل ترغب في التبنّي؟",
    adoptionLink: "تعرّف على الطريقة",
    paginationLabel: "صفحات معرض الرفاق", pageOf: "الصفحة {page} من {pages}", pageLabel: "انتقل إلى الصفحة {page}", previousPage: "السابق", nextPage: "التالي",
  },
};
