import { prisma } from "@/src/lib/prisma";
import { unstable_cache } from "next/cache";

export type SiteSettings = {
  id: string;
  siteName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  gtmId: string | null;
  recaptchaEnabled: boolean;
  recaptchaSiteKey: string | null;
  recaptchaSecretKey: string | null;
  payuEnabled: boolean;
  payuSandbox: boolean;
  payuPosId: string | null;
  payuClientSecret: string | null;
  payuMd5Key: string | null;
  emailNotificationsEnabled: boolean;
  notificationEmail: string | null;
  emailSubjectConfirmation: string | null;
  emailIntroText: string | null;
  emailFacilityText: string | null;
  emailOnlineText: string | null;
  emailFooterText: string | null;
  smtpHost: string | null;
  smtpPort: number | null;
  smtpUser: string | null;
  smtpPassword: string | null;
  smtpFrom: string | null;
  smtpSecure: boolean;
};

const defaults: SiteSettings = {
  id: "main",
  siteName: "Onkopierwiastki.pl",
  email: "kontakt@onkopierwiastki.pl",
  phone: null,
  address: "71-253 Szczecin, ul. Akacjowa 2",
  gtmId: null,
  recaptchaEnabled: false,
  recaptchaSiteKey: null,
  recaptchaSecretKey: null,
  payuEnabled: false,
  payuSandbox: true,
  payuPosId: null,
  payuClientSecret: null,
  payuMd5Key: null,
  emailNotificationsEnabled: false,
  notificationEmail: null,
  emailSubjectConfirmation: null,
  emailIntroText: null,
  emailFacilityText: null,
  emailOnlineText: null,
  emailFooterText: null,
  smtpHost: null,
  smtpPort: 587,
  smtpUser: null,
  smtpPassword: null,
  smtpFrom: null,
  smtpSecure: false,
};

async function fetchSettings(): Promise<SiteSettings> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });
    return { ...defaults, ...settings };
  } catch {
    return defaults;
  }
}

export const getSettings = unstable_cache(fetchSettings, ["settings"], {
  revalidate: 3600,
  tags: ["settings"],
});

export async function getSettingsFresh(): Promise<SiteSettings> {
  return fetchSettings();
}
