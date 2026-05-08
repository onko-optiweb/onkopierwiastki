import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { createClient } from "@supabase/supabase-js";

const CRON_SECRET = process.env.CRON_SECRET;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "backups";
const MAX_AGE_DAYS = 30;

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // 1. Create backup
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
    data: { facilities, promoCodes, orders, users, siteSettings },
  };

  const fileName = `backup-${new Date().toISOString().slice(0, 10)}.json`;
  const content = JSON.stringify(backup);

  // 2. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, content, {
      contentType: "application/json",
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // 3. Delete backups older than 30 days
  const { data: files } = await supabase.storage.from(BUCKET).list();

  if (files) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - MAX_AGE_DAYS);

    const oldFiles = files.filter((f) => {
      const match = f.name.match(/backup-(\d{4}-\d{2}-\d{2})\.json/);
      if (!match) return false;
      return new Date(match[1]) < cutoff;
    });

    if (oldFiles.length > 0) {
      await supabase.storage.from(BUCKET).remove(oldFiles.map((f) => f.name));
    }
  }

  return NextResponse.json({ success: true, file: fileName });
}
