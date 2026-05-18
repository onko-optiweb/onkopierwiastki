/**
 * reCAPTCHA Enterprise — client + server helpers
 */

// ─── Client-side: get token ───

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready: (cb: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export function getRecaptchaSiteKey(): string | null {
  if (typeof document === 'undefined') return null;
  return document.body.getAttribute('data-recaptcha-key');
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey || !window.grecaptcha) return null;

  return new Promise((resolve) => {
    window.grecaptcha!.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha!.enterprise.execute(siteKey, { action });
        resolve(token);
      } catch {
        resolve(null);
      }
    });
  });
}

// ─── Server-side: verify token ───

export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string,
  secretKey: string,
  siteKey: string,
): Promise<{ valid: boolean; score: number }> {
  const projectId = process.env.RECAPTCHA_PROJECT_ID;

  // Enterprise API requires project ID
  if (!projectId) {
    // Fallback: use legacy verification endpoint
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    const data = await res.json();
    return { valid: data.success === true, score: data.score ?? 0 };
  }

  // Enterprise API
  const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${secretKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: { token, siteKey, expectedAction },
    }),
  });
  const data = await res.json();

  const riskScore = data.riskAnalysis?.score ?? 0;
  const tokenValid = data.tokenProperties?.valid === true;
  const actionMatch = data.tokenProperties?.action === expectedAction;

  return { valid: tokenValid && actionMatch && riskScore >= 0.5, score: riskScore };
}
