type FooterContent = {
  officialName: string;
  registrationReference: string | null;
  contact: {
    email: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    instagram: string | null;
    facebook: string | null;
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
    // Add these links only after the association confirms its accounts.
    instagram: null,
    facebook: null,
  },
};
