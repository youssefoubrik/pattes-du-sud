import type { Locale } from "@/i18n/routing";

type HomeMessages = {
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
    meetTeam: string;
    imageCaption: string;
    medical: { title: string; description: string };
    foodShelter: { title: string; description: string };
    adoption: { title: string; description: string };
    education: { title: string; description: string };
  };
};

export const homeMessages: Record<Locale, HomeMessages> = {
  en: {
    title: "Care and hope for Mirleft’s street animals.",
    description: "We feed, treat and sterilize street dogs and cats in Mirleft. With your help, we can give more animals the care they need.",
    meetAnimals: "Meet our furry friends",
    imageAlt: "A street dog resting beside a whitewashed wall.",
    animalGreeting: "Salam, I’m {name}",
    animalWelcome: "I’m happy you’re here.",
    whatWeDo: {
      title: "What we do",
      imageAlt: "A person feeding a dog by hand outdoors.",
      meetTeam: "Meet the people behind the care",
      imageCaption: "A little food. A little care. A better day.",
      description: "From a meal to medical care, we help street animals live healthier lives.",
      medical: { title: "Health & care", description: "Treatment, vaccinations, sterilization, and follow-up." },
      foodShelter: { title: "Food & shelter", description: "Food, clean water, and a safe place." },
      adoption: { title: "Adoption", description: "We help animals find caring homes." },
      education: { title: "Awareness", description: "We help people understand and protect animals." },
    },
  },
  fr: {
    title: "Des soins et de l’espoir pour les animaux de Mirleft.",
    description: "Nous nourrissons, soignons et stérilisons les chiens et chats des rues de Mirleft. Avec votre aide, nous pouvons prendre soin de davantage d’animaux.",
    meetAnimals: "Rencontrer nos compagnons",
    imageAlt: "Un chien des rues se repose près d’un mur blanchi à la chaux.",
    animalGreeting: "Salam, moi c’est {name}",
    animalWelcome: "Ça me fait plaisir de te voir ici.",
    whatWeDo: {
      title: "Nos actions",
      imageAlt: "Une personne nourrit un chien à la main en extérieur.",
      meetTeam: "Rencontrer ceux qui prennent soin d’eux",
      imageCaption: "Un peu de nourriture. Un peu de soin. Une journée plus douce.",
      description: "De la nourriture aux soins, nous aidons les animaux des rues à vivre en meilleure santé.",
      medical: { title: "Santé et soins", description: "Traitements, vaccinations, stérilisation et suivi." },
      foodShelter: { title: "Nourriture et abri", description: "De la nourriture, de l’eau propre et un abri sûr." },
      adoption: { title: "Adoption", description: "Nous aidons les animaux à trouver un foyer aimant." },
      education: { title: "Sensibilisation", description: "Nous aidons chacun à comprendre et protéger les animaux." },
    },
  },
  de: {
    title: "Fürsorge und Hoffnung für Mirlefts Straßentiere.",
    description: "Wir füttern, behandeln und kastrieren Straßenhunde und Straßenkatzen in Mirleft. Mit deiner Hilfe können wir noch mehr Tieren die nötige Versorgung geben.",
    meetAnimals: "Lerne unsere Fellfreunde kennen",
    imageAlt: "Ein Straßenhund ruht neben einer weiß getünchten Mauer.",
    animalGreeting: "Salam, ich bin {name}",
    animalWelcome: "Schön, dass du hier bist.",
    whatWeDo: {
      title: "Was wir tun",
      imageAlt: "Eine Person füttert einen Hund draußen aus der Hand.",
      meetTeam: "Lerne die Menschen kennen, die helfen",
      imageCaption: "Etwas Futter. Etwas Fürsorge. Ein besserer Tag.",
      description: "Von Futter bis zur medizinischen Versorgung: Wir helfen Straßentieren, gesünder zu leben.",
      medical: { title: "Gesundheit & Pflege", description: "Behandlung, Impfungen, Kastration und Nachsorge." },
      foodShelter: { title: "Futter & Schutz", description: "Futter, sauberes Wasser und ein sicherer Unterschlupf." },
      adoption: { title: "Adoption", description: "Wir vermitteln Tieren ein liebevolles Zuhause." },
      education: { title: "Aufklärung", description: "Wir helfen Menschen, Tiere zu verstehen und zu schützen." },
    },
  },
  ar: {
    title: "رعاية وأمل لحيوانات الشوارع في ميرلفت.",
    description: "نوفر الغذاء والعلاج والتعقيم لكلاب وقطط الشوارع في ميرلفت. بمساعدتكم، نستطيع تقديم الرعاية لمزيد من الحيوانات.",
    meetAnimals: "تعرّف على أصدقائنا الصغار",
    imageAlt: "كلب من كلاب الشوارع يستريح بجانب جدار مطلي باللون الأبيض.",
    animalGreeting: "سلام، أنا {name}",
    animalWelcome: "سعيدة بوجودك هنا.",
    whatWeDo: {
      title: "ماذا نفعل؟",
      imageAlt: "شخص يطعم كلبًا من يده في الخارج.",
      meetTeam: "تعرّف على من يرعاهم",
      imageCaption: "قليل من الطعام. قليل من الرعاية. يوم أفضل.",
      description: "من الغذاء إلى العلاج، نساعد حيوانات الشوارع على العيش بصحة أفضل.",
      medical: { title: "الصحة والرعاية", description: "العلاج والتطعيم والتعقيم والمتابعة." },
      foodShelter: { title: "الغذاء والمأوى", description: "غذاء وماء نظيف ومأوى آمن." },
      adoption: { title: "التبنّي", description: "نساعد الحيوانات على إيجاد بيوت ترعاها." },
      education: { title: "التوعية", description: "نساعد الناس على فهم الحيوانات وحمايتها." },
    },
  },
};
