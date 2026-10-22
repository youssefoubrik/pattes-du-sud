import type { AnimalMessages } from "../types";

const data: AnimalMessages = {
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
};

export { data };
