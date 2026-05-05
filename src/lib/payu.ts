import crypto from "crypto";

// ─── Types ───

interface PayuToken {
  access_token: string;
  expires_at: number;
}

interface PayuOrderProduct {
  name: string;
  unitPrice: string;
  quantity: string;
}

interface PayuBuyer {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  language: string;
}

export interface PayuPayMethod {
  value: string;
  name: string;
  brandImageUrl: string;
  status: "ENABLED" | "DISABLED" | "TEMPORARY_DISABLED";
  minAmount?: number;
  maxAmount?: number;
}

interface CreatePayuOrderParams {
  orderNumber: string;
  totalAmount: number; // grosze
  products: PayuOrderProduct[];
  buyer: PayuBuyer;
  continueUrl: string;
  notifyUrl: string;
  customerIp: string;
  description: string;
  payMethod?: { type: string; value: string };
}

interface PayuCreateOrderResponse {
  orderId: string;
  redirectUri: string;
}

// ─── Config from env ───

function getPayuConfig() {
  const posId = process.env.PAYU_POS_ID;
  const clientSecret = process.env.PAYU_CLIENT_SECRET;
  const md5Key = process.env.PAYU_MD5_KEY;
  const sandbox = process.env.PAYU_SANDBOX !== "false";

  if (!posId || !clientSecret) {
    throw new Error("PayU nie jest skonfigurowane (brak PAYU_POS_ID / PAYU_CLIENT_SECRET)");
  }

  return { posId, clientSecret, md5Key, sandbox };
}

function getBaseUrl(sandbox: boolean): string {
  return sandbox
    ? "https://secure.snd.payu.com"
    : "https://secure.payu.com";
}

export function isPayuEnabled(): boolean {
  return !!(process.env.PAYU_POS_ID && process.env.PAYU_CLIENT_SECRET);
}

// ─── Token cache ───
let cachedToken: PayuToken | null = null;

export async function getPayuToken(): Promise<string> {
  if (cachedToken && cachedToken.expires_at > Date.now() + 60_000) {
    return cachedToken.access_token;
  }

  const config = getPayuConfig();
  const baseUrl = getBaseUrl(config.sandbox);

  const res = await fetch(`${baseUrl}/pl/standard/user/oauth/authorize`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: config.posId,
      client_secret: config.clientSecret,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayU OAuth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000,
  };

  return cachedToken.access_token;
}

// ─── Create PayU order ───
export async function createPayuOrder(
  params: CreatePayuOrderParams
): Promise<PayuCreateOrderResponse> {
  const config = getPayuConfig();
  const token = await getPayuToken();
  const baseUrl = getBaseUrl(config.sandbox);

  const body: Record<string, unknown> = {
    notifyUrl: params.notifyUrl,
    continueUrl: params.continueUrl,
    customerIp: params.customerIp,
    merchantPosId: config.posId,
    description: params.description,
    currencyCode: "PLN",
    totalAmount: String(params.totalAmount),
    extOrderId: params.orderNumber,
    buyer: params.buyer,
    products: params.products,
  };

  if (params.payMethod) {
    body.payMethods = { payMethod: params.payMethod };
  }

  const res = await fetch(`${baseUrl}/api/v2_1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    redirect: "manual",
  });

  if (res.status === 302) {
    const redirectUri = res.headers.get("Location");
    const json = await res.json().catch(() => ({}));
    return {
      orderId: json.orderId || "",
      redirectUri: redirectUri || json.redirectUri || "",
    };
  }

  if (res.ok) {
    const json = await res.json();
    if (json.status?.statusCode === "SUCCESS" && json.redirectUri) {
      return {
        orderId: json.orderId,
        redirectUri: json.redirectUri,
      };
    }
  }

  const text = await res.text();
  throw new Error(`PayU createOrder failed: ${res.status} ${text}`);
}

// ─── Get available payment methods ───
export async function getPaymentMethods(): Promise<PayuPayMethod[]> {
  if (!isPayuEnabled()) return [];

  const config = getPayuConfig();
  const token = await getPayuToken();
  const baseUrl = getBaseUrl(config.sandbox);

  const res = await fetch(`${baseUrl}/api/v2_1/paymethods`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return [];

  const data = await res.json();
  const methods: PayuPayMethod[] = data.payByLinks ?? [];
  return methods.filter((m) => m.status === "ENABLED");
}

// ─── Verify webhook signature ───
export function verifyPayuSignature(
  rawBody: string,
  signatureHeader: string,
  md5Key: string
): boolean {
  const parts: Record<string, string> = {};
  signatureHeader.split(";").forEach((part) => {
    const [key, val] = part.split("=");
    if (key && val) parts[key.trim()] = val.trim();
  });

  const incomingSignature = parts.signature;
  const algorithm = parts.algorithm || "MD5";

  if (!incomingSignature) return false;

  if (algorithm.toUpperCase() === "MD5") {
    const expected = crypto
      .createHash("md5")
      .update(rawBody + md5Key)
      .digest("hex");
    return expected === incomingSignature;
  }

  if (algorithm.toUpperCase() === "SHA-256" || algorithm.toUpperCase() === "SHA256") {
    const expected = crypto
      .createHash("sha256")
      .update(rawBody + md5Key)
      .digest("hex");
    return expected === incomingSignature;
  }

  return false;
}
