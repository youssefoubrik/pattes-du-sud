type HomeImage = {
  src: string;
  width: number;
  height: number;
};

type HomeContent = {
  introductionAnimalName: string;
  introductionImage: HomeImage;
  workImages: {
    feeding: HomeImage;
    veterinary: HomeImage;
    companionship: HomeImage;
  };
  teamImage: HomeImage;
};

export const homeContent: HomeContent = {
  // TODO: replace the sample name and greeting with the real animal’s details.
  introductionAnimalName: "Luna",
  introductionImage: {
    // TODO: replace with a real association photo.
    // Photo source: https://images.unsplash.com/photo-1532666731504-52cd5e6b54dd
    src: "/images/home-introduction.jpg",
    width: 1200,
    height: 800,
  },
  workImages: {
    // TODO: replace these stock photos with real photos of the association’s work.
    feeding: {
      // Photo source: https://www.pexels.com/photo/photo-of-person-feeding-dog-outside-1868860/
      src: "/images/home-work.jpg",
      width: 1200,
      height: 1800,
    },
    veterinary: {
      // Photo source: https://unsplash.com/photos/a-white-kitten-being-examined-by-a-veterinator-5Bi6MWlWMbw
      src: "/images/home-work-vet.jpg",
      width: 1000,
      height: 667,
    },
    companionship: {
      // Photo source: https://unsplash.com/photos/a-person-petting-a-cat-on-the-ground-o2zCNeTgl40
      src: "/images/home-work-cat.jpg",
      width: 1000,
      height: 667,
    },
  },
  teamImage: {
    // Group photo supplied for the home team section.
    src: "/images/home-team.jpg",
    width: 6000,
    height: 4000,
  },
};
