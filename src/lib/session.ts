import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// Session is a signed, httpOnly JWT cookie (jose, HS256). This module is
// edge-safe (no node-only imports) so it can be used from middleware too.

export const SESSION_COOKIE = "finnora_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

export interface SessionData {
  uid: number;
  email: string;
  role: "student" | "admin";
}

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(s);
}

export async function createSessionToken(data: SessionData): Promise<string> {
  return new SignJWT({ ...data } as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret());
}

export async function verifySessionToken(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.uid !== "number" || typeof payload.email !== "string") return null;
    const role = payload.role === "admin" ? "admin" : "student";
    return { uid: payload.uid, email: payload.email, role };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: MAX_AGE_SECONDS,
  // Set COOKIE_DOMAIN=.tryfinrise.com in production so the session is shared
  // across admin./courses./apex subdomains. Leave unset in local dev.
  ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
};
