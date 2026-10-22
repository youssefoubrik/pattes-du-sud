export function getPageContentFields(content: unknown, prefix = ""): { path: string; value: string }[] {
  if (typeof content === "string") return [{ path: prefix, value: content }];
  if (Array.isArray(content)) return content.flatMap((value, index) => getPageContentFields(value, `${prefix}.${index}`));
  if (content && typeof content === "object") return Object.entries(content).flatMap(([key, value]) => getPageContentFields(value, prefix ? `${prefix}.${key}` : key));
  return [];
}

export function setPageContentField(content: unknown, path: string, value: string) {
  const parts = path.split(".");
  let target = content as Record<string, unknown>;
  for (const part of parts.slice(0, -1)) target = target[part] as Record<string, unknown>;
  target[parts.at(-1)!] = value;
}
