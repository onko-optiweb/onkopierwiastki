"use server";

import { prisma } from "@/src/lib/prisma";
import { createPayuOrder, isPayuEnabled, getPayuOrderStatus } from "@/src/lib/payu";
import { sendOrderNotification, sendOrderConfirmation } from "@/src/lib/email";
import { headers } from "next/headers";
import { z } from "zod";

// ─── Schema zamówienia ───
const createOrderSchema = z.object({
  firstName: z.string().min(2, "Imię jest wymagane"),
  lastName: z.string().min(2, "Nazwisko jest wymagane"),
  email: z.string().email("Nieprawidłowy adres email"),
  phone: z.string().min(7, "Nieprawidłowy numer telefonu"),
  address: z.string().min(5, "Adres jest wymagany"),
  pesel: z.string().optional().default(""),
  noPesel: z.boolean().optional().default(false),
  needInvoice: z.boolean().optional().default(false),
  companyName: z.string().optional().default(""),
  nip: z.string().optional().default(""),
  panelType: z.enum(["PROFILAKTYKA", "ONKOLOGICZNY"]),
  panelTier: z.enum(["PODSTAWOWY", "ROZSZERZONY"]),
  material: z.string(),
  elements: z.string(),
  facilityId: z.number().nullable(),
  isOnline: z.boolean(),
  price: z.number().int().positive(),
  promoCode: z.string().optional().nullable(),
  acceptTerms: z.literal(true, {
    error: "Musisz zaakceptować regulamin",
  }),
  acceptMarketing: z.boolean().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// ─── Cennik serwerowy (źródło prawdy) ───
const SERVER_PRICES: Record<string, Record<string, number>> = {
  PROFILAKTYKA: { PODSTAWOWY: 20000, ROZSZERZONY: 23000 },
  ONKOLOGICZNY: { PODSTAWOWY: 20000, ROZSZERZONY: 23000 },
};

function getValidPrice(panelType: string, panelTier: string): number | null {
  return SERVER_PRICES[panelType]?.[panelTier] ?? null;
}

// ─── Generowanie numeru zamówienia ───
async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ONK-${year}-`;

  const lastOrder = await prisma.order.findFirst({
    where: { id: { startsWith: "" } },
    orderBy: { createdAt: "desc" },
  });

  // Count existing orders this year
  const count = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(`${year}-01-01`),
      },
    },
  });

  return `${prefix}${String(count + 1).padStart(4, "0")}`;
}

// ─── Walidacja kodu rabatowego ───
export async function validatePromoCode(code: string, price: number) {
  try {
    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo) return { valid: false, error: "Nieprawidłowy kod rabatowy" };
    if (!promo.active) return { valid: false, error: "Nieprawidłowy kod rabatowy" };
    if (promo.validUntil && promo.validUntil < new Date())
      return { valid: false, error: "Nieprawidłowy kod rabatowy" };
    if (promo.validFrom > new Date())
      return { valid: false, error: "Nieprawidłowy kod rabatowy" };
    if (promo.maxUses && promo.usedCount >= promo.maxUses)
      return { valid: false, error: "Nieprawidłowy kod rabatowy" };

    let discount = 0;
    if (promo.type === "PERCENT") {
      discount = Math.round((price * promo.value) / 100);
    } else {
      discount = promo.value; // FIXED — wartość w groszach
    }

    // Nie pozwól na rabat większy niż cena
    discount = Math.min(discount, price);

    return {
      valid: true,
      promoCodeId: promo.id,
      discount,
      label:
        promo.type === "PERCENT"
          ? `-${promo.value}%`
          : `-${(promo.value / 100).toFixed(0)} zł`,
    };
  } catch {
    return { valid: false, error: "Błąd walidacji kodu" };
  }
}

// ─── Tworzenie zamówienia ───
export async function createOrder(data: CreateOrderInput) {
  try {
    const parsed = createOrderSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Błąd walidacji",
      };
    }

    const {
      acceptTerms: _,
      acceptMarketing: _m,
      promoCode,
      ...orderData
    } = parsed.data;

    // Walidacja ceny — serwer wyznacza cenę, nie klient
    const validPrice = getValidPrice(orderData.panelType, orderData.panelTier);
    if (!validPrice) {
      return { success: false, error: "Nieprawidłowy typ panelu" };
    }
    if (orderData.price !== validPrice) {
      console.error(`Price tampering: client=${orderData.price}, expected=${validPrice}`);
      orderData.price = validPrice;
    }

    // Walidacja placówki
    if (orderData.facilityId) {
      const facility = await prisma.facility.findUnique({
        where: { id: orderData.facilityId },
      });
      if (!facility || !facility.active) {
        return { success: false, error: "Wybrana placówka jest niedostępna" };
      }
    }

    // Walidacja kodu rabatowego
    let promoCodeId: string | null = null;
    let discount = 0;

    if (promoCode) {
      const promoResult = await validatePromoCode(promoCode, orderData.price);
      if (promoResult.valid && promoResult.promoCodeId) {
        promoCodeId = promoResult.promoCodeId;
        discount = promoResult.discount!;
      }
    }

    const orderNumber = await generateOrderNumber();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://onkopierwiastki.pl";

    const order = await prisma.order.create({
      data: {
        ...orderData,
        promoCodeId,
        discount,
        status: "PENDING",
        payments: {
          create: {},
        },
      },
      include: { payments: true },
    });

    // Zwiększ licznik użyć kodu rabatowego
    if (promoCodeId) {
      await prisma.promoCode.update({
        where: { id: promoCodeId },
        data: { usedCount: { increment: 1 } },
      });
    }

    // PayU
    let redirectUrl: string | undefined;

    if (isPayuEnabled()) {
      try {
        const headersList = await headers();
        const ip =
          headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          headersList.get("x-real-ip") ||
          "127.0.0.1";

        const finalPrice = orderData.price - discount;
        const panelName =
          `${orderData.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} — ${orderData.panelTier.toLowerCase()}`;

        const payuResult = await createPayuOrder({
          orderNumber,
          totalAmount: finalPrice,
          products: [
            {
              name: `Panel ${panelName}`,
              unitPrice: String(finalPrice),
              quantity: "1",
            },
          ],
          buyer: {
            email: orderData.email,
            phone: orderData.phone,
            firstName: orderData.firstName,
            lastName: orderData.lastName,
            language: "pl",
          },
          continueUrl: `${siteUrl}/zamowienie/${order.id}`,
          notifyUrl: `${siteUrl}/api/payu/notify`,
          customerIp: ip,
          description: `Onkopierwiastki — ${panelName}`,
        });

        // Save PayU order ID
        await prisma.order.update({
          where: { id: order.id },
          data: { payuOrderId: payuResult.orderId },
        });

        if (order.payments[0]) {
          await prisma.payment.update({
            where: { id: order.payments[0].id },
            data: {
              payuOrderId: payuResult.orderId,
              status: "NEW",
              amount: finalPrice,
            },
          });
        }

        redirectUrl = payuResult.redirectUri;
      } catch (payuError) {
        console.error("PayU createOrder error:", payuError);
      }
    }

    // E-mail notifications (fire and forget)
    const facility = orderData.facilityId
      ? await prisma.facility.findUnique({
          where: { id: orderData.facilityId },
          select: { name: true, address: true, postalCode: true, city: true, phone: true, hours: true },
        })
      : null;

    const emailData = {
      id: order.id,
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      email: orderData.email,
      phone: orderData.phone,
      panelType: orderData.panelType,
      panelTier: orderData.panelTier,
      price: orderData.price,
      discount,
      isOnline: orderData.isOnline,
      facilityName: facility?.name,
      facilityAddress: facility ? `${facility.address}, ${facility.postalCode} ${facility.city}` : undefined,
      facilityPhone: facility?.phone,
      facilityHours: facility?.hours,
    };

    sendOrderNotification(emailData).catch(() => {});
    sendOrderConfirmation(emailData).catch(() => {});

    return {
      success: true,
      data: {
        orderId: order.id,
        orderNumber,
        redirectUrl,
      },
    };
  } catch (e) {
    console.error("createOrder error:", e);
    return { success: false, error: "Nie udało się złożyć zamówienia" };
  }
}

// ─── Auto-anulowanie starych zamówień ───
const AUTO_CANCEL_AFTER_MS = 60 * 60 * 1000; // 1 godzina

async function autoCancelIfStale(order: {
  id: string;
  status: string;
  createdAt: Date;
  payuOrderId?: string | null;
}): Promise<"CANCELLED" | "PAID" | null> {
  if (order.status !== "PENDING") return null;

  const age = Date.now() - new Date(order.createdAt).getTime();
  if (age < AUTO_CANCEL_AFTER_MS) return null;

  // Sprawdź w PayU czy przypadkiem nie opłacone
  if (order.payuOrderId) {
    const payuStatus = await getPayuOrderStatus(order.payuOrderId);
    if (payuStatus === "COMPLETED") {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID", paidAt: new Date() },
      });
      return "PAID";
    }
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "CANCELLED" },
  });

  return "CANCELLED";
}

// Batch: anuluj wszystkie stare PENDING zamówienia
export async function autoCancelStaleOrders() {
  const cutoff = new Date(Date.now() - AUTO_CANCEL_AFTER_MS);
  const staleOrders = await prisma.order.findMany({
    where: { status: "PENDING", createdAt: { lt: cutoff } },
    select: { id: true, status: true, createdAt: true, payuOrderId: true },
  });

  for (const order of staleOrders) {
    await autoCancelIfStale(order);
  }
}

// ─── Status zamówienia (publiczny) ───
export async function getOrderStatus(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        panelType: true,
        panelTier: true,
        price: true,
        discount: true,
        createdAt: true,
        paidAt: true,
        payuOrderId: true,
        payments: {
          select: {
            payuOrderId: true,
            status: true,
            method: true,
          },
          take: 1,
        },
      },
    });

    if (!order) return { success: false, error: "Zamówienie nie znalezione" };

    // Auto-anuluj jeśli PENDING > 1h
    const cancelled = await autoCancelIfStale(order);
    if (cancelled) {
      order.status = "CANCELLED";
    }

    return { success: true, data: order };
  } catch {
    return { success: false, error: "Błąd pobierania zamówienia" };
  }
}
