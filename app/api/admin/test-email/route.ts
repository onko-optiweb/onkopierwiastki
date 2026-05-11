import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import nodemailer from "nodemailer";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { to, type } = await request.json();
  if (!to) return NextResponse.json({ error: "Brak adresu e-mail" }, { status: 400 });

  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  if (!settings?.smtpHost || !settings.smtpUser || !settings.smtpPassword) {
    return NextResponse.json({ error: "SMTP nie jest skonfigurowane" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort || 587,
    secure: settings.smtpSecure,
    auth: { user: settings.smtpUser, pass: settings.smtpPassword },
  });

  const from = settings.smtpFrom || settings.smtpUser;

  try {
    if (type === "connection") {
      await transporter.verify();
      return NextResponse.json({ success: true, message: "Połączenie SMTP działa poprawnie" });
    }

    if (type === "confirmation") {
      const introText = settings.emailIntroText || "Dziękujemy za zamówienie! Twoje zamówienie zostało przyjęte.";
      const facilityInstruction = settings.emailFacilityText || "Zadzwoń do placówki podanej poniżej i umów się na termin pobrania krwi.";
      const footerText = settings.emailFooterText || "Innowacyjna Medycyna sp. z o.o. · www.onkopierwiastki.pl · kontakt@onkopierwiastki.pl";
      const subject = settings.emailSubjectConfirmation || "Potwierdzenie zamówienia — Onkopierwiastki.pl";

      await transporter.sendMail({
        from,
        to,
        subject: `[TEST] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <p style="background: #fef3cd; color: #856404; padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;">To jest testowy e-mail — żadne zamówienie nie zostało złożone.</p>
            <h2 style="color: #122056;">${introText.split('.')[0]}!</h2>
            <p>Cześć Jan,</p>
            <p>${introText}</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0;">
              <tr><td style="padding: 8px 0; color: #8a8fa6;">Panel badawczy</td><td style="padding: 8px 0;"><strong>Profilaktyczny — rozszerzony</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #8a8fa6;">Kwota</td><td style="padding: 8px 0;"><strong>230,00 zł</strong></td></tr>
            </table>
            <div style="background: #f0f1ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #122056; margin: 0 0 8px 0; font-size: 16px;">Umów się na pobranie krwi</h3>
              <p style="color: #8a8fa6; font-size: 13px; margin: 0 0 16px 0;">${facilityInstruction}</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #8a8fa6; width: 90px;">Placówka</td><td style="padding: 6px 0;"><strong style="color: #122056;">ALAB Laboratoria (przykład)</strong></td></tr>
                <tr><td style="padding: 6px 0; color: #8a8fa6;">Adres</td><td style="padding: 6px 0; color: #122056;">ul. Przykładowa 10, 70-001 Szczecin</td></tr>
                <tr><td style="padding: 6px 0; color: #8a8fa6;">Telefon</td><td style="padding: 6px 0;"><a href="tel:+48910000000" style="color: #5B65DC; font-weight: bold; font-size: 16px; text-decoration: none;">+48 91 000 00 00</a></td></tr>
                <tr><td style="padding: 6px 0; color: #8a8fa6;">Godziny</td><td style="padding: 6px 0; color: #122056;">pon–pt 7:00–15:00</td></tr>
              </table>
            </div>
            <p style="margin-top: 20px;">
              <a href="https://onkopierwiastki.pl" style="background: #EEEFFD; color: #122056; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
                Pobierz potwierdzenie zamówienia
              </a>
            </p>
            <p style="color: #8a8fa6; font-size: 12px; margin-top: 30px;">${footerText}</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: "Testowy e-mail potwierdzenia wysłany" });
    }

    if (type === "notification") {
      await transporter.sendMail({
        from,
        to,
        subject: "[TEST] Nowe zamówienie — Jan Kowalski (230,00 zł)",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <p style="background: #fef3cd; color: #856404; padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;">To jest testowy e-mail — żadne zamówienie nie zostało złożone.</p>
            <h2 style="color: #122056;">Nowe zamówienie</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #8a8fa6;">Klient</td><td style="padding: 8px 0;"><strong>Jan Kowalski</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #8a8fa6;">E-mail</td><td style="padding: 8px 0;">jan@example.com</td></tr>
              <tr><td style="padding: 8px 0; color: #8a8fa6;">Telefon</td><td style="padding: 8px 0;">+48 600 000 000</td></tr>
              <tr><td style="padding: 8px 0; color: #8a8fa6;">Panel</td><td style="padding: 8px 0;">Profilaktyczny — rozszerzony</td></tr>
              <tr><td style="padding: 8px 0; color: #8a8fa6;">Placówka</td><td style="padding: 8px 0;">ALAB Laboratoria (przykład)</td></tr>
              <tr><td style="padding: 8px 0; color: #8a8fa6;">Kwota</td><td style="padding: 8px 0;"><strong>230,00 zł</strong></td></tr>
            </table>
            <p style="margin-top: 20px;">
              <a href="https://onkopierwiastki.pl/admin" style="background: #5B65DC; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px;">
                Zobacz zamówienie
              </a>
            </p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: "Testowy e-mail powiadomienia wysłany" });
    }

    return NextResponse.json({ error: "Nieznany typ testu" }, { status: 400 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Nieznany błąd";
    return NextResponse.json({ error: `Błąd wysyłki: ${message}` }, { status: 500 });
  }
}
