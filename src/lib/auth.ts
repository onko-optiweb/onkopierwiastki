import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";
import { authConfig } from "@/src/lib/auth.config";
import { verifyRecaptchaToken } from "@/src/lib/recaptcha";

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(email);

  if (!record || now - record.lastAttempt > WINDOW_MS) {
    loginAttempts.set(email, { count: 1, lastAttempt: now });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false;
  }

  record.count++;
  record.lastAttempt = now;
  return true;
}

function resetRateLimit(email: string) {
  loginAttempts.delete(email);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Hasło", type: "password" },
        recaptchaToken: { label: "reCAPTCHA", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).toLowerCase();

        // reCAPTCHA verification
        const settings = await prisma.siteSettings.findUnique({
          where: { id: 'main' },
          select: { recaptchaEnabled: true, recaptchaSiteKey: true, recaptchaSecretKey: true },
        });
        if (settings?.recaptchaEnabled && settings.recaptchaSecretKey && settings.recaptchaSiteKey) {
          const token = credentials.recaptchaToken as string;
          if (!token) return null;
          const { valid } = await verifyRecaptchaToken(token, 'LOGIN', settings.recaptchaSecretKey, settings.recaptchaSiteKey);
          if (!valid) return null;
        }

        // Rate limit check
        if (!checkRateLimit(email)) {
          throw new Error("Zbyt wiele prób logowania. Spróbuj za 15 minut.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) return null;

        // Reset on successful login
        resetRateLimit(email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
