type AdoptContent = {
  introductionImage: { src: string; width: number; height: number };
};

export const adoptContent: AdoptContent = {
  introductionImage: {
    // TODO: replace with a real adoption photo from the association.
    // Photo by urtimud.89 via Pexels: https://www.pexels.com/photo/person-petting-a-brown-dog-10894899/
    src: "/images/adopt/introduction.jpg",
    width: 1200,
    height: 800,
  },
};
