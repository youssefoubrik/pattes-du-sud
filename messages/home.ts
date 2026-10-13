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
    otherHelp: string;
    contactCta: string;
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

export const homeMessages: Record<Locale, HomeMessages> = {
  en: {
    title: "Care and hope for Mirleft’s street dogs and cats.",
    description: "We feed, treat and sterilize street dogs and cats in Mirleft. With your help, more can receive the care they need.",
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
      description: "From a meal to medical care, we help Mirleft’s street dogs and cats live healthier lives.",
      medical: { title: "Health & care", description: "Treatment, vaccinations, sterilization, and follow-up." },
      foodShelter: { title: "Food & shelter", description: "Food, clean water, and a safe place." },
      adoption: { title: "Adoption", description: "We help dogs and cats find caring homes." },
      education: { title: "Awareness", description: "We help people understand the needs of dogs and cats and care for them." },
    },
    team: {
      title: "The people behind the care",
      description: "Meet the Mirleft team feeding street dogs and cats, arranging care and helping them find homes.",
      imageAlt: "A person gently holding a small black-and-white puppy.",
      imageCaption: "Care for Mirleft’s street dogs and cats starts with people who show up.",
      volunteerCta: "Volunteer with us",
      meetTeam: "Get to know our team",
      animalsHelped: "Dogs and cats helped", adoptions: "Adoptions",
    },
    howToHelp: {
      title: "How you can help",
      description: "A little help can mean a meal, medical care, or a safer day for a dog or cat in Mirleft.",
      donate: {
        title: "Give care from anywhere",
        description: "Your gift helps provide food, veterinary treatment, and everyday care for Mirleft’s street dogs and cats.",
        cta: "Donate to their care",
      },
      volunteer: {
        title: "Give your time in Mirleft",
        description: "Visiting Mirleft? Arrange a visit with our team and find out how you can help in person.",
        cta: "Explore volunteering",
      },
      otherHelp: "Want to bring supplies or help in another way?",
      contactCta: "Contact our team",
    },
    location: {
      place: "Mirleft, Morocco",
      title: "Find us in Mirleft",
      description: "We care for street dogs and cats in and around Mirleft. Explore the town where our work happens.",
      visitNote: "Please arrange a visit with our team before coming by.",
      mapTitle: "Map of Mirleft, Morocco",
    },
    supporters: {
      title: "The organisations that support us",
      description: "Every partnership helps bring food, treatment and safety to Mirleft’s street dogs and cats.",
    },
  },
  fr: {
    title: "Des soins et de l’espoir pour les chiens et chats des rues de Mirleft.",
    description: "Nous nourrissons, soignons et stérilisons les chiens et chats des rues de Mirleft. Avec votre aide, nous pouvons en soigner davantage.",
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
      description: "De la nourriture aux soins, nous aidons les chiens et chats des rues de Mirleft à vivre en meilleure santé.",
      medical: { title: "Santé et soins", description: "Traitements, vaccinations, stérilisation et suivi." },
      foodShelter: { title: "Nourriture et abri", description: "De la nourriture, de l’eau propre et un abri sûr." },
      adoption: { title: "Adoption", description: "Nous aidons les chiens et chats à trouver un foyer aimant." },
      education: { title: "Sensibilisation", description: "Nous sensibilisons au respect et aux besoins des chiens et des chats." },
    },
    team: {
      title: "Celles et ceux qui prennent soin d’eux",
      description: "Rencontrez l’équipe de Mirleft qui nourrit les chiens et chats des rues, organise leurs soins et les aide à trouver un foyer.",
      imageAlt: "Une personne tient doucement un petit chiot noir et blanc.",
      imageCaption: "À Mirleft, les soins aux chiens et chats des rues commencent avec les personnes qui agissent sur le terrain.",
      volunteerCta: "Devenir bénévole",
      meetTeam: "Découvrir notre équipe",
      animalsHelped: "Chiens et chats aidés", adoptions: "Adoptions",
    },
    howToHelp: {
      title: "Comment nous aider",
      description: "Un petit geste peut offrir un repas, des soins ou une journée plus sûre à un chien ou un chat de Mirleft.",
      donate: {
        title: "Aider, où que vous soyez",
        description: "Votre don aide à fournir nourriture, soins vétérinaires et suivi quotidien aux chiens et chats des rues de Mirleft.",
        cta: "Faire un don pour leurs soins",
      },
      volunteer: {
        title: "Donner de son temps à Mirleft",
        description: "De passage à Mirleft ? Organisez une visite avec notre équipe pour découvrir comment aider sur place.",
        cta: "Découvrir le bénévolat",
      },
      otherHelp: "Vous souhaitez apporter du matériel ou aider autrement ?",
      contactCta: "Contactez notre équipe",
    },
    location: {
      place: "Mirleft, Maroc",
      title: "Retrouvez-nous à Mirleft",
      description: "Nous prenons soin des chiens et chats des rues de Mirleft et des environs. Découvrez la ville où nous agissons.",
      visitNote: "Merci de convenir d’une visite avec notre équipe avant de venir.",
      mapTitle: "Carte de Mirleft, Maroc",
    },
    supporters: {
      title: "Les organisations qui nous soutiennent",
      description: "Chaque partenariat aide à offrir nourriture, soins et protection aux chiens et chats des rues de Mirleft.",
    },
  },
  de: {
    title: "Fürsorge und Hoffnung für Mirlefts Straßenhunde und Straßenkatzen.",
    description: "Wir füttern, behandeln und kastrieren Straßenhunde und Straßenkatzen in Mirleft. Mit deiner Hilfe können wir noch mehr von ihnen versorgen.",
    meetAnimals: "Lerne unsere Fellfreunde kennen",
    imageAlt: "Ein Straßenhund ruht neben einer weiß getünchten Mauer.",
    animalGreeting: "Salam, ich bin {name}",
    animalWelcome: "Schön, dass du hier bist.",
    whatWeDo: {
      title: "Was wir tun",
      imageAlt: "Eine Person füttert einen Hund draußen aus der Hand.",
      veterinaryImageAlt: "Eine Veterinärin untersucht ein weißes Kätzchen mit einem Stethoskop.",
      companionshipImageAlt: "Eine Person streichelt draußen behutsam eine getigerte Katze.",
      imageCaption: "Eine Mahlzeit. Eine Untersuchung. Ein Moment der Geborgenheit.",
      description: "Von Futter bis zur medizinischen Versorgung: Wir helfen Straßenhunden und Straßenkatzen, gesünder zu leben.",
      medical: { title: "Gesundheit & Pflege", description: "Behandlung, Impfungen, Kastration und Nachsorge." },
      foodShelter: { title: "Futter & Schutz", description: "Futter, sauberes Wasser und ein sicherer Unterschlupf." },
      adoption: { title: "Adoption", description: "Wir helfen Hunden und Katzen, ein liebevolles Zuhause zu finden." },
      education: { title: "Aufklärung", description: "Wir helfen Menschen, Hunde und Katzen besser zu verstehen und zu schützen." },
    },
    team: {
      title: "Menschen, die sich kümmern",
      description: "Lerne das Team in Mirleft kennen, das Straßenhunde und Straßenkatzen füttert, ihre Versorgung organisiert und ein Zuhause für sie sucht.",
      imageAlt: "Eine Person hält einen kleinen schwarz-weißen Welpen behutsam im Arm.",
      imageCaption: "Fürsorge für Mirlefts Straßenhunde und Straßenkatzen beginnt mit Menschen, die vor Ort helfen.",
      volunteerCta: "Hilf ehrenamtlich mit",
      meetTeam: "Lerne unser Team kennen",
      animalsHelped: "Hunde und Katzen unterstützt", adoptions: "Adoptionen",
    },
    howToHelp: {
      title: "So kannst du helfen",
      description: "Schon ein kleiner Beitrag kann einem Hund oder einer Katze in Mirleft Futter, medizinische Versorgung oder einen sichereren Tag ermöglichen.",
      donate: {
        title: "Von überall aus helfen",
        description: "Deine Spende hilft, Mirlefts Straßenhunde und Straßenkatzen mit Futter, tierärztlicher Behandlung und täglicher Betreuung zu versorgen.",
        cta: "Für ihre Versorgung spenden",
      },
      volunteer: {
        title: "Zeit in Mirleft schenken",
        description: "Du bist in Mirleft? Vereinbare einen Besuch mit unserem Team und erfahre, wie du vor Ort helfen kannst.",
        cta: "Ehrenamt entdecken",
      },
      otherHelp: "Du möchtest Sachspenden mitbringen oder anders helfen?",
      contactCta: "Kontaktiere unser Team",
    },
    location: {
      place: "Mirleft, Marokko",
      title: "Finde uns in Mirleft",
      description: "Wir kümmern uns um Straßenhunde und Straßenkatzen in Mirleft und Umgebung. Entdecke den Ort, an dem wir arbeiten.",
      visitNote: "Bitte vereinbare einen Besuch mit unserem Team, bevor du vorbeikommst.",
      mapTitle: "Karte von Mirleft, Marokko",
    },
    supporters: {
      title: "Organisationen, die uns unterstützen",
      description: "Jede Partnerschaft hilft, Mirlefts Straßenhunden und Straßenkatzen Futter, Behandlung und Schutz zu bieten.",
    },
  },
  ar: {
    title: "رعاية وأمل لكلاب وقطط الشوارع في ميرلفت.",
    description: "نوفر الغذاء والعلاج والتعقيم لكلاب وقطط الشوارع في ميرلفت. بمساعدتكم، نستطيع رعاية المزيد منها.",
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
      description: "من الغذاء إلى العلاج، نساعد كلاب وقطط الشوارع على العيش بصحة أفضل.",
      medical: { title: "الصحة والرعاية", description: "العلاج والتطعيم والتعقيم والمتابعة." },
      foodShelter: { title: "الغذاء والمأوى", description: "غذاء وماء نظيف ومأوى آمن." },
      adoption: { title: "التبنّي", description: "نساعد الكلاب والقطط على إيجاد بيوت ترعاها." },
      education: { title: "التوعية", description: "نساعد الناس على فهم احتياجات الكلاب والقطط وحمايتها." },
    },
    team: {
      title: "الفريق الذي يعتني بهم",
      description: "تعرّف على فريق ميرلفت الذي يطعم كلاب وقطط الشوارع، وينظّم علاجها، ويساعدها في العثور على بيت.",
      imageAlt: "شخص يحمل برفق جرواً صغيراً باللونين الأبيض والأسود.",
      imageCaption: "تبدأ رعاية كلاب وقطط الشوارع في ميرلفت بأشخاص يمدّون لها يد العون.",
      volunteerCta: "تطوّع معنا",
      meetTeam: "تعرّف على فريقنا",
      animalsHelped: "كلاب وقطط ساعدناها", adoptions: "حالات تبنٍّ",
    },
    howToHelp: {
      title: "كيف يمكنك المساعدة؟",
      description: "قد تساهم مساعدة بسيطة في توفير وجبة أو علاج أو يوم أكثر أمانًا لكلب أو قطة في ميرلفت.",
      donate: {
        title: "ساعد من أي مكان",
        description: "يساعد تبرعك في توفير الغذاء والعلاج البيطري والرعاية اليومية لكلاب وقطط الشوارع في ميرلفت.",
        cta: "تبرّع لرعايتها",
      },
      volunteer: {
        title: "تطوّع بوقتك في ميرلفت",
        description: "هل تزور ميرلفت؟ رتّب زيارة مع فريقنا لتعرف كيف يمكنك المساعدة على أرض الواقع.",
        cta: "اكتشف فرص التطوّع",
      },
      otherHelp: "هل ترغب في إحضار مستلزمات أو المساعدة بطريقة أخرى؟",
      contactCta: "تواصل مع فريقنا",
    },
    location: {
      place: "ميرلفت، المغرب",
      title: "تجدنا في ميرلفت",
      description: "نعتني بكلاب وقطط الشوارع في ميرلفت والمناطق المحيطة بها. تعرّف على البلدة التي نعمل فيها.",
      visitNote: "يُرجى ترتيب الزيارة مع فريقنا قبل المجيء.",
      mapTitle: "خريطة ميرلفت، المغرب",
    },
    supporters: {
      title: "المنظمات التي تدعمنا",
      description: "تساعد كل شراكة على توفير الغذاء والعلاج والحماية لكلاب وقطط الشوارع في ميرلفت.",
    },
  },
};
