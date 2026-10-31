import type { PageMessages } from "../types";

const data: PageMessages = {
  adopt: {
    title: "Adopt a friend",
    intro:
      "Adopting a companion can be the beginning of a close bond. We’re here to listen, answer your questions, and help you consider whether adoption feels right for you and your future companion.",
    imageAlt: "A person gently pets a brown dog outdoors.",
    imageCaption: "A gentle first connection can be the start of something special.",
    stepsTitle: "How adoption works",
    steps: [
      "Meet a dog or cat and tell us about your home and daily routine.",
      "We discuss care, costs and the practical steps together.",
      "If it feels right for everyone, we agree on a safe handover and follow-up.",
    ],
    localTitle: "Mirleft & Morocco",
    internationalTitle: "International",
    local:
      "In Morocco, contact us to arrange a meeting in Mirleft. Please do not arrive without arranging a visit.",
    international:
      "Living abroad? Tell us where you live. Travel requirements, timing and transport depend on your destination and the companion you hope to adopt, so we will discuss what is possible before making plans.",
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
    mirleftSupport:
      "In Mirleft, a little can go a long way. Your gift helps provide everyday care for dogs and cats.",
    onceImpactTitle: "A one-time gift can help with:",
    onceImpacts: [
      "Contribute to current needs such as food, medicine or veterinary care.",
      "Offer flexible support as needs and priorities change.",
    ],
    monthlyImpactTitle: "Monthly giving can help us:",
    monthlyImpacts: [
      "Build a steadier contribution toward regular food and treatment.",
      "Plan ongoing care with more confidence.",
    ],
    suggestedAmountsTitle: "Choose a gift amount (EUR)",
    onceGiftSuggestions: ["€10", "€25", "€50", "€100"],
    monthlyGiftSuggestions: ["€5", "€10", "€20", "€50"],
    customAmountLabel: "Or enter a custom amount",
    amount: "Please choose your amount again on PayPal to complete your gift.",
    frequency: "Donation frequency",
    securePayment: "Secure donation",
    once: "One-time",
    monthly: "Monthly",
    monthlyBadge: "Best for ongoing care",
    onceCta: "Donate once",
    monthlyCta: "Donate monthly",
    paypalHandoffBefore: "After you continue,",
    paypalHandoffAfter: "will handle your payment.",
    accountability:
      "We document income and expenses, keep invoices, and document veterinary care.",
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
      "This page explains what information is handled when you use this website or contact us.",
    analyticsTitle: "Site analytics",
    analytics:
      "We record each public page view, a country code supplied by our hosting provider when available, and the source label when someone visits the Mirleft page through a QR code. These records are stored in the site database and used to produce visit counts. We keep them for up to 12 months, then delete them. Analytics does not record button clicks or IP addresses and does not use tracking cookies.",
    mapTitle: "Embedded map",
    map: "The Google Map may send technical information, such as your IP address, to Google when it loads.",
    contactMethodsTitle: "When you contact us",
    contactMethods:
      "If you contact us by email or WhatsApp, those services handle your contact details and message. We use them to reply and do not sell them.",
    cookiesTitle: "Cookies",
    cookies:
      "The site uses a cookie to remember a language choice, and a separate sign-in cookie for the editor.",
    paymentsTitle: "Payments",
    payments:
      "If you follow a PayPal link, PayPal handles the payment under its own privacy policy. Bank transfers are handled by your bank. This website does not collect or store your card or bank account details.",
    questionsTitle: "Questions",
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
