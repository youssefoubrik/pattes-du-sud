import type { Locale } from "@/i18n/routing";

type FooterMessages = {
  mission: string;
  registration: string;
  explore: string;
  findUs: string;
  contact: string;
  whatsapp: string;
  email: string;
  privacy: string;
};

export const footerMessages: Record<Locale, FooterMessages> = {
  en: {
    mission: "Care and hope for Mirleft’s street dogs and cats.",
    registration: "Registration reference",
    explore: "Explore",
    findUs: "Find us",
    contact: "Stay in touch",
    whatsapp: "Contact us on WhatsApp",
    email: "Email us",
    privacy: "Privacy",
  },
  fr: {
    mission: "Des soins et de l’espoir pour les chiens et chats des rues de Mirleft.",
    registration: "Référence d’enregistrement",
    explore: "Découvrir",
    findUs: "Retrouvez-nous",
    contact: "Restons en contact",
    whatsapp: "Contactez-nous sur WhatsApp",
    email: "Écrivez-nous",
    privacy: "Confidentialité",
  },
  de: {
    mission: "Fürsorge und Hoffnung für Mirlefts Straßenhunde und Straßenkatzen.",
    registration: "Registrierungsnummer",
    explore: "Entdecken",
    findUs: "Folge uns",
    contact: "In Kontakt bleiben",
    whatsapp: "Kontakt über WhatsApp",
    email: "E-Mail schreiben",
    privacy: "Datenschutz",
  },
  ar: {
    mission: "رعاية وأمل لكلاب وقطط الشوارع في ميرلفت.",
    registration: "مرجع تسجيل الجمعية",
    explore: "اكتشف المزيد",
    findUs: "تابعنا",
    contact: "ابقَ على تواصل",
    whatsapp: "تواصل معنا عبر واتساب",
    email: "راسلنا عبر البريد الإلكتروني",
    privacy: "الخصوصية",
  },
};
