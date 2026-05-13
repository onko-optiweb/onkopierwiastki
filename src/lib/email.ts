import nodemailer from "nodemailer";
import { prisma } from "@/src/lib/prisma";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function getSmtpSettings() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "main" },
    select: {
      emailNotificationsEnabled: true,
      notificationEmail: true,
      smtpHost: true,
      smtpPort: true,
      smtpUser: true,
      smtpPassword: true,
      smtpFrom: true,
      smtpSecure: true,
      emailSubjectConfirmation: true,
      emailIntroText: true,
      emailFacilityText: true,
      emailOnlineText: true,
      emailFooterText: true,
    },
  });
  return settings;
}

function createTransporter(settings: {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean;
}) {
  return nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpSecure,
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPassword,
    },
  });
}

export async function sendOrderNotification(order: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  panelType: string;
  panelTier: string;
  price: number;
  discount: number;
  isOnline: boolean;
  facilityName?: string;
}) {
  try {
    const settings = await getSmtpSettings();
    if (!settings?.emailNotificationsEnabled) return;
    if (!settings.smtpHost || !settings.smtpUser || !settings.smtpPassword) return;
    if (!settings.notificationEmail) return;

    const transporter = createTransporter({
      smtpHost: settings.smtpHost,
      smtpPort: settings.smtpPort || 587,
      smtpUser: settings.smtpUser,
      smtpPassword: settings.smtpPassword,
      smtpSecure: settings.smtpSecure,
    });

    const finalPrice = ((order.price - order.discount) / 100).toFixed(2);
    const panelLabel = `${order.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} — ${order.panelTier.toLowerCase()}`;
    const placowka = order.isOnline ? "Online — kurier" : (order.facilityName || "—");

    await transporter.sendMail({
      from: settings.smtpFrom || settings.smtpUser,
      to: settings.notificationEmail,
      subject: `Nowe zamówienie — ${escapeHtml(order.firstName)} ${escapeHtml(order.lastName)} (${finalPrice} zł)`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #122056;">Nowe zamówienie</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Klient</td><td style="padding: 8px 0;"><strong>${escapeHtml(order.firstName)} ${escapeHtml(order.lastName)}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">E-mail</td><td style="padding: 8px 0;">${escapeHtml(order.email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Telefon</td><td style="padding: 8px 0;">${escapeHtml(order.phone)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Panel</td><td style="padding: 8px 0;">${panelLabel}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Placówka</td><td style="padding: 8px 0;">${placowka}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Kwota</td><td style="padding: 8px 0;"><strong>${finalPrice} zł</strong></td></tr>
          </table>
          <p style="margin-top: 20px;">
            <a href="https://onkopierwiastki.pl/admin/zamowienia/${order.id}" style="background: #5B65DC; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px;">
              Zobacz zamówienie
            </a>
          </p>
        </div>
      `,
    });
  } catch (e) {
    console.error("Email notification error:", e);
  }
}

export async function sendOrderConfirmation(order: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  panelType: string;
  panelTier: string;
  price: number;
  discount: number;
  isOnline: boolean;
  facilityName?: string;
  facilityAddress?: string;
  facilityPhone?: string;
  facilityHours?: string;
}) {
  try {
    const settings = await getSmtpSettings();
    if (!settings?.smtpHost || !settings.smtpUser || !settings.smtpPassword) return;

    const transporter = createTransporter({
      smtpHost: settings.smtpHost,
      smtpPort: settings.smtpPort || 587,
      smtpUser: settings.smtpUser,
      smtpPassword: settings.smtpPassword,
      smtpSecure: settings.smtpSecure,
    });

    const finalPrice = ((order.price - order.discount) / 100).toFixed(2);
    const panelLabel = `${order.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} — ${order.panelTier.toLowerCase()}`;

    const facilityInstruction = settings.emailFacilityText || "Zadzwoń do placówki podanej poniżej i umów się na termin pobrania krwi. Powołaj się na badanie z onkopierwiastki.pl i podaj swoje imię oraz nazwisko.";
    const onlineText = settings.emailOnlineText || "Zamówienie online — skontaktujemy się z Tobą mailowo z instrukcjami dotyczącymi pobrania i wysyłki materiału.";
    const introText = settings.emailIntroText || "Dziękujemy za zamówienie! Twoje zamówienie zostało przyjęte.";
    const footerText = settings.emailFooterText || "Innowacyjna Medycyna sp. z o.o. · www.onkopierwiastki.pl · kontakt@onkopierwiastki.pl";
    const subject = settings.emailSubjectConfirmation || "Potwierdzenie zamówienia — Onkopierwiastki.pl";

    const facilitySection = !order.isOnline && order.facilityName
      ? `
        <div style="background: #f0f1ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #122056; margin: 0 0 8px 0; font-size: 16px;">Umów się na pobranie krwi</h3>
          <p style="color: #8a8fa6; font-size: 13px; margin: 0 0 16px 0;">${facilityInstruction}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #8a8fa6; width: 90px;">Placówka</td><td style="padding: 6px 0;"><strong style="color: #122056;">${order.facilityName}</strong></td></tr>
            ${order.facilityAddress ? `<tr><td style="padding: 6px 0; color: #8a8fa6;">Adres</td><td style="padding: 6px 0; color: #122056;">${order.facilityAddress}</td></tr>` : ''}
            ${order.facilityPhone ? `<tr><td style="padding: 6px 0; color: #8a8fa6;">Telefon</td><td style="padding: 6px 0;"><a href="tel:${order.facilityPhone.replace(/\s/g, '')}" style="color: #5B65DC; font-weight: bold; font-size: 16px; text-decoration: none;">${order.facilityPhone}</a></td></tr>` : ''}
            ${order.facilityHours ? `<tr><td style="padding: 6px 0; color: #8a8fa6;">Godziny</td><td style="padding: 6px 0; color: #122056;">${order.facilityHours}</td></tr>` : ''}
          </table>
        </div>
      `
      : order.isOnline
        ? `<p style="color: #8a8fa6; font-size: 13px; margin: 16px 0;">${onlineText}</p>`
        : '';

    await transporter.sendMail({
      from: settings.smtpFrom || settings.smtpUser,
      to: order.email,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #122056;">${introText.split('.')[0]}!</h2>
          <p>Cześć ${escapeHtml(order.firstName)},</p>
          <p>${introText}</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0;">
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Panel badawczy</td><td style="padding: 8px 0;"><strong>${panelLabel}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Kwota</td><td style="padding: 8px 0;"><strong>${finalPrice} zł</strong></td></tr>
          </table>
          ${facilitySection}
          <p style="margin-top: 20px;">
            <a href="https://onkopierwiastki.pl/zamowienie/${order.id}/potwierdzenie" style="background: #EEEFFD; color: #122056; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
              Pobierz potwierdzenie zamówienia
            </a>
          </p>
          <p style="color: #8a8fa6; font-size: 12px; margin-top: 30px;">${footerText}</p>
        </div>
      `,
    });
  } catch (e) {
    console.error("Order confirmation email error:", e);
  }
}

export async function sendFacilityNotification(order: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  panelType: string;
  panelTier: string;
  price: number;
  discount: number;
  facilityEmail: string;
  facilityName: string;
}) {
  try {
    const settings = await getSmtpSettings();
    if (!settings?.emailNotificationsEnabled) return;
    if (!settings.smtpHost || !settings.smtpUser || !settings.smtpPassword) return;
    if (!order.facilityEmail) return;

    const transporter = createTransporter({
      smtpHost: settings.smtpHost,
      smtpPort: settings.smtpPort || 587,
      smtpUser: settings.smtpUser,
      smtpPassword: settings.smtpPassword,
      smtpSecure: settings.smtpSecure,
    });

    const finalPrice = ((order.price - order.discount) / 100).toFixed(2);
    const panelLabel = `${order.panelType === "PROFILAKTYKA" ? "Profilaktyczny" : "Onkologiczny"} — ${order.panelTier.toLowerCase()}`;

    await transporter.sendMail({
      from: settings.smtpFrom || settings.smtpUser,
      to: order.facilityEmail,
      subject: `Nowe badanie onkopierwiastków — ${escapeHtml(order.firstName)} ${escapeHtml(order.lastName)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #122056;">Nowe badanie do realizacji</h2>
          <p style="color: #8a8fa6; font-size: 14px;">Pacjent opłacił zamówienie na badanie onkopierwiastków i powinien skontaktować się z Państwa placówką w celu umówienia terminu pobrania krwi.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0;">
            <tr><td style="padding: 8px 0; color: #8a8fa6; width: 120px;">Pacjent</td><td style="padding: 8px 0;"><strong>${escapeHtml(order.firstName)} ${escapeHtml(order.lastName)}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Telefon</td><td style="padding: 8px 0;">${escapeHtml(order.phone)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">E-mail</td><td style="padding: 8px 0;">${escapeHtml(order.email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Panel</td><td style="padding: 8px 0;">${panelLabel}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8fa6;">Kwota</td><td style="padding: 8px 0;"><strong>${finalPrice} zł</strong></td></tr>
          </table>
          <p style="color: #8a8fa6; font-size: 12px; margin-top: 30px;">Wiadomość wygenerowana automatycznie przez system onkopierwiastki.pl</p>
        </div>
      `,
    });
  } catch (e) {
    console.error("Facility notification email error:", e);
  }
}
