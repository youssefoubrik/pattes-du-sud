import type { AnimalSpeciesFilter, AnimalStatusFilter } from "@/domain/animal";

export function createGalleryUrl(
  pathname: string,
  search: string,
  species: AnimalSpeciesFilter,
  status: AnimalStatusFilter,
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
