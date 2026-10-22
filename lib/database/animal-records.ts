import "server-only";
import type { AnimalSpeciesFilter, AnimalStatusFilter } from "@/domain/animal";
import { ANIMAL_NAME_MAX_LENGTH } from "@/lib/animal-limits";
import { db } from "./connection";
import { parseAnimalData, type EditableAnimal } from "./animal-data";
import { pruneUploadedMedia } from "./uploaded-media";

export type { EditableAnimal } from "./animal-data";

export function getAnimals(): EditableAnimal[] {
  return (db().prepare("SELECT id, data FROM animals ORDER BY updated_at DESC").all() as { id: number; data: string }[])
    .map(({ id, data }) => ({ ...parseAnimalData(data), id }));
}

export function getAnimalsPage(search: string, pageSize: number, requestedPage: number) {
  const database = db();
  const term = search.trim().slice(0, ANIMAL_NAME_MAX_LENGTH);
  const total = (database.prepare("SELECT COUNT(*) AS count FROM animals WHERE instr(lower(json_extract(data, '$.name')), lower(?)) > 0").get(term) as { count: number }).count;
  const pageCount = Math.ceil(total / pageSize);
  const page = Math.min(Math.max(requestedPage, 1), Math.max(pageCount, 1));
  const rows = database.prepare("SELECT id, data FROM animals WHERE instr(lower(json_extract(data, '$.name')), lower(?)) > 0 ORDER BY updated_at DESC LIMIT ? OFFSET ?")
    .all(term, pageSize, (page - 1) * pageSize) as { id: number; data: string }[];
  return { animals: rows.map(({ id, data }) => ({ ...parseAnimalData(data), id })), total, page, pageCount };
}

export function getPublicAnimalsPage(search: string, species: AnimalSpeciesFilter, status: AnimalStatusFilter, pageSize: number, requestedPage: number) {
  const database = db();
  const conditions = ["instr(lower(json_extract(data, '$.name')), lower(?)) > 0"];
  const values: (string | number)[] = [search.trim().slice(0, ANIMAL_NAME_MAX_LENGTH)];
  if (species !== "all") { conditions.push("json_extract(data, '$.species') = ?"); values.push(species); }
  if (status !== "all") { conditions.push("json_extract(data, '$.status') = ?"); values.push(status); }
  const where = conditions.join(" AND ");
  const total = (database.prepare(`SELECT COUNT(*) AS count FROM animals WHERE ${where}`).get(...values) as { count: number }).count;
  const pageCount = Math.ceil(total / pageSize);
  const page = Math.min(Math.max(requestedPage, 1), Math.max(pageCount, 1));
  const rows = database.prepare(`SELECT id, data FROM animals WHERE ${where} ORDER BY json_extract(data, '$.addedAt') DESC, id DESC LIMIT ? OFFSET ?`)
    .all(...values, pageSize, (page - 1) * pageSize) as { id: number; data: string }[];
  return { animals: rows.map(({ id, data }) => ({ ...parseAnimalData(data), id })), total, page, pageCount };
}

export function getAnimal(id: number): EditableAnimal | undefined {
  const row = db().prepare("SELECT id, data FROM animals WHERE id = ?").get(id) as { id: number; data: string } | undefined;
  return row ? { ...parseAnimalData(row.data), id: row.id } : undefined;
}

export function saveAnimal(animal: Omit<EditableAnimal, "id"> & { id?: number }): number {
  const database = db();
  const { id, ...data } = animal;
  if (id !== undefined) {
    database.prepare("UPDATE animals SET data = ?, updated_at = ? WHERE id = ?").run(JSON.stringify(data), new Date().toISOString(), id);
    pruneUploadedMedia();
    return id;
  }
  const result = database.prepare("INSERT INTO animals (data, updated_at) VALUES (?, ?)").run(JSON.stringify(data), new Date().toISOString());
  pruneUploadedMedia();
  return Number(result.lastInsertRowid);
}

export function deleteAnimal(id: number) {
  db().prepare("DELETE FROM animals WHERE id = ?").run(id);
  pruneUploadedMedia();
}
