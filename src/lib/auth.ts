import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  createSessionToken,
  verifySessionToken,
  sessionCookieOptions,
} from "./session";
import { findUserById } from "./users";
import type { User } from "./types";

// Read the current user from the session cookie (server components / actions).
export async function getCurrentUser(): Promise<User | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await verifySessionToken(token);
  if (!session) return null;
  const user = await findUserById(session.uid);
  return user ?? null;
}

export async function requireUser(next?: string): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    // Admin deep links → admin login (/login); everything else → student login.
    const target = next && next.startsWith("/admin") ? "/login" : "/courses/login";
    redirect(`${target}${next ? `?next=${encodeURIComponent(next)}` : ""}`);
  }
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser("/admin");
  if (user.role !== "admin") {
    redirect("/library");
  }
  return user;
}

// Issue a session cookie for a user (called from the login action).
export async function startSession(user: User): Promise<void> {
  const token = await createSessionToken({
    uid: user.id,
    email: user.email,
    role: user.role,
  });
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions);
}

export function endSession(): void {
  cookies().set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
}
