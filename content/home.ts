type HomeContent = {
  introductionImage: {
    src: string;
    width: number;
    height: number;
  };
};

export const homeContent: HomeContent = {
  introductionImage: {
    // TODO: replace with a real association photo.
    // Photo source: https://images.unsplash.com/photo-1532666731504-52cd5e6b54dd
    src: "/images/home-introduction.jpg",
    width: 1200,
    height: 800,
  },
};
