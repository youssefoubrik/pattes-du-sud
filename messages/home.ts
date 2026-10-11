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
    quote: string;
    quoteAttribution: string;
    volunteerCta: string;
    meetTeam: string;
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
      veterinaryImageAlt: "A veterinarian checking a white kitten with a stethoscope.",
      companionshipImageAlt: "A person gently petting a tabby cat outdoors.",
      imageCaption: "A meal. A check-up. A moment of comfort.",
      description: "From a meal to medical care, we help street animals live healthier lives.",
      medical: { title: "Health & care", description: "Treatment, vaccinations, sterilization, and follow-up." },
      foodShelter: { title: "Food & shelter", description: "Food, clean water, and a safe place." },
      adoption: { title: "Adoption", description: "We help animals find caring homes." },
      education: { title: "Awareness", description: "We help people understand and protect animals." },
    },
    team: {
      title: "The people behind the care",
      description: "Meet the Mirleft team feeding street animals, arranging care and helping them find homes.",
      imageAlt: "A person gently holding a small black-and-white puppy.",
      imageCaption: "Care for Mirleft’s street animals starts with people who show up.",
      // Draft wording and attribution: replace with Ali's approved words before publication.
      quote: "I come back because they count on us.",
      quoteAttribution: "Ali · Team member",
      volunteerCta: "Volunteer with us",
      meetTeam: "Get to know our team",
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
      veterinaryImageAlt: "Une vétérinaire examine un chaton blanc avec un stéthoscope.",
      companionshipImageAlt: "Une personne caresse doucement un chat tigré dehors.",
      imageCaption: "Un repas. Un examen. Un moment de réconfort.",
      description: "De la nourriture aux soins, nous aidons les animaux des rues à vivre en meilleure santé.",
      medical: { title: "Santé et soins", description: "Traitements, vaccinations, stérilisation et suivi." },
      foodShelter: { title: "Nourriture et abri", description: "De la nourriture, de l’eau propre et un abri sûr." },
      adoption: { title: "Adoption", description: "Nous aidons les animaux à trouver un foyer aimant." },
      education: { title: "Sensibilisation", description: "Nous aidons chacun à comprendre et protéger les animaux." },
    },
    team: {
      title: "Celles et ceux qui prennent soin d’eux",
      description: "Rencontrez l’équipe de Mirleft qui nourrit les animaux des rues, organise leurs soins et les aide à trouver un foyer.",
      imageAlt: "Une personne tient doucement un petit chiot noir et blanc.",
      imageCaption: "À Mirleft, la protection des animaux commence avec des personnes présentes sur le terrain.",
      quote: "Je reviens parce qu’ils comptent sur nous.",
      quoteAttribution: "Ali · Membre de l’équipe",
      volunteerCta: "Devenir bénévole",
      meetTeam: "Découvrir notre équipe",
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
      veterinaryImageAlt: "Eine Tierärztin untersucht ein weißes Kätzchen mit einem Stethoskop.",
      companionshipImageAlt: "Eine Person streichelt draußen behutsam eine getigerte Katze.",
      imageCaption: "Eine Mahlzeit. Eine Untersuchung. Ein Moment der Geborgenheit.",
      description: "Von Futter bis zur medizinischen Versorgung: Wir helfen Straßentieren, gesünder zu leben.",
      medical: { title: "Gesundheit & Pflege", description: "Behandlung, Impfungen, Kastration und Nachsorge." },
      foodShelter: { title: "Futter & Schutz", description: "Futter, sauberes Wasser und ein sicherer Unterschlupf." },
      adoption: { title: "Adoption", description: "Wir vermitteln Tieren ein liebevolles Zuhause." },
      education: { title: "Aufklärung", description: "Wir helfen Menschen, Tiere zu verstehen und zu schützen." },
    },
    team: {
      title: "Menschen, die sich kümmern",
      description: "Lerne das Team in Mirleft kennen, das Straßentiere füttert, ihre Versorgung organisiert und ein Zuhause für sie sucht.",
      imageAlt: "Eine Person hält einen kleinen schwarz-weißen Welpen behutsam im Arm.",
      imageCaption: "Fürsorge für Mirlefts Straßentiere beginnt mit Menschen, die vor Ort helfen.",
      quote: "Ich komme wieder, weil sie auf uns zählen.",
      quoteAttribution: "Ali · Teammitglied",
      volunteerCta: "Hilf ehrenamtlich mit",
      meetTeam: "Lerne unser Team kennen",
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
      veterinaryImageAlt: "طبيبة بيطرية تفحص هريرة بيضاء بسماعة طبية.",
      companionshipImageAlt: "شخص يربّت برفق على قطة مخططة في الخارج.",
      imageCaption: "وجبة، وفحص بيطري، ولحظة حنان.",
      description: "من الغذاء إلى العلاج، نساعد حيوانات الشوارع على العيش بصحة أفضل.",
      medical: { title: "الصحة والرعاية", description: "العلاج والتطعيم والتعقيم والمتابعة." },
      foodShelter: { title: "الغذاء والمأوى", description: "غذاء وماء نظيف ومأوى آمن." },
      adoption: { title: "التبنّي", description: "نساعد الحيوانات على إيجاد بيوت ترعاها." },
      education: { title: "التوعية", description: "نساعد الناس على فهم الحيوانات وحمايتها." },
    },
    team: {
      title: "الفريق الذي يعتني بهم",
      description: "تعرّف على فريق ميرلفت الذي يطعم حيوانات الشوارع، وينظّم علاجها، ويساعدها في العثور على بيت.",
      imageAlt: "شخص يحمل برفق جرواً صغيراً باللونين الأبيض والأسود.",
      imageCaption: "تبدأ رعاية حيوانات الشوارع في ميرلفت بأشخاص يمدّون لها يد العون.",
      quote: "أعود لأن هذه الحيوانات تعتمد علينا.",
      quoteAttribution: "علي · عضو في الفريق",
      volunteerCta: "تطوّع معنا",
      meetTeam: "تعرّف على فريقنا",
    },
  },
};
