"use client";

import { useState, type FormEvent } from "react";
import { localizedRoute, routePaths } from "@/lib/routes";
import QRCode from "qrcode";
import { ActionButton } from "@/components/ui/action-button";
import type { Locale } from "@/i18n/routing";
import { QR_SOURCE_QUERY_PARAM } from "@/lib/qr-source";

export function QrCodeGenerator({ locale }: { locale: Locale }) {
  const [locationName, setLocationName] = useState("");
  const [format, setFormat] = useState<"png" | "svg">("png");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = locationName.trim().replace(/\s+/g, " ");
    if (!name) return;

    setIsGenerating(true);
    setError("");
    setSuccess("");
    try {
      const target = new URL(localizedRoute(locale, routePaths.mirleft), window.location.origin);
      target.searchParams.set(QR_SOURCE_QUERY_PARAM, name);
      const qrSvg = await QRCode.toString(target.toString(), {
        type: "svg",
        errorCorrectionLevel: "H",
        margin: 2,
        width: 320,
        color: { dark: "#2C1810", light: "#FFFFFF" },
      });
      const viewBox = qrSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
      if (!viewBox) throw new Error("Could not read the QR code dimensions.");
      const offsetX = (Number(viewBox[1]) - 45) / 2;
      const offsetY = (Number(viewBox[2]) - 45) / 2;
      const paw =
        `<g transform="translate(${offsetX} ${offsetY})"><rect x="18.25" y="18.25" width="8.5" height="8.5" rx="1.4" fill="#FFFFFF"/><g fill="#5A1F08"><ellipse cx="19.7" cy="21" rx="0.85" ry="1.1"/><ellipse cx="21.6" cy="20.2" rx="0.85" ry="1.1"/><ellipse cx="23.4" cy="20.2" rx="0.85" ry="1.1"/><ellipse cx="25.3" cy="21" rx="0.85" ry="1.1"/><path d="M22.5 21.7c-1.35 0-3.35 2.05-3.35 3.35 0 1.05.95 1.55 1.95 1.2.45-.18.9-.25 1.4-.25s.95.07 1.4.25c1 .35 1.95-.15 1.95-1.2 0-1.3-2-3.35-3.35-3.35Z"/></g></g>`;
      const svg = qrSvg.replace("</svg>", `${paw}</svg>`);
      const file =
        format === "png" ? await svgToPng(svg) : new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const fileUrl = URL.createObjectURL(file);
      const download = document.createElement("a");
      download.href = fileUrl;
      download.download = `${fileNameFor(name)}-qr.${format}`;
      document.body.append(download);
      download.click();
      download.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
      setSuccess(`${format.toUpperCase()} QR code downloaded for ${name}.`);
    } catch {
      setError("Could not generate the QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <h4 className="font-semibold text-heading">Generate a QR code</h4>
      <p className="mt-1 text-sm">
        Enter where the code will be placed. Its scans will appear in QR locations.
      </p>
      <form onSubmit={generate} className="mt-3 flex flex-wrap items-end gap-3">
        <label className="min-w-52 flex-1 font-semibold">
          Location name
          <input
            type="text"
            value={locationName}
            onChange={(event) => setLocationName(event.target.value)}
            maxLength={80}
            required
            className="mt-2 min-h-12 w-full rounded-xl border border-border bg-surface px-4 font-normal"
            placeholder="e.g. Mirleft market"
          />
        </label>
        <label className="font-semibold">
          File format
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value as "png" | "svg")}
            className="mt-2 block min-h-12 w-full rounded-xl border border-border bg-surface px-4 font-normal"
          >
            <option value="png">PNG image</option>
            <option value="svg">SVG vector</option>
          </select>
        </label>
        <ActionButton type="submit" variant="secondary" disabled={isGenerating}>
          {isGenerating ? "Generating…" : "Generate and download"}
        </ActionButton>
      </form>
      {error && (
        <p role="alert" className="mt-3 text-sm text-primary-hover">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="mt-3 text-sm text-muted-foreground">
          {success}
        </p>
      )}
    </div>
  );
}

async function svgToPng(svg: string) {
  const svgUrl = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );
  try {
    const image = new Image();
    const loaded = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Could not render the QR code."));
    });
    image.src = svgUrl;
    await loaded;

    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 960;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not render the QR code.");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not create the PNG file."));
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

function fileNameFor(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "location"
  );
}
