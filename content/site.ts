type SiteContent = {
  name: string;
  description: string;
  favicon: string;
  logo: { src: string; width: number; height: number };
};

export const siteContent: SiteContent = {
  name: "Pattes du Sud",
  description:
    "An animal-protection association caring for the street dogs and cats of Mirleft, Morocco.",
  favicon: "/brand/favicon.png",
  logo: { src: "/brand/logo-eng.png", width: 2172, height: 724 },
};
