import type { PageMessages } from "../types";

const data: PageMessages = {
  adopt: {
    title: "Adopt a friend",
    intro:
      "Adoption starts with a conversation. We want each animal and family to have the right match and enough time to prepare.",
    stepsTitle: "How adoption works",
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
      "A little time and practical help can make a real difference for dogs and cats living on the streets.",
    ways: [
      "Regular food, clean water and calm attention support the health and comfort of dogs and cats living on the streets. Volunteers can help with feeding and daily care after arranging a visit. The team will suggest a useful task based on what is needed that day, such as preparing food or refreshing water.",
      "Timely veterinary care helps sick or injured dogs and cats get the treatment they need. Volunteers can support this work by helping with transport, supplies or a planned veterinary visit. The team will coordinate the task in advance and explain what practical help is useful.",
      "When more people understand a dog or cat’s story, they have more ways to offer support or consider adoption. Volunteers can help by sharing clear updates about each companion’s needs and personality. This helps supporters see how they can get involved.",
    ],
    wayTitles: [
      "Feeding & daily care",
      "Transport, supplies & veterinary visits",
      "Share their stories",
    ],
    actionImagesTitle: "Care in action",
    actionImageCaptions: [
      "Feeding a dog outdoors",
      "A kitten receiving a veterinary check-up",
      "Offering a calm moment with a cat",
    ],
    actionImageAlts: [
      "A hand offering food to a dog",
      "A veterinarian examining a white kitten",
      "A person gently petting a tabby cat",
    ],
    visitTitle: "Before your visit",
    visit:
      "Volunteer tasks depend on what dogs and cats need and what the team can arrange that day.",
    visitSteps: [
      "Message the team before coming.",
      "Agree on a suitable time and a useful task together.",
    ],
    arrangeVisit: "Arrange a volunteer visit",
  },
  contact: {
    title: "Get in touch",
    intro:
      "Questions about a companion, a visit or a donation? Contact the team.",
    whatsapp: "Chat with us on WhatsApp",
    whatsappText: "I want to help Pattes du Sud.",
    whatsappOpens: "Open WhatsApp",
    email: "Send us an email",
    emailOpens: "Send email",
    unavailable:
      "Contact details are being prepared. Please check back soon.",
    responseTime: "We usually reply within",
    responseTimeUnit: "hours.",
    hoursStart: "We are open from",
    hoursBetween: "to",
    openingTime: "We open at",
    closingTime: "We close at",
  },
  donate: {
    title: "Help care continue",
    intro:
      "Your support helps provide food, veterinary care, vaccinations, sterilisation, medicine and a safe place when needed.",
    impactExamplesTitle: "See what your gift can help provide",
    impactExamples: [
      { amount: "€5", impact: "Food & clean water" },
      { amount: "€15", impact: "Medicine & vaccinations" },
      { amount: "€30", impact: "Veterinary care" },
    ],
    amount: "You’ll choose the amount at checkout.",
    frequency: "Donation frequency",
    securePayment: "Secure donation",
    onceDescription:
      "A one-time gift helps meet today’s needs, from food and medicine to veterinary care.",
    monthlyDescription:
      "Monthly gifts help us plan ahead for food, treatment and ongoing care.",
    once: "One-time",
    monthly: "Monthly",
    monthlyBadge: "Best for ongoing care",
    onceCta: "Donate once",
    monthlyCta: "Donate monthly",
    transfer: "Prefer a bank transfer?",
    transferNote:
      "You can also set up a recurring transfer with your bank. Include “Donation” as the reference.",
    bankName: "Bank",
    iban: "IBAN",
    rib: "RIB",
    swift: "SWIFT / BIC",
    unavailable: "Online donation details are being prepared.",
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
};

export { data };
