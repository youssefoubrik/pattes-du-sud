import type { AboutMessages } from "../types";

const data: AboutMessages = {
  title: "About Pattes du Sud",
  description: "Discover why Pattes du Sud began in Mirleft and how it cares for street animals.",
  introduction: "Pattes du Sud grew from a simple conviction in Mirleft: we cannot look away while street dogs and cats face hunger, injury and illness.",
  purpose: "Our purpose is lasting protection through veterinary care, prevention and follow-up, so animals can live with dignity and greater safety.",
  imageAlt: "A street dog eating food offered by hand outdoors.",
  imageCaption: "Everyday care begins with food, water and a gentle approach.",
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
};

export { data };
