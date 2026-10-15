import type { Locale } from "@/i18n/routing";

type Copy = {
  adopt: {
    title: string;
    intro: string;
    steps: [string, string, string];
    localTitle: string;
    internationalTitle: string;
    local: string;
    international: string;
    contact: string;
  };
  volunteer: {
    title: string;
    intro: string;
    ways: [string, string, string];
    wayTitles: [string, string, string];
    visit: string;
    arrangeVisit: string;
  };
  contact: {
    title: string;
    intro: string;
    whatsapp: string;
    whatsappText: string;
    whatsappOpens: string;
    email: string;
    emailOpens: string;
    arrange: string;
    unavailable: string;
    responseTime: string;
    hoursTitle: string;
    openingHours: string;
    closingHours: string;
    mapTitle: string;
  };
  donate: {
    title: string;
    intro: string;
    amount: string;
    once: string;
    monthly: string;
    give: string;
    recommended: string;
    monthlyNote: string;
    onceNote: string;
    paypalTrust: string;
    transfer: string;
    transferNote: string;
    unavailable: string;
    impact: string;
    impactText: string;
    transparencyTitle: string;
    dailyCare: string;
    dailyCareText: string;
    veterinaryCare: string;
    veterinaryCareText: string;
    prevention: string;
    preventionText: string;
    copy: string;
    copied: string;
  };
  thanks: { title: string; intro: string; share: string; home: string };
  mirleft: {
    title: string;
    intro: string;
    donate: string;
    animals: string;
    contact: string;
  };
  privacy: {
    title: string;
    intro: string;
    data: string;
    payments: string;
    contact: string;
  };
  legal: {
    title: string;
    intro: string;
    name: string;
    registration: string;
    contact: string;
  };
  animal: {
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
};

export const pageMessages: Record<Locale, Copy> = {
  en: {
    adopt: {
      title: "Adopt a friend",
      intro:
        "Adoption starts with a conversation. We want each animal and family to have the right match and enough time to prepare.",
      steps: [
        "Meet an animal and tell us about your home and daily routine.",
        "We discuss care, costs and the practical steps together.",
        "If it feels right for everyone, we agree on a safe handover and follow-up.",
      ],
      localTitle: "Mirleft & Morocco",
      internationalTitle: "International",
      local:
        "In Morocco, contact us to arrange a meeting in Mirleft. Please do not arrive without arranging a visit.",
      international:
        "Living abroad? Tell us where you live. Travel requirements, timing and transport depend on the destination and the animal, so we will discuss what is possible before making any plans.",
      contact: "Ask about adoption",
    },
    volunteer: {
      title: "Volunteer in Mirleft",
      intro:
        "A little time and practical help can make a real difference for street animals.",
      ways: [
        "Help with feeding and daily care when arranged with the team.",
        "Support transport, supplies or veterinary visits if you can.",
        "Share the animals’ stories and help them find caring homes.",
      ],
      wayTitles: [
        "Feeding & daily care",
        "Transport, supplies & veterinary visits",
        "Share their stories",
      ],
      visit:
        "Please contact us before visiting so we can suggest a useful task and arrange a suitable time.",
      arrangeVisit: "Arrange a volunteer visit",
    },
    contact: {
      title: "Get in touch",
      intro:
        "Questions about an animal, a visit or a donation? Contact the team directly.",
      whatsapp: "Chat on WhatsApp",
      whatsappText: "I want to help Pattes du Sud.",
      whatsappOpens: "Opens WhatsApp",
      email: "Send an email",
      emailOpens: "Opens your email app",
      arrange: "Please arrange visits in advance. We work in Mirleft, Morocco.",
      unavailable:
        "Contact details are being prepared. Please check back soon.",
      responseTime: "We usually reply within {hours} hours.",
      hoursTitle: "Contact hours",
      openingHours: "Opening",
      closingHours: "Closing",
      mapTitle: "Find us in Mirleft",
    },
    donate: {
      title: "Help care continue",
      intro:
        "Your support helps provide food, veterinary care, vaccinations, sterilisation, medicine and a safe place when needed.",
      amount: "Choose a donation option. You can select the amount on PayPal.",
      once: "One-time",
      monthly: "Monthly",
      give: "Continue to PayPal",
      recommended: "Recommended for ongoing care",
      monthlyNote: "Regular gifts help us plan food, veterinary follow-up and prevention over time.",
      onceNote: "A one-time gift helps with the needs that arise today.",
      paypalTrust: "Your payment is handled by PayPal. Choose the amount on PayPal.",
      transfer: "Bank transfer",
      transferNote:
        "You can also set up a recurring transfer with your bank. Include “Donation” as the reference.",
      unavailable: "Online donation details are being prepared.",
      impact: "Where your support goes",
      impactText:
        "The association records income and expenses, keeps supporting documents and tracks veterinary care and the animals it helps.",
      transparencyTitle: "Our commitment to transparency",
      dailyCare: "Daily care",
      dailyCareText: "Food, clean water and care for animals who need a safe place.",
      veterinaryCare: "Veterinary care",
      veterinaryCareText: "Consultations, vaccinations, treatment and medicine for sick or injured animals.",
      prevention: "Prevention and follow-up",
      preventionText: "Sterilisation, identification, monitoring and records that help prevent repeated suffering.",
      copy: "Copy",
      copied: "Copied",
    },
    thanks: {
      title: "Thank you for caring",
      intro:
        "Your support helps animals in Mirleft receive the care they need. A payment is confirmed by the payment provider or your bank.",
      share: "Share our work",
      home: "Back to home",
    },
    mirleft: {
      title: "You may have met our animals",
      intro:
        "Mirleft’s street dogs and cats are part of this place. Help us give them food, medical care and a better future.",
      donate: "Make a donation",
      animals: "Meet the animals",
      contact: "Contact us",
    },
    privacy: {
      title: "Privacy",
      intro:
        "We collect only the information needed to run this website and respond when you contact us.",
      data: "If you email or message us, your contact details and message are used to reply. We do not sell them. Basic visit and button-click counts are stored without names or tracking cookies.",
      payments:
        "Payments take place with the payment provider or your bank. This website does not collect card details.",
      contact:
        "For a question about your information, use the contact details on our Contact page.",
    },
    legal: {
      title: "Association information",
      intro: "Pattes du Sud works for animals in Mirleft, Morocco.",
      name: "Name",
      registration: "Registration reference",
      contact: "Contact details",
    },
    animal: {
      story: "My story",
      facts: "About me",
      age: "Age",
      sex: "Sex",
      female: "Female",
      male: "Male",
      vaccinated: "Vaccinated",
      sterilized: "Sterilized",
      vaccinatedYes: "Vaccinated",
      vaccinatedNo: "Not yet vaccinated",
      sterilizedYes: "Sterilized",
      sterilizedNo: "Not yet sterilized",
      adopt: "Ask about adoption",
      help: "Donate",
      share: "Share",
      shareFallback: "Link copied!",
      back: "All companions",
    },
  },
  fr: {
    adopt: {
      title: "Adopter un compagnon",
      intro:
        "Une adoption commence par une discussion. Nous voulons trouver un bon accord pour chaque animal et chaque famille.",
      steps: [
        "Rencontrez un animal et parlez-nous de votre foyer et de votre quotidien.",
        "Nous discutons ensemble des soins, des coûts et des étapes pratiques.",
        "Si tout convient, nous organisons une arrivée en sécurité et un suivi.",
      ],
      localTitle: "Mirleft et le Maroc",
      internationalTitle: "À l’étranger",
      local:
        "Au Maroc, contactez-nous pour organiser une rencontre à Mirleft. Merci de ne pas venir sans rendez-vous.",
      international:
        "Vous vivez à l’étranger ? Dites-nous où. Les exigences de voyage, les délais et le transport dépendent de la destination et de l’animal. Nous verrons ensemble ce qui est possible.",
      contact: "Parler d’une adoption",
    },
    volunteer: {
      title: "Bénévolat à Mirleft",
      intro:
        "Un peu de temps et une aide concrète comptent beaucoup pour les animaux des rues.",
      ways: [
        "Aider à nourrir les animaux et à leur apporter des soins, avec l’équipe.",
        "Aider au transport, aux fournitures ou aux visites vétérinaires.",
        "Partager les histoires des animaux pour leur trouver un foyer.",
      ],
      wayTitles: [
        "Nourrir et prendre soin",
        "Transport, fournitures et visites vétérinaires",
        "Faire connaître les animaux",
      ],
      visit:
        "Contactez-nous avant de venir pour convenir d’une tâche utile et d’un horaire adapté.",
      arrangeVisit: "Organiser une visite bénévole",
    },
    contact: {
      title: "Nous contacter",
      intro:
        "Une question sur un animal, une visite ou un don ? Contactez directement l’équipe.",
      whatsapp: "Discuter sur WhatsApp",
      whatsappText: "Je souhaite aider Pattes du Sud.",
      whatsappOpens: "Ouvre WhatsApp",
      email: "Envoyer un e-mail",
      emailOpens: "Ouvre votre application e-mail",
      arrange:
        "Merci d’organiser les visites à l’avance. Nous agissons à Mirleft, au Maroc.",
      unavailable: "Les coordonnées seront bientôt disponibles.",
      responseTime: "Nous répondons généralement sous {hours} heures.",
      hoursTitle: "Heures de contact",
      openingHours: "Ouverture",
      closingHours: "Fermeture",
      mapTitle: "Nous trouver à Mirleft",
    },
    donate: {
      title: "Aider les soins à continuer",
      intro:
        "Votre soutien contribue à la nourriture, aux soins vétérinaires, aux vaccins, à la stérilisation, aux médicaments et à un abri si nécessaire.",
      amount:
        "Choisissez votre formule. Vous pourrez définir le montant sur PayPal.",
      once: "Une fois",
      monthly: "Chaque mois",
      give: "Continuer sur PayPal",
      recommended: "Conseillé pour des soins réguliers",
      monthlyNote: "Un soutien régulier aide à planifier la nourriture, le suivi vétérinaire et la prévention dans la durée.",
      onceNote: "Un don ponctuel aide à répondre aux besoins du moment.",
      paypalTrust: "Votre paiement est traité par PayPal. Vous pourrez choisir le montant sur PayPal.",
      transfer: "Virement bancaire",
      transferNote:
        "Vous pouvez aussi programmer un virement régulier auprès de votre banque. Indiquez « Don » en référence.",
      unavailable:
        "Les informations de don en ligne seront bientôt disponibles.",
      impact: "À quoi sert votre don",
      impactText:
        "L’association enregistre ses recettes et ses dépenses, conserve les justificatifs et suit les soins vétérinaires et les animaux aidés.",
      transparencyTitle: "Notre engagement pour la transparence",
      dailyCare: "Les soins du quotidien",
      dailyCareText: "De la nourriture, de l’eau propre et des soins pour les animaux qui ont besoin d’un lieu sûr.",
      veterinaryCare: "Les soins vétérinaires",
      veterinaryCareText: "Consultations, vaccins, traitements et médicaments pour les animaux malades ou blessés.",
      prevention: "Prévention et suivi",
      preventionText: "Stérilisation, identification, suivi et dossiers pour prévenir de nouvelles souffrances.",
      copy: "Copier",
      copied: "Copié",
    },
    thanks: {
      title: "Merci pour votre soutien",
      intro:
        "Votre aide permet aux animaux de Mirleft de recevoir des soins. Le paiement est confirmé par le prestataire ou votre banque.",
      share: "Partager notre travail",
      home: "Retour à l’accueil",
    },
    mirleft: {
      title: "Vous avez peut-être rencontré nos animaux",
      intro:
        "Les chiens et chats des rues font partie de Mirleft. Aidez-nous à leur offrir nourriture, soins et avenir meilleur.",
      donate: "Faire un don",
      animals: "Voir les animaux",
      contact: "Nous contacter",
    },
    privacy: {
      title: "Vie privée",
      intro:
        "Nous recueillons uniquement les informations nécessaires au fonctionnement du site et pour vous répondre.",
      data: "Si vous nous écrivez, nous utilisons vos coordonnées et votre message pour vous répondre. Nous ne les vendons pas. Les visites et clics sont comptés sans nom ni cookie de suivi.",
      payments:
        "Les paiements se font auprès du prestataire ou de votre banque. Ce site ne recueille pas vos données bancaires.",
      contact:
        "Pour toute question, utilisez les coordonnées de la page Contact.",
    },
    legal: {
      title: "Informations sur l’association",
      intro: "Pattes du Sud agit pour les animaux à Mirleft, au Maroc.",
      name: "Nom",
      registration: "Référence d’enregistrement",
      contact: "Coordonnées",
    },
    animal: {
      story: "Mon histoire",
      facts: "À propos de moi",
      age: "Âge",
      sex: "Sexe",
      female: "Femelle",
      male: "Mâle",
      vaccinated: "Vacciné",
      sterilized: "Stérilisé",
      vaccinatedYes: "Vacciné",
      vaccinatedNo: "Vaccination à prévoir",
      sterilizedYes: "Stérilisé",
      sterilizedNo: "Stérilisation à prévoir",
      adopt: "Parler d’une adoption",
      help: "Faire un don",
      share: "Partager",
      shareFallback: "Lien copié !",
      back: "Tous les compagnons",
    },
  },
  de: {
    adopt: {
      title: "Ein Tier adoptieren",
      intro:
        "Eine Adoption beginnt mit einem Gespräch. Tier und Familie sollen gut zueinander passen und Zeit zur Vorbereitung haben.",
      steps: [
        "Lerne ein Tier kennen und erzähle uns von deinem Zuhause und Alltag.",
        "Wir besprechen Pflege, Kosten und die nächsten Schritte.",
        "Wenn alles passt, vereinbaren wir eine sichere Übergabe und bleiben in Kontakt.",
      ],
      localTitle: "Mirleft und Marokko",
      internationalTitle: "Im Ausland",
      local:
        "In Marokko kannst du ein Treffen in Mirleft mit uns vereinbaren. Bitte komm nur nach Absprache vorbei.",
      international:
        "Du lebst im Ausland? Sag uns, wo. Reisevorschriften, Zeit und Transport hängen vom Ziel und Tier ab. Wir klären zuerst gemeinsam, was möglich ist.",
      contact: "Adoption anfragen",
    },
    volunteer: {
      title: "In Mirleft mithelfen",
      intro:
        "Schon etwas Zeit und praktische Hilfe können Straßentieren viel bedeuten.",
      ways: [
        "Hilf nach Absprache beim Füttern und bei der täglichen Versorgung.",
        "Unterstütze Fahrten, Material oder Tierarztbesuche, wenn du kannst.",
        "Teile die Geschichten der Tiere und hilf ihnen, ein Zuhause zu finden.",
      ],
      wayTitles: [
        "Füttern und tägliche Versorgung",
        "Fahrten, Material und Tierarztbesuche",
        "Geschichten teilen",
      ],
      visit:
        "Bitte melde dich vor einem Besuch, damit wir eine passende Aufgabe und Zeit vereinbaren können.",
      arrangeVisit: "Besuch zum Helfen vereinbaren",
    },
    contact: {
      title: "Kontakt",
      intro:
        "Fragen zu einem Tier, einem Besuch oder einer Spende? Kontaktiere das Team direkt.",
      whatsapp: "Auf WhatsApp chatten",
      whatsappText: "Ich möchte Pattes du Sud helfen.",
      whatsappOpens: "Öffnet WhatsApp",
      email: "E-Mail schreiben",
      emailOpens: "Öffnet dein E-Mail-Programm",
      arrange:
        "Bitte vereinbare Besuche im Voraus. Wir arbeiten in Mirleft, Marokko.",
      unavailable:
        "Die Kontaktdaten werden vorbereitet. Bitte schau bald wieder vorbei.",
      responseTime: "Wir antworten normalerweise innerhalb von {hours} Stunden.",
      hoursTitle: "Kontaktzeiten",
      openingHours: "Öffnung",
      closingHours: "Schließung",
      mapTitle: "So findest du uns in Mirleft",
    },
    donate: {
      title: "Hilf mit deiner Spende",
      intro:
        "Deine Unterstützung hilft bei Futter, Tierarztkosten, Impfungen, Kastrationen, Medikamenten und bei Bedarf einem sicheren Ort.",
      amount:
        "Wähle eine Spendenart. Den Betrag kannst du bei PayPal festlegen.",
      once: "Einmalig",
      monthly: "Monatlich",
      give: "Weiter zu PayPal",
      recommended: "Empfohlen für laufende Versorgung",
      monthlyNote: "Regelmäßige Spenden helfen uns, Futter, tierärztliche Betreuung und Vorsorge langfristig zu planen.",
      onceNote: "Eine einmalige Spende hilft bei dem, was gerade gebraucht wird.",
      paypalTrust: "Deine Zahlung wird von PayPal abgewickelt. Den Betrag wählst du bei PayPal.",
      transfer: "Banküberweisung",
      transferNote:
        "Du kannst bei deiner Bank auch eine regelmäßige Überweisung einrichten. Gib „Spende“ als Verwendungszweck an.",
      unavailable: "Die Daten für Online-Spenden werden vorbereitet.",
      impact: "Wofür deine Hilfe eingesetzt wird",
      impactText:
        "Der Verein dokumentiert Einnahmen und Ausgaben, bewahrt Belege auf und hält Tierarztbehandlungen und betreute Tiere fest.",
      transparencyTitle: "Unser Engagement für Transparenz",
      dailyCare: "Versorgung im Alltag",
      dailyCareText: "Futter, sauberes Wasser und Betreuung für Tiere, die einen sicheren Ort brauchen.",
      veterinaryCare: "Tierärztliche Versorgung",
      veterinaryCareText: "Untersuchungen, Impfungen, Behandlungen und Medikamente für kranke oder verletzte Tiere.",
      prevention: "Vorsorge und Betreuung",
      preventionText: "Kastration, Kennzeichnung, Beobachtung und Dokumentation helfen, weiteres Leid zu verhindern.",
      copy: "Kopieren",
      copied: "Kopiert",
    },
    thanks: {
      title: "Danke für deine Hilfe",
      intro:
        "Deine Unterstützung hilft Tieren in Mirleft. Die Zahlung wird vom Zahlungsanbieter oder deiner Bank bestätigt.",
      share: "Unsere Arbeit teilen",
      home: "Zur Startseite",
    },
    mirleft: {
      title: "Vielleicht hast du unsere Tiere getroffen",
      intro:
        "Mirlefts Straßenhunde und -katzen gehören zu diesem Ort. Hilf uns, ihnen Futter, medizinische Versorgung und eine bessere Zukunft zu geben.",
      donate: "Spenden",
      animals: "Tiere kennenlernen",
      contact: "Kontakt",
    },
    privacy: {
      title: "Datenschutz",
      intro:
        "Wir erheben nur Daten, die für die Website und die Beantwortung deiner Nachricht nötig sind.",
      data: "Wenn du uns schreibst, nutzen wir deine Kontaktdaten und Nachricht für die Antwort. Wir verkaufen sie nicht. Besuche und Klicks zählen wir ohne Namen oder Tracking-Cookies.",
      payments:
        "Zahlungen erfolgen beim Zahlungsanbieter oder deiner Bank. Diese Website speichert keine Kartendaten.",
      contact: "Bei Fragen zu deinen Daten nutze bitte die Kontaktseite.",
    },
    legal: {
      title: "Vereinsinformationen",
      intro: "Pattes du Sud setzt sich für Tiere in Mirleft, Marokko, ein.",
      name: "Name",
      registration: "Registrierungsnummer",
      contact: "Kontaktdaten",
    },
    animal: {
      story: "Meine Geschichte",
      facts: "Über mich",
      age: "Alter",
      sex: "Geschlecht",
      female: "Weiblich",
      male: "Männlich",
      vaccinated: "Geimpft",
      sterilized: "Kastriert",
      vaccinatedYes: "Geimpft",
      vaccinatedNo: "Impfung steht noch aus",
      sterilizedYes: "Kastriert",
      sterilizedNo: "Kastration steht noch aus",
      adopt: "Adoption anfragen",
      help: "Spenden",
      share: "Teilen",
      shareFallback: "Link kopiert!",
      back: "Alle Begleiter",
    },
  },
  ar: {
    adopt: {
      title: "تبنَّ صديقًا",
      intro:
        "يبدأ التبنّي بحوار. نحرص على أن يناسب البيت الحيوان وأن يستعد الجميع لهذه الخطوة.",
      steps: [
        "تعرّف على الحيوان وأخبرنا عن بيتك وحياتك اليومية.",
        "نتحدث معًا عن الرعاية والتكاليف والخطوات العملية.",
        "إذا كان التبنّي مناسبًا، نرتّب انتقال الحيوان بأمان ونتابع أخباره.",
      ],
      localTitle: "ميرلفت والمغرب",
      internationalTitle: "خارج المغرب",
      local:
        "إذا كنت في المغرب، تواصل معنا لترتيب لقاء في ميرلفت. يُرجى عدم الزيارة دون موعد.",
      international:
        "هل تعيش خارج المغرب؟ أخبرنا ببلد إقامتك. تختلف شروط السفر ومدته ونقله بحسب الوجهة والحيوان، وسنناقش معك ما يمكن ترتيبه.",
      contact: "اسأل عن التبنّي",
    },
    volunteer: {
      title: "تطوّع في ميرلفت",
      intro:
        "يمكن لقليل من الوقت والمساعدة العملية أن يصنعا فرقًا للحيوانات في الشوارع.",
      ways: [
        "ساعد في إطعام الحيوانات ورعايتها بالتنسيق مع الفريق.",
        "ساهم في النقل أو المستلزمات أو الزيارات البيطرية إن استطعت.",
        "شارك قصص الحيوانات وساعدها في العثور على بيوت ترعاها.",
      ],
      wayTitles: [
        "الإطعام والرعاية اليومية",
        "النقل والمستلزمات والزيارات البيطرية",
        "التعريف بقصص الحيوانات",
      ],
      visit: "تواصل معنا قبل الزيارة لنرتب وقتًا مناسبًا ومهمة مفيدة.",
      arrangeVisit: "رتّب زيارة للتطوع",
    },
    contact: {
      title: "تواصل معنا",
      intro: "هل لديك سؤال عن حيوان أو زيارة أو تبرع؟ تواصل مباشرة مع الفريق.",
      whatsapp: "ابدأ محادثة عبر واتساب",
      whatsappText: "أريد مساعدة جمعية بات دو سود.",
      whatsappOpens: "يفتح واتساب",
      email: "أرسل رسالة بالبريد الإلكتروني",
      emailOpens: "يفتح تطبيق البريد الإلكتروني",
      arrange: "يرجى ترتيب الزيارات مسبقًا. نعمل في ميرلفت بالمغرب.",
      unavailable: "نعمل على توفير بيانات التواصل قريبًا.",
      responseTime: "نرد عادةً خلال {hours} ساعة.",
      hoursTitle: "أوقات التواصل",
      openingHours: "وقت الافتتاح",
      closingHours: "وقت الإغلاق",
      mapTitle: "موقعنا في ميرلفت",
    },
    donate: {
      title: "ساعدنا على مواصلة الرعاية",
      intro:
        "تساهم تبرعاتك في الغذاء والعلاج البيطري والتلقيح والتعقيم والأدوية والمأوى عند الحاجة.",
      amount: "اختر طريقة التبرع. يمكنك تحديد المبلغ على باي بال.",
      once: "مرة واحدة",
      monthly: "شهريًا",
      give: "المتابعة عبر باي بال",
      recommended: "موصى به للرعاية المستمرة",
      monthlyNote: "تساعد المساهمات المنتظمة على التخطيط للغذاء والمتابعة البيطرية والوقاية على المدى الطويل.",
      onceNote: "تساعد المساهمة لمرة واحدة على تلبية الاحتياجات الحالية.",
      paypalTrust: "تُعالج باي بال عملية الدفع. يمكنك اختيار المبلغ على باي بال.",
      transfer: "تحويل بنكي",
      transferNote:
        "يمكنك ترتيب تحويل دوري لدى بنكك. اكتب «تبرع» في خانة المرجع.",
      unavailable: "نعمل على توفير معلومات التبرع الإلكتروني قريبًا.",
      impact: "كيف تُستخدم مساهمتك",
      impactText:
        "توثّق الجمعية مداخيلها ومصاريفها، وتحتفظ بالمستندات، وتسجّل الرعاية البيطرية والحيوانات التي تساعدها.",
      transparencyTitle: "التزامنا بالشفافية",
      dailyCare: "الرعاية اليومية",
      dailyCareText: "الغذاء والماء النظيف ورعاية الحيوانات التي تحتاج إلى مكان آمن.",
      veterinaryCare: "الرعاية البيطرية",
      veterinaryCareText: "الفحوصات والتلقيح والعلاج والأدوية للحيوانات المريضة أو المصابة.",
      prevention: "الوقاية والمتابعة",
      preventionText: "يساعد التعقيم والتعريف بالحيوان ومتابعته وتوثيق حالته على الحد من المعاناة المتكررة.",
      copy: "نسخ",
      copied: "نُسخ",
    },
    thanks: {
      title: "شكرًا لاهتمامك",
      intro:
        "تساعد مساهمتك حيوانات ميرلفت في الحصول على الرعاية. يؤكد مزود الدفع أو البنك إتمام العملية.",
      share: "شارك عملنا",
      home: "العودة للرئيسية",
    },
    mirleft: {
      title: "ربما التقيت بحيواناتنا",
      intro:
        "كلاب وقطط شوارع ميرلفت جزء من هذا المكان. ساعدنا في توفير الغذاء والعلاج ومستقبل أفضل لها.",
      donate: "تبرع",
      animals: "تعرّف على الحيوانات",
      contact: "تواصل معنا",
    },
    privacy: {
      title: "الخصوصية",
      intro: "نجمع فقط البيانات اللازمة لتشغيل الموقع والرد على رسائلك.",
      data: "إذا راسلتنا، نستخدم بيانات التواصل ورسالتك للرد عليك ولا نبيعها. نحصي الزيارات والنقرات دون أسماء أو ملفات تعريف ارتباط للتتبع.",
      payments:
        "تتم المدفوعات لدى مزود الدفع أو بنكك. لا يجمع هذا الموقع بيانات بطاقتك.",
      contact: "للاستفسار عن بياناتك، استخدم وسائل التواصل في صفحة الاتصال.",
    },
    legal: {
      title: "معلومات الجمعية",
      intro: "تعمل جمعية بات دو سود من أجل الحيوانات في ميرلفت بالمغرب.",
      name: "الاسم",
      registration: "رقم التسجيل",
      contact: "بيانات التواصل",
    },
    animal: {
      story: "قصتي",
      facts: "معلومات عني",
      age: "العمر",
      sex: "الجنس",
      female: "أنثى",
      male: "ذكر",
      vaccinated: "ملقّح",
      sterilized: "معقّم",
      vaccinatedYes: "تم التطعيم",
      vaccinatedNo: "لم يتم التطعيم بعد",
      sterilizedYes: "تم التعقيم",
      sterilizedNo: "لم يتم التعقيم بعد",
      adopt: "اسأل عن التبنّي",
      help: "تبرع",
      share: "شارك",
      shareFallback: "تم نسخ الرابط!",
      back: "جميع الرفاق",
    },
  },
};
