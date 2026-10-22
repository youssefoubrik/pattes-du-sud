import type { Locale } from "@/i18n/routing";
import type { Animal } from "@/content/animals";

type AnimalMessages = {
  title: string;
  description: string;
  adoptionMessage: string;
  age: string;
  ageUnknown: string;
  getToKnow: string;
  meetAll: string;
  photosLabel: string;
  photoLabel: string;
  viewPhoto: string;
  previousPhoto: string;
  nextPhoto: string;
  closePhotoViewer: string;
  species: Record<Animal["species"], string>;
  status: Record<Animal["status"], string>;
  personality: Record<NonNullable<Animal["personality"]>, string>;
};

export const animalMessages: Record<Locale, AnimalMessages> = {
  en: {
    title: "Meet our furry friends",
    description: "Dogs and cats, each with their own story. Some are waiting for a home; others have found theirs.",
    adoptionMessage: "Hello, I would like to ask about adopting {name}.",
    age: "About {age} years old", ageUnknown: "Age unknown", getToKnow: "Get to know me", meetAll: "Meet all our friends",
    photosLabel: "Photos of {name}", photoLabel: "Photo {number} of {total}",
    viewPhoto: "View {photo} full size", previousPhoto: "Previous photo", nextPhoto: "Next photo", closePhotoViewer: "Close photo viewer",
    species: { dog: "Dog", cat: "Cat" },
    status: { available: "Looking for a home", inCare: "Receiving care", adopted: "Found a loving home" },
    personality: {
      gentle: "A gentle soul who enjoys company.",
      playful: "Always ready for a little playtime.",
      curious: "Curious about the world around me.",
      shy: "I like to take my time getting to know you.",
      affectionate: "I enjoy affection and being close to people.",
      calm: "I’m relaxed and enjoy peaceful moments.",
      energetic: "I have lots of energy and enjoy staying active.",
      independent: "I enjoy exploring at my own pace.",
    },
  },
  fr: {
    title: "Rencontrez nos compagnons",
    description: "Chiens et chats, chacun avec son histoire. Certains attendent un foyer ; d’autres ont trouvé le leur.",
    adoptionMessage: "Bonjour, je souhaiterais en savoir plus sur l’adoption de {name}.",
    age: "Environ {age} ans", ageUnknown: "Âge inconnu", getToKnow: "Faisons connaissance", meetAll: "Rencontrer tous nos compagnons",
    photosLabel: "Photos de {name}", photoLabel: "Photo {number} sur {total}",
    viewPhoto: "Afficher {photo} en grand", previousPhoto: "Photo précédente", nextPhoto: "Photo suivante", closePhotoViewer: "Fermer la visionneuse",
    species: { dog: "Chien", cat: "Chat" },
    status: { available: "Cherche un foyer", inCare: "En soins", adopted: "A trouvé un foyer aimant" },
    personality: {
      gentle: "Une âme douce qui aime la compagnie.",
      playful: "Toujours partant pour un peu de jeu.",
      curious: "Le monde autour de moi m’intrigue.",
      shy: "J’aime prendre mon temps pour vous connaître.",
      affectionate: "J’aime les marques d’affection et la proximité des gens.",
      calm: "Je suis calme et j’apprécie les moments paisibles.",
      energetic: "J’ai beaucoup d’énergie et j’aime rester actif.",
      independent: "J’aime explorer à mon rythme.",
    },
  },
  de: {
    title: "Lerne unsere Fellfreunde kennen",
    description: "Hunde und Katzen, alle mit ihrer eigenen Geschichte. Manche suchen ein Zuhause, andere haben ihres schon gefunden.",
    adoptionMessage: "Hallo, ich möchte mich nach einer Adoption von {name} erkundigen.",
    age: "Etwa {age} Jahre alt", ageUnknown: "Alter unbekannt", getToKnow: "Lerne mich kennen", meetAll: "Lerne alle unsere Freunde kennen",
    photosLabel: "Fotos von {name}", photoLabel: "Foto {number} von {total}",
    viewPhoto: "{photo} in voller Größe ansehen", previousPhoto: "Vorheriges Foto", nextPhoto: "Nächstes Foto", closePhotoViewer: "Fotoansicht schließen",
    species: { dog: "Hund", cat: "Katze" },
    status: { available: "Sucht ein Zuhause", inCare: "Wird versorgt", adopted: "Hat ein liebevolles Zuhause" },
    personality: {
      gentle: "Eine sanfte Seele, die Gesellschaft mag.",
      playful: "Immer bereit für eine kleine Spielrunde.",
      curious: "Neugierig auf die Welt um mich herum.",
      shy: "Ich brauche etwas Zeit, um dich kennenzulernen.",
      affectionate: "Ich mag Zuwendung und bin gern in der Nähe von Menschen.",
      calm: "Ich bin ruhig und genieße entspannte Momente.",
      energetic: "Ich habe viel Energie und bin gern aktiv.",
      independent: "Ich erkunde die Welt gern in meinem eigenen Tempo.",
    },
  },
  ar: {
    title: "تعرّف على أصدقائنا الصغار",
    description: "كلاب وقطط، لكل منها حكاية. بعضها ينتظر بيتًا يرعاه، وبعضها وجد بيته بالفعل.",
    adoptionMessage: "مرحبًا، أود الاستفسار عن تبنّي {name}.",
    age: "العمر التقريبي: {age} سنة", ageUnknown: "العمر غير معروف", getToKnow: "تعرّف عليّ", meetAll: "تعرّف على جميع أصدقائنا",
    photosLabel: "صور {name}", photoLabel: "الصورة {number} من {total}",
    viewPhoto: "عرض {photo} بالحجم الكامل", previousPhoto: "الصورة السابقة", nextPhoto: "الصورة التالية", closePhotoViewer: "إغلاق عارض الصور",
    species: { dog: "كلب", cat: "قط" },
    status: { available: "يبحث عن بيت", inCare: "يتلقى الرعاية", adopted: "وجد بيتًا يرعاه بحب" },
    personality: {
      gentle: "هادئ ولطيف وأحب الرفقة.",
      playful: "مستعد دائمًا للعب قليلًا.",
      curious: "أحب اكتشاف العالم من حولي.",
      shy: "أحتاج بعض الوقت حتى أعتاد عليك.",
      affectionate: "أحب المودة والقرب من الناس.",
      calm: "أنا هادئ وأحب الأوقات الساكنة.",
      energetic: "لدي طاقة كبيرة وأحب الحركة والنشاط.",
      independent: "أحب الاستكشاف على طريقتي ووفق وتيرتي.",
    },
  },
};
