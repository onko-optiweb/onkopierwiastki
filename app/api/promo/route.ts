import { NextRequest, NextResponse } from "next/server";
import { validatePromoCode } from "@/src/actions/orders";

// Simple in-memory rate limiting (10 attempts per IP per 15 min)
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 15 * 60 * 1000; // 15 min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { valid: false, error: "Zbyt wiele prób. Spróbuj ponownie za kilka minut." },
        { status: 429 }
      );
    }

    const { code, price } = await request.json();

    if (!code || !price) {
      return NextResponse.json({ valid: false, error: "Brak kodu lub ceny" }, { status: 400 });
    }

    const result = await validatePromoCode(code, price);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ valid: false, error: "Błąd serwera" }, { status: 500 });
  }
}
