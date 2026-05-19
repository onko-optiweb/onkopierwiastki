import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Brak pliku" }, { status: 400 });

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Plik za duży (maks. 10 MB)" }, { status: 413 });
  }

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

    // Generate filename
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const timestamp = Date.now();
    const fileName = `blog/${baseName}-${timestamp}.webp`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, webpBuffer, {
        contentType: "image/webp",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: `Błąd uploadu: ${uploadError.message}` }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    const url = urlData.publicUrl;
    const sizeKb = Math.round(webpBuffer.length / 1024);

    return NextResponse.json({ success: true, url, size: `${sizeKb} KB` });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Nieznany błąd";
    return NextResponse.json({ error: `Błąd przetwarzania: ${message}` }, { status: 500 });
  }
}
