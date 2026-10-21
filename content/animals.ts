export type AnimalPhoto = {
  src: string;
  alt?: string;
  objectPosition?: string;
};

export type Animal = {
  name: string;
  species: "dog" | "cat";
  status: "available" | "inCare" | "adopted";
  ageYears?: number;
  personality?: "gentle" | "playful" | "curious" | "shy";
  personalityCustom?: string;
  photos: AnimalPhoto[];
  addedAt: string;
  featuredOrder?: number;
};

// TODO: replace these sample profiles and stock photos with confirmed association records.
// Stock photos: https://www.pexels.com/photo/{photo-id}/
// Photo IDs in profile order: 1805164, 1170986, 1851164, 617278, 2253275, 127028.
export const animals: Animal[] = [
  {
    name: "Luna", species: "dog", status: "available", ageYears: 3, personality: "gentle",
    photos: [
      { src: "/images/animals/luna.jpg", alt: "A tan dog resting on a white blanket by a window." },
      { src: "/images/animals/jack.jpg", alt: "A golden dog sitting indoors." },
    ],
    addedAt: "2026-10-06",
  },
  {
    name: "Milo", species: "cat", status: "available", ageYears: 2, personality: "curious",
    photos: [
      { src: "/images/animals/milo.jpg", alt: "An orange tabby cat sitting indoors." },
      { src: "/images/animals/sami.jpg", alt: "A tabby cat with bright green eyes resting in a dark space." },
    ],
    addedAt: "2026-10-05",
  },
  {
    name: "Nala", species: "dog", status: "inCare", personality: "shy",
    photos: [
      { src: "/images/animals/nala.jpg", alt: "A black dog looking up at the camera." },
      { src: "/images/animals/luna.jpg", alt: "A tan dog resting on a white blanket by a window." },
    ],
    addedAt: "2026-10-04",
  },
  {
    name: "Sami", species: "cat", status: "adopted", ageYears: 4, personality: "gentle",
    photos: [
      { src: "/images/animals/sami.jpg", alt: "A tabby cat with bright green eyes resting in a dark space." },
      { src: "/images/animals/milo.jpg", alt: "An orange tabby cat sitting indoors." },
    ],
    addedAt: "2026-10-03",
  },
  {
    name: "Jack", species: "dog", status: "adopted", ageYears: 3, personality: "playful",
    photos: [
      { src: "/images/animals/jack.jpg", alt: "A golden dog sitting indoors." },
      { src: "/images/animals/nala.jpg", alt: "A black dog looking up at the camera." },
    ],
    addedAt: "2026-10-02",
  },
  {
    name: "Mimi", species: "cat", status: "available", personality: "playful",
    photos: [
      { src: "/images/animals/mimi.jpg", alt: "A grey kitten with blue eyes on a soft blanket." },
      { src: "/images/animals/milo.jpg", alt: "An orange tabby cat sitting indoors." },
    ],
    addedAt: "2026-10-01",
  },
  {
    name: "Biscuit", species: "dog", status: "available", ageYears: 2, personality: "playful",
    photos: [
      { src: "/images/animals/jack.jpg", alt: "A golden dog sitting indoors." },
      { src: "/images/animals/luna.jpg", alt: "A tan dog resting on a white blanket by a window." },
    ],
    addedAt: "2026-10-12",
  },
  {
    name: "Pepper", species: "cat", status: "available", ageYears: 1, personality: "curious",
    photos: [
      { src: "/images/animals/milo.jpg", alt: "An orange tabby cat sitting indoors." },
      { src: "/images/animals/mimi.jpg", alt: "A grey kitten with blue eyes on a soft blanket." },
    ],
    addedAt: "2026-10-11",
  },
  {
    name: "Rosie", species: "dog", status: "inCare", ageYears: 4, personality: "gentle",
    photos: [
      { src: "/images/animals/luna.jpg", alt: "A tan dog resting on a white blanket by a window." },
      { src: "/images/animals/nala.jpg", alt: "A black dog looking up at the camera." },
    ],
    addedAt: "2026-10-10",
  },
  {
    name: "Olive", species: "cat", status: "adopted", ageYears: 3, personality: "shy",
    photos: [
      { src: "/images/animals/sami.jpg", alt: "A tabby cat with bright green eyes resting in a dark space." },
      { src: "/images/animals/mimi.jpg", alt: "A grey kitten with blue eyes on a soft blanket." },
    ],
    addedAt: "2026-10-09",
  },
  {
    name: "Maple", species: "dog", status: "adopted", ageYears: 5, personality: "gentle",
    photos: [
      { src: "/images/animals/nala.jpg", alt: "A black dog looking up at the camera." },
      { src: "/images/animals/jack.jpg", alt: "A golden dog sitting indoors." },
    ],
    addedAt: "2026-10-08",
  },
  {
    name: "Pistachio", species: "cat", status: "available", ageYears: 2, personality: "playful",
    photos: [
      { src: "/images/animals/mimi.jpg", alt: "A grey kitten with blue eyes on a soft blanket." },
      { src: "/images/animals/sami.jpg", alt: "A tabby cat with bright green eyes resting in a dark space." },
    ],
    addedAt: "2026-10-07",
  },
];

export const paginationSampleAnimals = animals.slice(6);

export function getHomepageAnimals<T extends Animal>(records: readonly T[]): T[];
export function getHomepageAnimals(): Animal[];
export function getHomepageAnimals(records: readonly Animal[] = animals): Animal[] {
  const sorted = [...records].sort((a, b) =>
    (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity) || b.addedAt.localeCompare(a.addedAt)
  );
  const selected = sorted.slice(0, 6);
  // Keep both species visible when records exist, without adding duplicate profiles.
  for (const species of ["dog", "cat"] as const) {
    if (selected.some((animal) => animal.species === species)) continue;
    const candidate = sorted.find((animal) => animal.species === species);
    if (candidate && selected.length) selected[selected.length - 1] = candidate;
  }
  return selected;
}
