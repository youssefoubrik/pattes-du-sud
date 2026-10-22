import type { AnimalMessages } from "../types";

const data: AnimalMessages = {
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
};

export { data };
