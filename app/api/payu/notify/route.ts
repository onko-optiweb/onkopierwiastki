import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { verifyPayuSignature } from "@/src/lib/payu";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signatureHeader = request.headers.get("OpenPayu-Signature") || "";

    // Verify signature
    const md5Key = process.env.PAYU_MD5_KEY;
    if (md5Key) {
      const valid = verifyPayuSignature(rawBody, signatureHeader, md5Key);
      if (!valid) {
        console.error("PayU webhook: invalid signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
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
    }

    return NextResponse.json({ status: "OK" });
  } catch (e) {
    console.error("PayU webhook error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
