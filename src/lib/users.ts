import "server-only";
import { query, queryOne, execute } from "./db";
import { hashPassword } from "./passwords";
import type { User } from "./types";

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return queryOne<User>("SELECT * FROM users WHERE email = ?", [
    email.trim().toLowerCase(),
  ]);
}

export async function findUserById(id: number): Promise<User | undefined> {
  return queryOne<User>("SELECT * FROM users WHERE id = ?", [id]);
}

export async function listUsers(): Promise<User[]> {
  return query<User>("SELECT * FROM users ORDER BY created_at DESC");
}

export async function listUsersByRole(role: "student" | "admin"): Promise<User[]> {
  return query<User>("SELECT * FROM users WHERE role = ? ORDER BY created_at DESC", [role]);
}

export async function setUserRole(id: number, role: "student" | "admin"): Promise<void> {
  await execute("UPDATE users SET role = ? WHERE id = ?", [role, id]);
}

export async function updateUser(
  id: number,
  input: { email: string; name: string | null; role: "student" | "admin" }
): Promise<void> {
  await execute("UPDATE users SET email = ?, name = ?, role = ? WHERE id = ?", [
    input.email.trim().toLowerCase(),
    input.name,
    input.role,
    id,
  ]);
}

export async function deleteUser(id: number): Promise<void> {
  await execute("DELETE FROM users WHERE id = ?", [id]);
}

export async function countAdmins(): Promise<number> {
  const r = await queryOne<{ n: number }>("SELECT COUNT(*) AS n FROM users WHERE role = 'admin'");
  return r?.n ?? 0;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string | null;
  role?: "student" | "admin";
}

export async function setUserPassword(id: number, plain: string): Promise<void> {
  await execute("UPDATE users SET password_hash = ? WHERE id = ?", [hashPassword(plain), id]);
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const email = input.email.trim().toLowerCase();
  const { insertId } = await execute(
    "INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)",
    [email, hashPassword(input.password), input.name ?? null, input.role ?? "student"]
  );
  return (await findUserById(insertId))!;
}

// Create the user if absent (used by checkout/manual grant), returning the row.
export async function ensureUser(
  email: string,
  password: string,
  name?: string
): Promise<{ user: User; created: boolean }> {
  const existing = await findUserByEmail(email);
  if (existing) return { user: existing, created: false };
  return {
    user: await createUser({ email, password, name: name ?? null }),
    created: true,
  };
}
