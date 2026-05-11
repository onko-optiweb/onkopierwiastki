import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import sharp from "sharp";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Brak pliku" }, { status: 400 });

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Dozwolone formaty: JPG, PNG, WebP, GIF, AVIF" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert to WebP with sharp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 82 })
      .resize({ width: 1200, height: 800, fit: "inside", withoutEnlargement: true })
      .toBuffer();

    // Generate filename from original name
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const timestamp = Date.now();
    const fileName = `${baseName}-${timestamp}.webp`;

    // Save to public/images/blog/
    const dir = path.join(process.cwd(), "public", "images", "blog");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, fileName), webpBuffer);

    const url = `/images/blog/${fileName}`;
    const sizeKb = Math.round(webpBuffer.length / 1024);

    return NextResponse.json({ success: true, url, size: `${sizeKb} KB` });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Nieznany błąd";
    return NextResponse.json({ error: `Błąd przetwarzania: ${message}` }, { status: 500 });
  }
}
