import type { Locale } from "@/i18n/routing";

type FooterMessages = {
  mission: string;
  location: string;
  registration: string;
  toConfirm: string;
  explore: string;
  adopt: string;
  findUs: string;
  contact: string;
  whatsapp: string;
  email: string;
  sampleDetails: string;
  legal: string;
  privacy: string;
  legalNavigation: string;
};

export const footerMessages: Record<Locale, FooterMessages> = {
  en: {
    mission: "Care and hope for Mirleft’s street dogs and cats.",
    location: "Mirleft, Morocco",
    registration: "Registration reference",
    toConfirm: "To confirm",
    explore: "Explore",
    adopt: "How to adopt",
    findUs: "Find us",
    contact: "Stay in touch",
    whatsapp: "Contact us on WhatsApp",
    email: "Email us",
    sampleDetails: "Sample contact details",
    legal: "Legal information",
    privacy: "Privacy",
    legalNavigation: "Legal links",
  },
  fr: {
    mission: "Des soins et de l’espoir pour les chiens et chats des rues de Mirleft.",
    location: "Mirleft, Maroc",
    registration: "Référence d’enregistrement",
    toConfirm: "À confirmer",
    explore: "Découvrir",
    adopt: "Comment adopter",
    findUs: "Retrouvez-nous",
    contact: "Restons en contact",
    whatsapp: "Contactez-nous sur WhatsApp",
    email: "Écrivez-nous",
    sampleDetails: "Coordonnées d’exemple",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    legalNavigation: "Liens juridiques",
  },
  de: {
    mission: "Fürsorge und Hoffnung für Mirlefts Straßenhunde und Straßenkatzen.",
    location: "Mirleft, Marokko",
    registration: "Registrierungsnummer",
    toConfirm: "Noch zu bestätigen",
    explore: "Entdecken",
    adopt: "So funktioniert die Adoption",
    findUs: "Folge uns",
    contact: "In Kontakt bleiben",
    whatsapp: "Kontakt über WhatsApp",
    email: "E-Mail schreiben",
    sampleDetails: "Beispiel-Kontaktdaten",
    legal: "Rechtliche Informationen",
    privacy: "Datenschutz",
    legalNavigation: "Rechtliche Links",
  },
  ar: {
    mission: "رعاية وأمل لكلاب وقطط الشوارع في ميرلفت.",
    location: "ميرلفت، المغرب",
    registration: "مرجع تسجيل الجمعية",
    toConfirm: "في انتظار التأكيد",
    explore: "اكتشف المزيد",
    adopt: "كيف تتبنّى حيوانًا",
    findUs: "تابعنا",
    contact: "ابقَ على تواصل",
    whatsapp: "تواصل معنا عبر واتساب",
    email: "راسلنا عبر البريد الإلكتروني",
    sampleDetails: "بيانات تواصل تجريبية",
    legal: "المعلومات القانونية",
    privacy: "الخصوصية",
    legalNavigation: "روابط قانونية",
  },
};
