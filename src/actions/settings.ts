"use server";

import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettings(data: Record<string, unknown>) {
  const session = await auth();
  if (!session) return { success: false, error: "Brak autoryzacji" };

  try {
    const clean = (v: unknown) =>
      typeof v === "string" && v.trim() === "" ? null : v;

    await prisma.siteSettings.upsert({
      where: { id: "main" },
      create: {
        id: "main",
        siteName: clean(data.siteName) as string | null,
        email: clean(data.email) as string | null,
        phone: clean(data.phone) as string | null,
        address: clean(data.address) as string | null,
        gtmId: clean(data.gtmId) as string | null,
        recaptchaEnabled: !!data.recaptchaEnabled,
        recaptchaSiteKey: clean(data.recaptchaSiteKey) as string | null,
        recaptchaSecretKey: clean(data.recaptchaSecretKey) as string | null,
        payuEnabled: !!data.payuEnabled,
        payuSandbox: data.payuSandbox !== false,
        payuPosId: clean(data.payuPosId) as string | null,
        payuClientSecret: clean(data.payuClientSecret) as string | null,
        payuMd5Key: clean(data.payuMd5Key) as string | null,
        emailNotificationsEnabled: !!data.emailNotificationsEnabled,
        notificationEmail: clean(data.notificationEmail) as string | null,
        emailSubjectConfirmation: clean(data.emailSubjectConfirmation) as string | null,
        emailIntroText: clean(data.emailIntroText) as string | null,
        emailFacilityText: clean(data.emailFacilityText) as string | null,
        emailOnlineText: clean(data.emailOnlineText) as string | null,
        emailFooterText: clean(data.emailFooterText) as string | null,
        smtpHost: clean(data.smtpHost) as string | null,
        smtpPort: typeof data.smtpPort === "number" ? data.smtpPort : 587,
        smtpUser: clean(data.smtpUser) as string | null,
        smtpPassword: clean(data.smtpPassword) as string | null,
        smtpFrom: clean(data.smtpFrom) as string | null,
        smtpSecure: !!data.smtpSecure,
      },
      update: {
        siteName: clean(data.siteName) as string | null,
        email: clean(data.email) as string | null,
        phone: clean(data.phone) as string | null,
        address: clean(data.address) as string | null,
        gtmId: clean(data.gtmId) as string | null,
        recaptchaEnabled: !!data.recaptchaEnabled,
        recaptchaSiteKey: clean(data.recaptchaSiteKey) as string | null,
        recaptchaSecretKey: clean(data.recaptchaSecretKey) as string | null,
        payuEnabled: !!data.payuEnabled,
        payuSandbox: data.payuSandbox !== false,
        payuPosId: clean(data.payuPosId) as string | null,
        payuClientSecret: clean(data.payuClientSecret) as string | null,
        payuMd5Key: clean(data.payuMd5Key) as string | null,
        emailNotificationsEnabled: !!data.emailNotificationsEnabled,
        notificationEmail: clean(data.notificationEmail) as string | null,
        emailSubjectConfirmation: clean(data.emailSubjectConfirmation) as string | null,
        emailIntroText: clean(data.emailIntroText) as string | null,
        emailFacilityText: clean(data.emailFacilityText) as string | null,
        emailOnlineText: clean(data.emailOnlineText) as string | null,
        emailFooterText: clean(data.emailFooterText) as string | null,
        smtpHost: clean(data.smtpHost) as string | null,
        smtpPort: typeof data.smtpPort === "number" ? data.smtpPort : 587,
        smtpUser: clean(data.smtpUser) as string | null,
        smtpPassword: clean(data.smtpPassword) as string | null,
        smtpFrom: clean(data.smtpFrom) as string | null,
        smtpSecure: !!data.smtpSecure,
      },
    });

    revalidatePath("/admin/ustawienia");
    revalidatePath("/");

    return { success: true };
  } catch (e) {
    console.error("saveSettings error:", e);
    return { success: false, error: "Nie udało się zapisać ustawień" };
  }
}
