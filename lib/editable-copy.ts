import "server-only";
import { db } from "./db";

export type CopyNamespace = "home" | "about" | "pages";

export function getEditableCopy<T extends object>(
  namespace: CopyNamespace,
  locale: string,
  base: T,
): T {
  const row = db()
    .prepare("SELECT data FROM copy WHERE namespace = ? AND locale = ?")
    .get(namespace, locale) as { data: string } | undefined;
  if (!row) return base;
  try {
    return merge(base, JSON.parse(row.data));
  } catch {
    return base;
  }
}

function merge<T>(base: T, edit: unknown): T {
  if (typeof base === "string")
    return (typeof edit === "string" ? edit : base) as T;
  if (Array.isArray(base))
    return base.map((item, index) =>
      merge(item, Array.isArray(edit) ? edit[index] : undefined),
    ) as T;
  if (base && typeof base === "object") {
    const result = { ...base } as Record<string, unknown>;
    for (const key of Object.keys(result))
      result[key] = merge(
        result[key],
        edit && typeof edit === "object"
          ? (edit as Record<string, unknown>)[key]
          : undefined,
      );
    return result as T;
  }
  return base;
}

export function saveEditableCopy(
  namespace: CopyNamespace,
  locale: string,
  data: object,
) {
  db()
    .prepare(
      "INSERT INTO copy (namespace, locale, data) VALUES (?, ?, ?) ON CONFLICT(namespace, locale) DO UPDATE SET data=excluded.data",
    )
    .run(namespace, locale, JSON.stringify(data));
}

export function copyFields(
  base: unknown,
  prefix = "",
): { path: string; value: string }[] {
  if (typeof base === "string") return [{ path: prefix, value: base }];
  if (Array.isArray(base))
    return base.flatMap((value, index) =>
      copyFields(value, `${prefix}.${index}`),
    );
  if (base && typeof base === "object")
    return Object.entries(base).flatMap(([key, value]) =>
      copyFields(value, prefix ? `${prefix}.${key}` : key),
    );
  return [];
}

export function setCopyField(base: unknown, path: string, value: string) {
  const parts = path.split(".");
  let target = base as Record<string, unknown>;
  for (const part of parts.slice(0, -1))
    target = target[part] as Record<string, unknown>;
  target[parts.at(-1)!] = value;
}
