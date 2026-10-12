import type { Locale } from "@/i18n/routing";

type AboutMessages = {
  title: string;
  description: string;
  eyebrow: string;
  introduction: string;
  purpose: string;
  imageAlt: string;
  imageCaption: string;
  care: { title: string; introduction: string; followUp: string };
  team: { title: string; introduction: string; volunteer: string; sampleNotice: string };
  association: {
    place: string;
    title: string;
    officialName: string;
    areaLabel: string;
    area: string;
    visitNote: string;
    contact: string;
    mapTitle: string;
    mapCaption: string;
  };
  closingInvitation: string;
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
    care: {
      title: "Care that continues",
      introduction: "Our work meets different needs, from daily food and veterinary treatment to finding an animal a home.",
      followUp: "We check on the animals we help and keep track of their treatment and follow-up, so care can continue beyond one visit.",
    },
    team: {
      title: "The people behind the care",
      introduction: "People in Mirleft make this work possible, from checking on street animals to arranging the care they need.",
      volunteer: "Volunteer with us",
      sampleNotice: "Illustrative profiles. Team details are being confirmed.",
    },
    association: {
      place: "Mirleft, Morocco",
      title: "The association in Mirleft",
      officialName: "Official name",
      areaLabel: "Area served",
      area: "Mirleft and the surrounding area",
      visitNote: "Please arrange a visit with our team before coming by.",
      contact: "Contact us",
      mapTitle: "Map of Mirleft town centre, Morocco",
      mapCaption: "This map shows Mirleft town centre, not a visit address.",
    },
    closingInvitation: "Together, we can give more of Mirleft’s street animals the care they need.",
  },
  fr: {
    title: "À propos de Pattes du Sud",
    description: "Découvrez Pattes du Sud, une association de protection animale qui prend soin des chiens et des chats des rues de Mirleft, au Maroc.",
    eyebrow: "Mirleft, Maroc",
    introduction: "Pattes du Sud est une association de protection animale basée à Mirleft, au Maroc. Nous prenons soin des chiens et des chats qui vivent dans ses rues.",
    purpose: "Notre action réunit alimentation, soins vétérinaires et stérilisation, pour aider davantage d’animaux à vivre en meilleure santé et en sécurité.",
    imageAlt: "Une personne tient doucement un petit chiot noir et blanc.",
    imageCaption: "Prendre soin des animaux commence avec des personnes présentes sur le terrain.",
    care: {
      title: "Des soins qui se poursuivent",
      introduction: "Nos actions répondent à différents besoins, de la nourriture aux soins vétérinaires, jusqu’à la recherche d’un foyer.",
      followUp: "Nous prenons des nouvelles des animaux aidés et suivons leurs soins et les étapes à venir, pour les accompagner au-delà d’une seule visite.",
    },
    team: {
      title: "Les personnes derrière les soins",
      introduction: "À Mirleft, des personnes veillent sur les animaux des rues et organisent les soins dont ils ont besoin.",
      volunteer: "Devenir bénévole",
      sampleNotice: "Profils illustratifs. Les informations sur l’équipe sont en cours de confirmation.",
    },
    association: {
      place: "Mirleft, Maroc",
      title: "L’association à Mirleft",
      officialName: "Nom officiel",
      areaLabel: "Zone d’intervention",
      area: "Mirleft et ses environs",
      visitNote: "Merci de convenir d’une visite avec notre équipe avant de venir.",
      contact: "Nous contacter",
      mapTitle: "Carte du centre de Mirleft, au Maroc",
      mapCaption: "Cette carte montre le centre de Mirleft, et non une adresse de visite.",
    },
    closingInvitation: "Ensemble, nous pouvons offrir aux animaux des rues de Mirleft les soins dont ils ont besoin.",
  },
  de: {
    title: "Über Pattes du Sud",
    description: "Lerne Pattes du Sud kennen, einen Tierschutzverein für Straßenhunde und Straßenkatzen in Mirleft, Marokko.",
    eyebrow: "Mirleft, Marokko",
    introduction: "Pattes du Sud ist ein Tierschutzverein in Mirleft, Marokko. Wir kümmern uns um die Hunde und Katzen, die auf den Straßen des Ortes leben.",
    purpose: "Unsere Arbeit umfasst Futter, tierärztliche Versorgung und Kastration. So möchten wir mehr Tieren ein sichereres und gesünderes Leben ermöglichen.",
    imageAlt: "Eine Person hält einen kleinen schwarz-weißen Welpen behutsam im Arm.",
    imageCaption: "Tierfürsorge beginnt mit Menschen, die vor Ort helfen.",
    care: {
      title: "Hilfe, die weitergeht",
      introduction: "Unsere Arbeit reicht von täglichem Futter und tierärztlicher Behandlung bis zur Suche nach einem Zuhause.",
      followUp: "Wir sehen nach den Tieren, denen wir helfen, und halten Behandlungen und Nachsorge fest, damit ihre Versorgung nicht nach einem Besuch endet.",
    },
    team: {
      title: "Die Menschen hinter der Fürsorge",
      introduction: "Menschen in Mirleft kümmern sich um Straßentiere und organisieren die Versorgung, die sie brauchen.",
      volunteer: "Hilf ehrenamtlich mit",
      sampleNotice: "Beispielprofile. Die Angaben zum Team werden noch bestätigt.",
    },
    association: {
      place: "Mirleft, Marokko",
      title: "Der Verein in Mirleft",
      officialName: "Offizieller Name",
      areaLabel: "Einsatzgebiet",
      area: "Mirleft und Umgebung",
      visitNote: "Bitte vereinbare vor deinem Besuch einen Termin mit unserem Team.",
      contact: "Kontakt aufnehmen",
      mapTitle: "Karte des Ortszentrums von Mirleft, Marokko",
      mapCaption: "Die Karte zeigt das Ortszentrum von Mirleft, keine Besuchsadresse.",
    },
    closingInvitation: "Gemeinsam können wir mehr Straßentieren in Mirleft die Hilfe geben, die sie brauchen.",
  },
  ar: {
    title: "تعرّف على بات دو سود",
    description: "تعرّف على جمعية بات دو سود لرعاية الكلاب والقطط التي تعيش في شوارع ميرلفت بالمغرب.",
    eyebrow: "ميرلفت، المغرب",
    introduction: "بات دو سود جمعية لحماية الحيوانات في ميرلفت بالمغرب. نهتم بالكلاب والقطط التي تعيش في شوارع البلدة.",
    purpose: "يشمل عملنا توفير الطعام والرعاية البيطرية والتعقيم، حتى تحظى حيوانات أكثر بحياة أكثر أمانًا وصحة.",
    imageAlt: "شخص يحمل جرواً صغيراً أبيض وأسود برفق.",
    imageCaption: "تبدأ رعاية الحيوانات بأشخاص يمدّون لها يد العون.",
    care: {
      title: "رعاية تستمر",
      introduction: "تستجيب جهودنا لاحتياجات مختلفة، من الطعام والعلاج البيطري إلى مساعدة الحيوان في العثور على بيت.",
      followUp: "نتابع أحوال الحيوانات التي نساعدها ونسجّل علاجها وما تحتاجه لاحقًا، حتى لا تتوقف رعايتها عند زيارة واحدة.",
    },
    team: {
      title: "الأشخاص الذين يقدّمون الرعاية",
      introduction: "يقف وراء هذا العمل أشخاص في ميرلفت يتابعون أحوال حيوانات الشوارع وينظّمون الرعاية التي تحتاج إليها.",
      volunteer: "تطوّع معنا",
      sampleNotice: "ملفات تعريفية توضيحية. تفاصيل الفريق قيد التأكيد.",
    },
    association: {
      place: "ميرلفت، المغرب",
      title: "جمعيتنا في ميرلفت",
      officialName: "الاسم الرسمي",
      areaLabel: "نطاق العمل",
      area: "ميرلفت والمناطق المحيطة بها",
      visitNote: "يُرجى ترتيب الزيارة مع فريقنا قبل المجيء.",
      contact: "تواصل معنا",
      mapTitle: "خريطة وسط ميرلفت، المغرب",
      mapCaption: "تُظهر الخريطة وسط ميرلفت، وليست عنوانًا للزيارة.",
    },
    closingInvitation: "معًا، يمكننا توفير الرعاية التي تحتاج إليها حيوانات الشوارع في ميرلفت.",
  },
};
