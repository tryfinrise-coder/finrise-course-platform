"use server";

import { redirect } from "next/navigation";
import { findUserByEmail } from "@/lib/users";
import { verifyPassword } from "@/lib/passwords";
import { startSession, endSession } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const user = await findUserByEmail(email);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return { error: "Invalid email or password." };
  }

  await startSession(user);

  // If a safe local "next" was supplied (e.g. a deep link captured by the
  // middleware), honor it. Otherwise route by role: admins → admin panel,
  // students → dashboard. Block protocol-relative "//evil.com" redirects.
  const isSafeLocal = next.startsWith("/") && !next.startsWith("//");
  let destination = isSafeLocal ? next : user.role === "admin" ? "/admin" : "/dashboard";
  // A non-admin must never land on an admin deep link, even if next says so.
  if (destination.startsWith("/admin") && user.role !== "admin") {
    destination = "/dashboard";
  }
  redirect(destination);
}

export async function logoutAction() {
  endSession();
  redirect("/");
}
