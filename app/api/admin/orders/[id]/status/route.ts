import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { sendOrderConfirmation, sendOrderNotification, sendFacilityNotification } from "@/src/lib/email";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const { status } = await request.json();

  const validStatuses = ["PENDING", "PAID", "PROCESSING", "COMPLETED", "CANCELLED", "REFUNDED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      facility: {
        select: { name: true, address: true, postalCode: true, city: true, phone: true, hours: true, email: true },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const previousStatus = order.status;

  await prisma.order.update({
    where: { id },
    data: {
      status,
      ...(status === "PAID" ? { paidAt: new Date() } : {}),
    },
  });

  // Send emails when manually marking as PAID (same as PayU webhook)
  if (status === "PAID" && previousStatus !== "PAID") {
    const emailData = {
      id: order.id,
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      panelType: order.panelType,
      panelTier: order.panelTier,
      price: order.price,
      discount: order.discount,
      isOnline: order.isOnline,
      facilityName: order.facility?.name,
      facilityAddress: order.facility ? `${order.facility.address}, ${order.facility.postalCode} ${order.facility.city}` : undefined,
      facilityPhone: order.facility?.phone,
      facilityHours: order.facility?.hours,
    };

    sendOrderConfirmation(emailData).catch(() => {});
    sendOrderNotification(emailData).catch(() => {});
    if (!order.isOnline && order.facility?.email) {
      sendFacilityNotification({
        ...emailData,
        facilityEmail: order.facility.email,
        facilityName: order.facility.name,
      }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;

  // Delete payments first, then order
  await prisma.payment.deleteMany({ where: { orderId: id } });
  await prisma.order.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
