import { db } from "@/lib/db";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    const requestUrl = new URL(request.url);
    const host =
      request.headers.get("x-forwarded-host")?.split(",", 1)[0].trim() ||
      request.headers.get("host") ||
      requestUrl.host;
    const protocol =
      request.headers.get("x-forwarded-proto")?.split(",", 1)[0].trim() ||
      requestUrl.protocol.slice(0, -1);

    try {
      const originUrl = new URL(origin);
      if (originUrl.host !== host || originUrl.protocol !== `${protocol}:`)
        return new Response(null, { status: 403 });
    } catch {
      return new Response(null, { status: 403 });
    }
  }
  if (Number(request.headers.get("content-length") || "0") > 1000)
    return new Response(null, { status: 413 });
  let payload: { kind?: unknown; path?: unknown; source?: unknown };
  try {
    const body = await request.text();
    if (body.length > 1000) return new Response(null, { status: 413 });
    payload = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (
    payload.kind !== "view" &&
    payload.kind !== "donate" &&
    payload.kind !== "whatsapp"
  )
    return new Response(null, { status: 400 });
  if (
    typeof payload.path !== "string" ||
    !/^\/(en|fr|de|ar)(\/[-a-z0-9/]*)?$/.test(payload.path)
  )
    return new Response(null, { status: 400 });
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country");
  const source =
    typeof payload.source === "string" &&
    /^[a-z0-9-]{1,40}$/.test(payload.source)
      ? payload.source
      : null;
  db()
    .prepare(
      "INSERT INTO events (kind, path, country, source) VALUES (?, ?, ?, ?)",
    )
    .run(
      payload.kind,
      payload.path,
      country && /^[A-Z]{2}$/.test(country) ? country : null,
      source,
    );
  return new Response(null, { status: 204 });
}
