type FooterContent = {
  officialName: string;
  registrationReference: string | null;
  contact: {
    email: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    instagram: string;
    facebook: string;
  };
};

export const footerContent: FooterContent = {
  officialName: "Pattes du Sud",
  // TODO: replace with the confirmed registration reference before launch.
  registrationReference: null,
  contact: {
    // TODO: replace these sample contact details before launch.
    email: "contact@example.org",
    whatsappNumber: "212000000000",
    whatsappDisplay: "+212 000 000 000",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
};
