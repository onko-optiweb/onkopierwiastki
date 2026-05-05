import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const validStatuses = ["PENDING", "PAID", "PROCESSING", "COMPLETED", "CANCELLED", "REFUNDED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.order.update({
    where: { id },
    data: {
      status,
      ...(status === "PAID" ? { paidAt: new Date() } : {}),
    },
  });

  return NextResponse.json({ success: true });
}
