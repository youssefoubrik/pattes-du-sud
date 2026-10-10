export type Animal = {
  slug: string;
  name: string;
  species: "dog" | "cat";
  status: "available" | "inCare" | "adopted";
  ageYears?: number;
  personality?: "gentle" | "playful" | "curious" | "shy";
  image: { src: string; objectPosition?: string };
  addedAt: string;
  featuredOrder?: number;
};

// TODO: replace these sample profiles and stock photos with confirmed association records.
// Stock photos: https://www.pexels.com/photo/{photo-id}/
// Photo IDs in profile order: 1805164, 1170986, 1851164, 617278, 2253275, 127028.
export const animals: Animal[] = [
  { slug: "luna", name: "Luna", species: "dog", status: "available", ageYears: 3, personality: "gentle", image: { src: "/images/animals/luna.jpg" }, addedAt: "2026-10-06" },
  { slug: "milo", name: "Milo", species: "cat", status: "available", ageYears: 2, personality: "curious", image: { src: "/images/animals/milo.jpg" }, addedAt: "2026-10-05" },
  { slug: "nala", name: "Nala", species: "dog", status: "inCare", personality: "shy", image: { src: "/images/animals/nala.jpg" }, addedAt: "2026-10-04" },
  { slug: "sami", name: "Sami", species: "cat", status: "adopted", ageYears: 4, personality: "gentle", image: { src: "/images/animals/sami.jpg" }, addedAt: "2026-10-03" },
  { slug: "jack", name: "Jack", species: "dog", status: "adopted", ageYears: 3, personality: "playful", image: { src: "/images/animals/toby.jpg" }, addedAt: "2026-10-02" },
  { slug: "mimi", name: "Mimi", species: "cat", status: "available", personality: "playful", image: { src: "/images/animals/mimi.jpg" }, addedAt: "2026-10-01" },
];

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
