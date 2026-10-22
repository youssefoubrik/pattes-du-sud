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
  registrationReference: null,
  contact: {
    email: "contact@example.org",
    whatsappNumber: "212000000000",
    whatsappDisplay: "+212 000 000 000",
    instagram: null,
    facebook: null,
  },
};
