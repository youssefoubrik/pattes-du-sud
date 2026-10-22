import type { PageMessages } from "../types";

const data: PageMessages = {
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
      "Un peu de temps et une aide concrète comptent beaucoup pour les chiens et les chats des rues.",
    ways: [
      "Une alimentation régulière, de l’eau propre et une attention calme contribuent au bien-être des chiens et des chats des rues. Après avoir convenu d’une visite, vous pouvez participer au nourrissage et aux soins quotidiens. L’équipe vous proposera une tâche utile selon les besoins du jour, comme préparer la nourriture ou remplir les gamelles d’eau.",
      "Des soins vétérinaires à temps aident les chiens et les chats malades ou blessés à recevoir le traitement nécessaire. Vous pouvez soutenir ces soins en aidant au transport, aux fournitures ou lors d’une visite vétérinaire organisée. L’équipe conviendra de la tâche à l’avance et vous indiquera l’aide pratique nécessaire.",
      "Quand davantage de personnes connaissent l’histoire d’un chien ou d’un chat, elles peuvent plus facilement proposer leur soutien ou envisager une adoption. Vous pouvez aider en partageant des informations claires sur les besoins et la personnalité de chaque compagnon. Cela montre aussi aux personnes intéressées comment s’engager.",
    ],
    wayTitles: [
      "Nourrir et prendre soin",
      "Transport, fournitures et visites vétérinaires",
      "Faire connaître leurs histoires",
    ],
    actionImagesTitle: "Les soins en action",
    actionImageCaptions: [
      "Nourrir un chien en plein air",
      "Un chaton reçoit un examen vétérinaire",
      "Offrir un moment calme à un chat",
    ],
    actionImageAlts: [
      "Une main offre de la nourriture à un chien",
      "Une vétérinaire examine un chaton blanc",
      "Une personne caresse doucement un chat tigré",
    ],
    visitTitle: "Avant votre visite",
    visit:
      "Les tâches dépendent des besoins des chiens et des chats et de ce que l’équipe peut organiser ce jour-là.",
    visitSteps: [
      "Écrivez à l’équipe avant de venir.",
      "Convenez ensemble d’un horaire et d’une tâche utile.",
    ],
    arrangeVisit: "Organiser une visite bénévole",
  },
  contact: {
    title: "Nous contacter",
    intro:
      "Une question sur nos compagnons, une visite ou un don ? Contactez l’équipe.",
    whatsapp: "Discuter sur WhatsApp",
    whatsappText: "Je souhaite aider Pattes du Sud.",
    whatsappOpens: "Ouvre WhatsApp",
    email: "Envoyer un e-mail",
    emailOpens: "Ouvre votre application e-mail",
    arrange:
      "Merci d’organiser les visites à l’avance. Nous agissons à Mirleft, au Maroc.",
    unavailable: "Les coordonnées seront bientôt disponibles.",
    responseTime: "Nous répondons généralement sous",
    responseTimeUnit: "heures.",
    hoursStart: "Nous sommes ouverts de",
    hoursBetween: "à",
    openingTime: "Nous ouvrons à",
    closingTime: "Nous fermons à",
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
};

export { data };
