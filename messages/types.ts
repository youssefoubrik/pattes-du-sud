import type { Animal } from "@/content/animals";

export type HomeMessages = {
  title: string;
  description: string;
  meetAnimals: string;
  imageAlt: string;
  animalGreeting: string;
  animalWelcome: string;
  whatWeDo: {
    title: string;
    description: string;
    imageAlt: string;
    veterinaryImageAlt: string;
    companionshipImageAlt: string;
    imageCaption: string;
    medical: { title: string; description: string };
    foodShelter: { title: string; description: string };
    adoption: { title: string; description: string };
    education: { title: string; description: string };
  };
  team: {
    title: string;
    description: string;
    imageAlt: string;
    imageCaption: string;
    volunteerCta: string;
    meetTeam: string;
    animalsHelped: string;
    adoptions: string;
  };
  howToHelp: {
    title: string;
    description: string;
    donate: { title: string; description: string; cta: string };
    volunteer: { title: string; description: string; cta: string };
  };
  location: {
    place: string;
    title: string;
    description: string;
    visitNote: string;
    mapTitle: string;
  };
  supporters: { title: string; description: string };
};

export type AboutMessages = {
  title: string;
  description: string;
  introduction: string;
  purpose: string;
  imageAlt: string;
  imageCaption: string;
  care: {
    title: string;
    introduction: string;
    steps: { title: string; description: string }[];
  };
  team: { title: string; introduction: string; volunteer: string };
  association: {
    place: string;
    title: string;
    officialName: string;
    areaLabel: string;
    area: string;
    visitNote: string;
    contact: string;
  };
  closingInvitation: string;
};

export type AdoptMessages = {
  title: string;
  intro: string;
  steps: [string, string, string];
  localTitle: string;
  internationalTitle: string;
  local: string;
  international: string;
  contact: string;
};

export type VolunteerMessages = {
  title: string;
  intro: string;
  ways: [string, string, string];
  wayTitles: [string, string, string];
  actionImagesTitle: string;
  actionImageCaptions: [string, string, string];
  actionImageAlts: [string, string, string];
  visitTitle: string;
  visit: string;
  visitSteps: [string, string];
  arrangeVisit: string;
};

export type ContactMessages = {
  title: string;
  intro: string;
  whatsapp: string;
  whatsappText: string;
  whatsappOpens: string;
  email: string;
  emailOpens: string;
  unavailable: string;
  responseTime: string;
  responseTimeUnit: string;
  hoursStart: string;
  hoursBetween: string;
  openingTime: string;
  closingTime: string;
};

export type DonateMessages = {
  title: string;
  intro: string;
  impactExamplesTitle: string;
  impactExamples: { amount: string; impact: string }[];
  amount: string;
  frequency: string;
  securePayment: string;
  onceDescription: string;
  monthlyDescription: string;
  once: string;
  monthly: string;
  monthlyBadge: string;
  onceCta: string;
  monthlyCta: string;
  transfer: string;
  transferNote: string;
  bankName: string;
  iban: string;
  rib: string;
  swift: string;
  unavailable: string;
  copy: string;
  copied: string;
};

export type ThankYouMessages = { title: string; intro: string; share: string; home: string };

export type MirleftMessages = {
  title: string;
  intro: string;
  donate: string;
  animals: string;
  contact: string;
};

export type PrivacyMessages = {
  title: string;
  intro: string;
  data: string;
  payments: string;
  contact: string;
};

export type CompanionProfileMessages = {
  story: string;
  facts: string;
  age: string;
  sex: string;
  female: string;
  male: string;
  vaccinated: string;
  sterilized: string;
  vaccinatedYes: string;
  vaccinatedNo: string;
  sterilizedYes: string;
  sterilizedNo: string;
  adopt: string;
  help: string;
  share: string;
  shareFallback: string;
  back: string;
};

export type PageMessages = {
  adopt: AdoptMessages;
  volunteer: VolunteerMessages;
  contact: ContactMessages;
  donate: DonateMessages;
  thanks: ThankYouMessages;
  mirleft: MirleftMessages;
  privacy: PrivacyMessages;
  animal: CompanionProfileMessages;
};

export type FooterMessages = {
  mission: string;
  registration: string;
  explore: string;
  findUs: string;
  contact: string;
  whatsapp: string;
  email: string;
  privacy: string;
};

export type AnimalMessages = {
  title: string;
  description: string;
  adoptionMessage: string;
  age: string;
  ageUnknown: string;
  getToKnow: string;
  meetAll: string;
  photosLabel: string;
  photoLabel: string;
  viewPhoto: string;
  previousPhoto: string;
  nextPhoto: string;
  closePhotoViewer: string;
  species: Record<Animal["species"], string>;
  status: Record<Animal["status"], string>;
  personality: Record<NonNullable<Animal["personality"]>, string>;
};

export type GalleryMessages = {
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
