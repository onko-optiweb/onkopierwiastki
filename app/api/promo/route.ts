import { NextRequest, NextResponse } from "next/server";
import { validatePromoCode } from "@/src/actions/orders";

export async function POST(request: NextRequest) {
  try {
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
