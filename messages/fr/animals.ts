import type { AnimalMessages } from "../types";

const data: AnimalMessages = {
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
};

export { data };
