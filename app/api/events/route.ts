import { db } from "@/lib/db";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
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
