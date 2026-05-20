import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month"); // format: 2026-05
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};

  if (month) {
    const [year, m] = month.split("-").map(Number);
    const from = new Date(year, m - 1, 1);
    const to = new Date(year, m, 1);
    where.createdAt = { gte: from, lt: to };
  }

  if (status && status !== "ALL") {
    where.status = status;
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { facility: true, promoCode: true },
  });

  const headers = [
    "Imię", "Nazwisko", "Email", "Adres", "Usługa", "Placówka", "Kwota (zł)", "Data opłacenia",
  ];

  const rows = orders
    .filter((o) => o.status === "PAID" || o.status === "PROCESSING" || o.status === "COMPLETED")
    .map((o) => [
      o.firstName,
      o.lastName,
      o.email,
      o.address,
      `${o.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} ${o.panelTier.toLowerCase()}`,
      o.isOnline ? "Online" : o.facility?.name || "-",
      ((o.price - o.discount) / 100).toFixed(2),
      o.paidAt ? o.paidAt.toLocaleDateString("pl-PL") : "-",
    ]);

  const escapeCsv = (val: string) => {
    if (val.includes(",") || val.includes('"') || val.includes("\n")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const csv = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map((v) => escapeCsv(String(v))).join(",")),
  ].join("\n");

  const bom = "\uFEFF"; // BOM for Excel Polish characters
  const filename = month ? `zamowienia-${month}.csv` : "zamowienia.csv";

  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
