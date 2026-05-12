import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { createClient } from "@supabase/supabase-js";

const SENSITIVE_SETTINGS_KEYS = ["smtpPassword"];

function redactSettings(settings: Record<string, unknown>[]) {
  return settings.map((s) => {
    const safe = { ...s };
    for (const key of SENSITIVE_SETTINGS_KEYS) {
      if (key in safe) safe[key] = "***REDACTED***";
    }
    return safe;
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET — download fresh backup OR list stored backups
export async function GET(request: Request) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // List stored backups
  if (action === "list") {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: files, error } = await supabase.storage.from("backups").list(undefined, {
      sortBy: { column: "name", order: "desc" },
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const backups = (files || [])
      .filter((f) => f.name.endsWith(".json"))
      .map((f) => ({
        name: f.name,
        size: f.metadata?.size || 0,
        created: f.created_at,
      }));

    return NextResponse.json(backups);
  }

  // Download specific stored backup
  if (action === "download") {
    const file = searchParams.get("file");
    if (!file) return NextResponse.json({ error: "Missing file param" }, { status: 400 });

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data, error } = await supabase.storage.from("backups").download(file);

    if (error || !data) return NextResponse.json({ error: "File not found" }, { status: 404 });

    const text = await data.text();
    return new NextResponse(text, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${file}"`,
      },
    });
  }

  // Default: fresh backup from current DB
  const [facilities, promoCodes, orders, users, siteSettings] = await Promise.all([
    prisma.facility.findMany(),
    prisma.promoCode.findMany(),
    prisma.order.findMany({ include: { payments: true } }),
    prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } }),
    prisma.siteSettings.findMany(),
  ]);

  const backup = {
    version: 1,
    createdAt: new Date().toISOString(),
    data: { facilities, promoCodes, orders, users, siteSettings: redactSettings(siteSettings as unknown as Record<string, unknown>[]) },
  };

  return new NextResponse(JSON.stringify(backup, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="onkopierwiastki-backup-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  });
}

// POST — create manual backup and store in Supabase
export async function POST() {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const [facilities, promoCodes, orders, users, siteSettings] = await Promise.all([
    prisma.facility.findMany(),
    prisma.promoCode.findMany(),
    prisma.order.findMany({ include: { payments: true } }),
    prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } }),
    prisma.siteSettings.findMany(),
  ]);

  const backup = {
    version: 1,
    createdAt: new Date().toISOString(),
    data: { facilities, promoCodes, orders, users, siteSettings: redactSettings(siteSettings as unknown as Record<string, unknown>[]) },
  };

  const fileName = `backup-${new Date().toISOString().slice(0, 16).replace(/:/g, "-")}.json`;

  const { error } = await supabase.storage
    .from("backups")
    .upload(fileName, JSON.stringify(backup), {
      contentType: "application/json",
      upsert: true,
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, file: fileName });
}
