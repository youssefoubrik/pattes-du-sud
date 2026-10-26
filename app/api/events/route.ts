import { recordPageView } from "@/lib/database/site-analytics";

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
  if (payload.kind !== "view") return new Response(null, { status: 400 });
  if (
    typeof payload.path !== "string" ||
    !/^\/(en|fr|de|ar)(\/[-a-z0-9/]*)?$/.test(payload.path)
  )
    return new Response(null, { status: 400 });
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country");
  const rawSource =
    typeof payload.source === "string" ? payload.source.trim() : "";
  const source =
    rawSource.length > 0 &&
    rawSource.length <= 80 &&
    !/[\u0000-\u001f\u007f]/u.test(rawSource)
      ? rawSource.replace(/\s+/gu, " ")
      : null;
  recordPageView(
    payload.path,
    country && /^[A-Z]{2}$/.test(country) ? country : null,
    source,
  );
  return new Response(null, { status: 204 });
}
