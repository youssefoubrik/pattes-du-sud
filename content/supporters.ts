export type Supporter = {
  id: string;
  name: string;
  website?: string;
  logo?: { src: string; width: number; height: number };
};

// Fictional entries for the demo. Replace with confirmed supporters before publication.
export const supporters: Supporter[] = [
  {
    id: "coastal-care",
    name: "Coastal Care Collective",
    logo: { src: "/images/supporters/coastal-care.svg", width: 64, height: 64 },
  },
  {
    id: "atlas-allies",
    name: "Atlas Animal Allies",
    logo: { src: "/images/supporters/atlas-allies.svg", width: 64, height: 64 },
  },
  {
    id: "mirleft-friends",
    name: "Mirleft Friends Network",
    logo: { src: "/images/supporters/mirleft-friends.svg", width: 64, height: 64 },
  },
];
