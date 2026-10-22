export type SpeciesFilter = "all" | "dog" | "cat";
export type StatusFilter = "all" | "available" | "adopted";

export function createGalleryUrl(
  pathname: string,
  search: string,
  species: SpeciesFilter,
  status: StatusFilter,
  page: number,
) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (species !== "all") params.set("species", species);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
