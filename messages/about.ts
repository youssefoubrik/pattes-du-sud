import type { Locale } from "@/i18n/routing";

type AboutMessages = {
  title: string;
  description: string;
  eyebrow: string;
  introduction: string;
  purpose: string;
  imageAlt: string;
  imageCaption: string;
};

export const aboutMessages: Record<Locale, AboutMessages> = {
  en: {
    title: "About Pattes du Sud",
    description: "Get to know Pattes du Sud, an animal-protection association caring for street dogs and cats in Mirleft, Morocco.",
    eyebrow: "Mirleft, Morocco",
    introduction: "Pattes du Sud is an animal-protection association based in Mirleft, Morocco. We care for the dogs and cats who live on its streets.",
    purpose: "Our work brings together food, veterinary care and sterilization, with the hope of giving more animals a safer, healthier life.",
    imageAlt: "A person gently holding a small black-and-white puppy.",
    imageCaption: "Care for animals starts with people who show up.",
  },
  fr: {
    title: "À propos de Pattes du Sud",
    description: "Découvrez Pattes du Sud, une association de protection animale qui prend soin des chiens et des chats des rues de Mirleft, au Maroc.",
    eyebrow: "Mirleft, Maroc",
    introduction: "Pattes du Sud est une association de protection animale basée à Mirleft, au Maroc. Nous prenons soin des chiens et des chats qui vivent dans ses rues.",
    purpose: "Notre action réunit alimentation, soins vétérinaires et stérilisation, pour aider davantage d’animaux à vivre en meilleure santé et en sécurité.",
    imageAlt: "Une personne tient doucement un petit chiot noir et blanc.",
    imageCaption: "Prendre soin des animaux commence avec des personnes présentes sur le terrain.",
  },
  de: {
    title: "Über Pattes du Sud",
    description: "Lerne Pattes du Sud kennen, einen Tierschutzverein für Straßenhunde und Straßenkatzen in Mirleft, Marokko.",
    eyebrow: "Mirleft, Marokko",
    introduction: "Pattes du Sud ist ein Tierschutzverein in Mirleft, Marokko. Wir kümmern uns um die Hunde und Katzen, die auf den Straßen des Ortes leben.",
    purpose: "Unsere Arbeit umfasst Futter, tierärztliche Versorgung und Kastration. So möchten wir mehr Tieren ein sichereres und gesünderes Leben ermöglichen.",
    imageAlt: "Eine Person hält einen kleinen schwarz-weißen Welpen behutsam im Arm.",
    imageCaption: "Tierfürsorge beginnt mit Menschen, die vor Ort helfen.",
  },
  ar: {
    title: "تعرّف على بات دو سود",
    description: "تعرّف على جمعية بات دو سود لرعاية الكلاب والقطط التي تعيش في شوارع ميرلفت بالمغرب.",
    eyebrow: "ميرلفت، المغرب",
    introduction: "بات دو سود جمعية لحماية الحيوانات في ميرلفت بالمغرب. نهتم بالكلاب والقطط التي تعيش في شوارع البلدة.",
    purpose: "يشمل عملنا توفير الطعام والرعاية البيطرية والتعقيم، حتى تحظى حيوانات أكثر بحياة أكثر أمانًا وصحة.",
    imageAlt: "شخص يحمل جرواً صغيراً أبيض وأسود برفق.",
    imageCaption: "تبدأ رعاية الحيوانات بأشخاص يمدّون لها يد العون.",
  },
};
