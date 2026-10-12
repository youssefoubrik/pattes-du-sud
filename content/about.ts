type AboutContent = {
  introductionImage: { src: string; width: number; height: number };
};

export const aboutContent: AboutContent = {
  // Use an association photo showing the team caring for animals in Mirleft.
  introductionImage: {
    src: "/images/home-team-stock.jpg",
    width: 1200,
    height: 800,
  },
};
