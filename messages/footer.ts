import type { Locale } from "@/i18n/routing";

type FooterMessages = {
  mission: string;
  registration: string;
  explore: string;
  adopt: string;
  findUs: string;
  contact: string;
  whatsapp: string;
  email: string;
  legal: string;
  privacy: string;
  legalNavigation: string;
};

export const footerMessages: Record<Locale, FooterMessages> = {
  en: {
    mission: "Care and hope for Mirleft’s street dogs and cats.",
    registration: "Registration reference",
    explore: "Explore",
    adopt: "How to adopt",
    findUs: "Find us",
    contact: "Stay in touch",
    whatsapp: "Contact us on WhatsApp",
    email: "Email us",
    legal: "Legal information",
    privacy: "Privacy",
    legalNavigation: "Legal links",
  },
  fr: {
    mission: "Des soins et de l’espoir pour les chiens et chats des rues de Mirleft.",
    registration: "Référence d’enregistrement",
    explore: "Découvrir",
    adopt: "Comment adopter",
    findUs: "Retrouvez-nous",
    contact: "Restons en contact",
    whatsapp: "Contactez-nous sur WhatsApp",
    email: "Écrivez-nous",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    legalNavigation: "Liens juridiques",
  },
  de: {
    mission: "Fürsorge und Hoffnung für Mirlefts Straßenhunde und Straßenkatzen.",
    registration: "Registrierungsnummer",
    explore: "Entdecken",
    adopt: "So funktioniert die Adoption",
    findUs: "Folge uns",
    contact: "In Kontakt bleiben",
    whatsapp: "Kontakt über WhatsApp",
    email: "E-Mail schreiben",
    legal: "Rechtliche Informationen",
    privacy: "Datenschutz",
    legalNavigation: "Rechtliche Links",
  },
  ar: {
    mission: "رعاية وأمل لكلاب وقطط الشوارع في ميرلفت.",
    registration: "مرجع تسجيل الجمعية",
    explore: "اكتشف المزيد",
    adopt: "كيف تتبنّى حيوانًا",
    findUs: "تابعنا",
    contact: "ابقَ على تواصل",
    whatsapp: "تواصل معنا عبر واتساب",
    email: "راسلنا عبر البريد الإلكتروني",
    legal: "المعلومات القانونية",
    privacy: "الخصوصية",
    legalNavigation: "روابط قانونية",
  },
};
