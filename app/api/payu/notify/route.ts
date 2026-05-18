import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { verifyPayuSignature } from "@/src/lib/payu";
import { sendOrderConfirmation, sendOrderNotification, sendFacilityNotification } from "@/src/lib/email";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signatureHeader = request.headers.get("OpenPayu-Signature") || "";

    // Verify signature (mandatory)
    const md5Key = process.env.PAYU_MD5_KEY;
    if (!md5Key) {
      console.error("PayU webhook: PAYU_MD5_KEY not configured");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 503 });
    }
    const valid = verifyPayuSignature(rawBody, signatureHeader, md5Key);
    if (!valid) {
      console.error("PayU webhook: invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const payuOrder = body.order;

    if (!payuOrder?.orderId || !payuOrder?.status) {
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }

    const payuOrderId = payuOrder.orderId;
    const payuStatus = payuOrder.status;

    // Find payment by PayU order ID
    const payment = await prisma.payment.findFirst({
      where: { payuOrderId },
      include: { order: true },
    });

    if (!payment) {
      console.error(`PayU webhook: payment not found for orderId ${payuOrderId}`);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Update payment record
    const updateData: Record<string, unknown> = {
      status: payuStatus,
    };

    if (payuOrder.payMethod?.type) {
      updateData.method = payuOrder.payMethod.type;
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: updateData,
    });

    // Map PayU status to Order status
    let orderStatus: "PENDING" | "PAID" | "CANCELLED" | undefined;
    if (payuStatus === "COMPLETED") {
      orderStatus = "PAID";
    } else if (payuStatus === "CANCELED") {
      orderStatus = "CANCELLED";
    }

    if (orderStatus) {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: {
          status: orderStatus,
          ...(orderStatus === "PAID" ? { paidAt: new Date() } : {}),
        },
      });

      // Send emails on successful payment
      if (orderStatus === "PAID") {
        const order = await prisma.order.findUnique({
          where: { id: payment.orderId },
          include: {
            facility: {
              select: { name: true, address: true, postalCode: true, city: true, phone: true, hours: true, email: true },
            },
          },
        });

        if (order) {
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

          // 1. Mail do klienta
          sendOrderConfirmation(emailData).catch(() => {});
          // 2. Mail do admina
          sendOrderNotification(emailData).catch(() => {});
          // 3. Mail do placówki (tylko jeśli nie online i placówka ma email)
          if (!order.isOnline && order.facility?.email) {
            sendFacilityNotification({
              ...emailData,
              facilityEmail: order.facility.email,
              facilityName: order.facility.name,
            }).catch(() => {});
          }
        }
      }
    }

    return NextResponse.json({ status: "OK" });
  } catch (e) {
    console.error("PayU webhook error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
