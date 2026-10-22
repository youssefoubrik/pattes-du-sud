import type { AboutMessages } from "../types";

const data: AboutMessages = {
  title: "À propos de Pattes du Sud",
  description: "Découvrez pourquoi Pattes du Sud est née à Mirleft et comment elle protège les animaux des rues.",
  introduction: "Pattes du Sud est née à Mirleft d’une conviction simple : impossible de détourner le regard quand les chiens et chats des rues souffrent de faim, de blessures ou de maladie.",
  purpose: "Notre objectif est de les protéger durablement grâce aux soins vétérinaires, à la prévention et au suivi, afin qu’ils vivent avec davantage de dignité et de sécurité.",
  imageAlt: "Un chien des rues mange la nourriture qu’on lui offre à la main en extérieur.",
  imageCaption: "Les soins quotidiens commencent par de la nourriture, de l’eau et une approche douce.",
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
};

export { data };
