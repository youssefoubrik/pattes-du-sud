import {
  pruneOldPageViews,
  recordPageView,
} from "@/lib/database/site-analytics";

const MAX_EVENT_BODY_BYTES = 1000;

async function readLimitedBody(request: Request): Promise<string | Response> {
  const contentLength = request.headers.get("content-length");
  if (contentLength !== null && Number(contentLength) > MAX_EVENT_BODY_BYTES)
    return new Response(null, { status: 413 });

  const reader = request.body?.getReader();
  if (!reader) return new Response(null, { status: 400 });

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_EVENT_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return new Response(null, { status: 413 });
      }
      chunks.push(value);
    }
  } catch {
    return new Response(null, { status: 400 });
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return new Response(null, { status: 400 });
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  const body = await readLimitedBody(request);
  if (body instanceof Response) return body;

  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed))
    return new Response(null, { status: 400 });
  const payload = parsed as {
    kind?: unknown;
    path?: unknown;
    qrSource?: unknown;
  };
  if (payload.kind !== "view") return new Response(null, { status: 400 });
  if (
    typeof payload.path !== "string" ||
    !/^\/(en|fr|de|ar)(\/[-a-z0-9/]*)?$/.test(payload.path)
  )
    return new Response(null, { status: 400 });
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country");
  const rawQrSource =
    typeof payload.qrSource === "string" ? payload.qrSource.trim() : "";
  const qrSource =
    rawQrSource.length > 0 &&
    rawQrSource.length <= 80 &&
    !/[\u0000-\u001f\u007f]/u.test(rawQrSource)
      ? rawQrSource.replace(/\s+/gu, " ")
      : null;
  pruneOldPageViews();
  recordPageView(
    payload.path,
    country && /^[A-Z]{2}$/.test(country) ? country : null,
    qrSource,
  );
  return new Response(null, { status: 204 });
}
