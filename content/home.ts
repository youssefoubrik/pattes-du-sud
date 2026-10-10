type HomeImage = {
  src: string;
  width: number;
  height: number;
};

type HomeContent = {
  introductionImage: HomeImage;
  workImage: HomeImage;
};

export const homeContent: HomeContent = {
  introductionImage: {
    // TODO: replace with a real association photo.
    // Photo source: https://images.unsplash.com/photo-1532666731504-52cd5e6b54dd
    src: "/images/home-introduction.jpg",
    width: 1200,
    height: 800,
  },
  workImage: {
    // TODO: replace with a real photo of the association’s work.
    // Photo source: https://www.pexels.com/photo/photo-of-person-feeding-dog-outside-1868860/
    src: "/images/home-work.jpg",
    width: 1200,
    height: 1800,
  },
};
