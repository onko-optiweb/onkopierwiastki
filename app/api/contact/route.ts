import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/src/lib/prisma';
import { verifyRecaptchaToken } from '@/src/lib/recaptcha';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  try {
    const { name, postalCode, city, phone, recaptchaToken } = await req.json();

    if (!name || !city || !phone) {
      return NextResponse.json({ error: 'Uzupełnij wymagane pola.' }, { status: 400 });
    }

    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'main' },
      select: { smtpHost: true, smtpPort: true, smtpUser: true, smtpPassword: true, smtpSecure: true, smtpFrom: true, recaptchaEnabled: true, recaptchaSiteKey: true, recaptchaSecretKey: true },
    });

    // reCAPTCHA verification
    if (settings?.recaptchaEnabled && settings.recaptchaSecretKey && settings.recaptchaSiteKey) {
      if (!recaptchaToken) {
        return NextResponse.json({ error: 'Weryfikacja reCAPTCHA nie powiodła się.' }, { status: 400 });
      }
      const { valid } = await verifyRecaptchaToken(recaptchaToken, 'CONTACT', settings.recaptchaSecretKey, settings.recaptchaSiteKey);
      if (!valid) {
        return NextResponse.json({ error: 'Weryfikacja reCAPTCHA nie powiodła się.' }, { status: 403 });
      }
    }

    if (!settings?.smtpHost || !settings.smtpUser || !settings.smtpPassword) {
      return NextResponse.json({ error: 'Błąd konfiguracji serwera.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort || 587,
      secure: settings.smtpSecure,
      auth: { user: settings.smtpUser, pass: settings.smtpPassword },
    });

    await transporter.sendMail({
      from: settings.smtpFrom || settings.smtpUser,
      to: 'info@onkopierwiastki.pl',
      subject: `Zapytanie o placówkę — ${escapeHtml(name)}, ${escapeHtml(city)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #122056;">Nowe zapytanie — brak placówki w mieście</h2>
          <p style="color: #8a8fa6; font-size: 14px;">Osoba zainteresowana badaniem nie znalazła placówki w swoim mieście i prosi o kontakt.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0;">
            <tr><td style="padding: 8px 0; color: #8a8fa6; width: 120px;">Imię</td><td style="padding: 8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Miasto</td><td style="padding: 8px 0;">${escapeHtml(city)}</td></tr>
            ${postalCode ? `<tr><td style="padding: 8px 0; color: #8a8fa6;">Kod pocztowy</td><td style="padding: 8px 0;">${escapeHtml(postalCode)}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Telefon</td><td style="padding: 8px 0;"><strong style="color: #5B65DC;">${escapeHtml(phone)}</strong></td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Contact form error:', e);
    return NextResponse.json({ error: 'Błąd serwera.' }, { status: 500 });
  }
}
