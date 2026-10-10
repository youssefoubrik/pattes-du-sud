import type { Locale } from "@/i18n/routing";

type HomeMessages = {
  title: string;
  description: string;
  meetAnimals: string;
  imageAlt: string;
};

export const homeMessages: Record<Locale, HomeMessages> = {
  en: {
    title: "Care and hope for Mirleft’s street animals.",
    description: "We feed, treat and sterilize street dogs and cats in Mirleft. With your help, we can give more animals the care they need.",
    meetAnimals: "Meet the animals",
    imageAlt: "A street dog resting beside a whitewashed wall.",
  },
  fr: {
    title: "Des soins et de l’espoir pour les animaux de Mirleft.",
    description: "Nous nourrissons, soignons et stérilisons les chiens et chats des rues de Mirleft. Avec votre aide, nous pouvons prendre soin de davantage d’animaux.",
    meetAnimals: "Rencontrer les animaux",
    imageAlt: "Un chien des rues se repose près d’un mur blanchi à la chaux.",
  },
  de: {
    title: "Fürsorge und Hoffnung für Mirlefts Straßentiere.",
    description: "Wir füttern, behandeln und kastrieren Straßenhunde und Straßenkatzen in Mirleft. Mit deiner Hilfe können wir noch mehr Tieren die nötige Versorgung geben.",
    meetAnimals: "Lerne die Tiere kennen",
    imageAlt: "Ein Straßenhund ruht neben einer weiß getünchten Mauer.",
  },
  ar: {
    title: "رعاية وأمل لحيوانات الشوارع في ميرلفت.",
    description: "نوفر الغذاء والعلاج والتعقيم لكلاب وقطط الشوارع في ميرلفت. بمساعدتكم، نستطيع تقديم الرعاية لمزيد من الحيوانات.",
    meetAnimals: "تعرّف على حيواناتنا",
    imageAlt: "كلب من كلاب الشوارع يستريح بجانب جدار مطلي باللون الأبيض.",
  },
};
