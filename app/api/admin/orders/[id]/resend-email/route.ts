import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { sendOrderConfirmation, sendFacilityNotification } from "@/src/lib/email";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const { target } = await request.json();

  if (!target || !["customer", "facility"].includes(target)) {
    return NextResponse.json({ error: "Invalid target" }, { status: 400 });
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

  try {
    if (target === "customer") {
      await sendOrderConfirmation(emailData);
    } else if (target === "facility") {
      if (!order.facility?.email) {
        return NextResponse.json({ error: "Placówka nie ma adresu email" }, { status: 400 });
      }
      await sendFacilityNotification({
        ...emailData,
        facilityEmail: order.facility.email,
        facilityName: order.facility.name,
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Resend email error:", e);
    return NextResponse.json({ error: "Błąd wysyłki maila" }, { status: 500 });
  }
}
