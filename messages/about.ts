import type { Locale } from "@/i18n/routing";

type AboutMessages = {
  title: string;
  description: string;
  introduction: string;
  purpose: string;
  imageAlt: string;
  imageCaption: string;
  care: {
    title: string;
    introduction: string;
    steps: { title: string; description: string }[];
  };
  team: { title: string; introduction: string; volunteer: string };
  association: {
    place: string;
    title: string;
    officialName: string;
    areaLabel: string;
    area: string;
    visitNote: string;
    contact: string;
  };
  closingInvitation: string;
};

export const aboutMessages: Record<Locale, AboutMessages> = {
  en: {
    title: "About Pattes du Sud",
    description: "Discover why Pattes du Sud began in Mirleft and how it cares for street animals.",
    introduction: "Pattes du Sud grew from a simple conviction in Mirleft: we cannot look away while street dogs and cats face hunger, injury and illness.",
    purpose: "Our purpose is lasting protection through veterinary care, prevention and follow-up, so animals can live with dignity and greater safety.",
    imageAlt: "A person gently holding a small black-and-white puppy.",
    imageCaption: "A quiet moment of care with a young dog.",
    care: {
      title: "How our care works",
      introduction: "We combine immediate help with prevention and follow-up, so care continues beyond one visit.",
      steps: [
        { title: "Respond to immediate needs", description: "Food, water and veterinary care help animals facing hunger, injury or illness." },
        { title: "Prevent further suffering", description: "Vaccination and sterilisation help protect animals and reduce uncontrolled litters." },
        { title: "Identify and follow up", description: "We document care and track animals we help, checking on them again where possible." },
      ],
    },
    team: {
      title: "The people behind the care",
      introduction: "Meet some of the people helping dogs and cats in Mirleft.",
      volunteer: "Volunteer with us",
    },
    association: {
      place: "Mirleft, Morocco",
      title: "The association in Mirleft",
      officialName: "Official name",
      areaLabel: "Area served",
      area: "Mirleft and the surrounding area",
      visitNote: "Please arrange a visit with our team before coming by.",
      contact: "Contact us",
    },
    closingInvitation: "Together, we can give more of Mirleft’s street animals the care they need.",
  },
  fr: {
    title: "À propos de Pattes du Sud",
    description: "Découvrez pourquoi Pattes du Sud est née à Mirleft et comment elle protège les animaux des rues.",
    introduction: "Pattes du Sud est née à Mirleft d’une conviction simple : impossible de détourner le regard quand les chiens et chats des rues souffrent de faim, de blessures ou de maladie.",
    purpose: "Notre objectif est de les protéger durablement grâce aux soins vétérinaires, à la prévention et au suivi, afin qu’ils vivent avec davantage de dignité et de sécurité.",
    imageAlt: "Une personne tient doucement un petit chiot noir et blanc.",
    imageCaption: "Un moment de douceur auprès d’un jeune chien.",
    care: {
      title: "Comment nous agissons",
      introduction: "Nous associons aide immédiate, prévention et suivi pour que les soins se poursuivent au-delà d’une visite.",
      steps: [
        { title: "Répondre aux besoins urgents", description: "Nourriture, eau et soins vétérinaires aident les animaux qui souffrent de faim, de blessures ou de maladie." },
        { title: "Prévenir de nouvelles souffrances", description: "Vaccination et stérilisation protègent les animaux et limitent les naissances non maîtrisées." },
        { title: "Identifier et suivre", description: "Nous documentons les soins et suivons les animaux aidés, en retournant les voir quand c’est possible." },
      ],
    },
    team: {
      title: "Les personnes derrière les soins",
      introduction: "Découvrez quelques-unes des personnes qui aident les chiens et les chats de Mirleft.",
      volunteer: "Devenir bénévole",
    },
    association: {
      place: "Mirleft, Maroc",
      title: "L’association à Mirleft",
      officialName: "Nom officiel",
      areaLabel: "Zone d’intervention",
      area: "Mirleft et ses environs",
      visitNote: "Merci de convenir d’une visite avec notre équipe avant de venir.",
      contact: "Nous contacter",
    },
    closingInvitation: "Ensemble, nous pouvons offrir aux animaux des rues de Mirleft les soins dont ils ont besoin.",
  },
  de: {
    title: "Über Pattes du Sud",
    description: "Erfahre, warum Pattes du Sud in Mirleft entstand und wie der Verein Straßentieren hilft.",
    introduction: "Pattes du Sud entstand in Mirleft aus einer einfachen Überzeugung: Wir dürfen nicht wegsehen, wenn Straßenhunde und Straßenkatzen hungern, verletzt oder krank sind.",
    purpose: "Unser Ziel ist dauerhafter Schutz durch tierärztliche Versorgung, Vorbeugung und Nachsorge, damit Tiere würdiger und sicherer leben können.",
    imageAlt: "Eine Person hält einen kleinen schwarz-weißen Welpen behutsam im Arm.",
    imageCaption: "Ein ruhiger Moment der Zuwendung mit einem jungen Hund.",
    care: {
      title: "So funktioniert unsere Hilfe",
      introduction: "Wir verbinden unmittelbare Hilfe mit Vorbeugung und Nachsorge, damit die Versorgung nach einem Besuch weitergeht.",
      steps: [
        { title: "Akute Bedürfnisse versorgen", description: "Futter, Wasser und tierärztliche Hilfe unterstützen Tiere bei Hunger, Verletzungen oder Krankheit." },
        { title: "Weiteres Leid verhindern", description: "Impfungen und Kastrationen schützen Tiere und begrenzen unkontrollierte Würfe." },
        { title: "Erfassen und begleiten", description: "Wir dokumentieren die Versorgung und sehen nach den Tieren, denen wir helfen, wenn es möglich ist." },
      ],
    },
    team: {
      title: "Die Menschen hinter der Fürsorge",
      introduction: "Lerne einige der Menschen kennen, die Hunden und Katzen in Mirleft helfen.",
      volunteer: "Hilf ehrenamtlich mit",
    },
    association: {
      place: "Mirleft, Marokko",
      title: "Der Verein in Mirleft",
      officialName: "Offizieller Name",
      areaLabel: "Einsatzgebiet",
      area: "Mirleft und Umgebung",
      visitNote: "Bitte vereinbare vor deinem Besuch einen Termin mit unserem Team.",
      contact: "Kontakt aufnehmen",
    },
    closingInvitation: "Gemeinsam können wir mehr Straßentieren in Mirleft die Hilfe geben, die sie brauchen.",
  },
  ar: {
    title: "تعرّف على بات دو سود",
    description: "تعرّف على سبب تأسيس بات دو سود في ميرلفت وكيف ترعى حيوانات الشوارع.",
    introduction: "نشأت بات دو سود في ميرلفت من قناعة بسيطة: لا ينبغي أن نغضّ الطرف عن جوع كلاب وقطط الشوارع وإصاباتها وأمراضها.",
    purpose: "هدفنا حمايتها على المدى الطويل عبر الرعاية البيطرية والوقاية والمتابعة، لتعيش بكرامة وأمان أكبر.",
    imageAlt: "شخص يحمل جرواً صغيراً أبيض وأسود برفق.",
    imageCaption: "لحظة هادئة من الرعاية مع كلب صغير.",
    care: {
      title: "كيف نقدّم الرعاية",
      introduction: "نجمع بين المساعدة العاجلة والوقاية والمتابعة حتى تستمر الرعاية بعد الزيارة الأولى.",
      steps: [
        { title: "تلبية الاحتياجات العاجلة", description: "يساعد الطعام والماء والعلاج البيطري الحيوانات التي تواجه الجوع أو الإصابة أو المرض." },
        { title: "الوقاية من المعاناة", description: "يساعد التطعيم والتعقيم على حماية الحيوانات والحد من التكاثر غير المنضبط." },
        { title: "التعريف والمتابعة", description: "نوثّق الرعاية المقدّمة للحيوانات ونطمئن عليها مجددًا كلما أمكن." },
      ],
    },
    team: {
      title: "الأشخاص الذين يقدّمون الرعاية",
      introduction: "تعرّف على بعض الأشخاص الذين يساهمون في رعاية الكلاب والقطط في ميرلفت.",
      volunteer: "تطوّع معنا",
    },
    association: {
      place: "ميرلفت، المغرب",
      title: "جمعيتنا في ميرلفت",
      officialName: "الاسم الرسمي",
      areaLabel: "نطاق العمل",
      area: "ميرلفت والمناطق المحيطة بها",
      visitNote: "يُرجى ترتيب الزيارة مع فريقنا قبل المجيء.",
      contact: "تواصل معنا",
    },
    closingInvitation: "معًا، يمكننا توفير الرعاية التي تحتاج إليها حيوانات الشوارع في ميرلفت.",
  },
};
