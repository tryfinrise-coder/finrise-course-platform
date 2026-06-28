import "server-only";
import { query, queryOne, execute } from "./db";

export interface DiscountCode {
  id: number;
  code: string;
  kind: "percent" | "fixed";
  value: number; // percent (0-100) or paise
  max_uses: number | null;
  used_count: number;
  active: number;
  starts_at: string | null; // schedule: code is dormant before this date
  expires_at: string | null;
  min_order: number | null; // paise: minimum order subtotal to qualify
  auto_apply: number; // 1 = applied automatically at checkout (no typing needed)
  created_at: string;
}

export async function listDiscounts(): Promise<DiscountCode[]> {
  return query<DiscountCode>("SELECT * FROM discount_codes ORDER BY created_at DESC");
}

export async function createDiscount(input: {
  code: string;
  kind: "percent" | "fixed";
  value: number;
  max_uses?: number | null;
  expires_at?: string | null;
  starts_at?: string | null;
  min_order?: number | null;
  auto_apply?: boolean;
}): Promise<void> {
  await execute(
    `INSERT INTO discount_codes (code, kind, value, max_uses, expires_at, starts_at, min_order, auto_apply)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE kind = VALUES(kind), value = VALUES(value),
       max_uses = VALUES(max_uses), expires_at = VALUES(expires_at),
       starts_at = VALUES(starts_at), min_order = VALUES(min_order),
       auto_apply = VALUES(auto_apply), active = 1`,
    [
      input.code.trim().toUpperCase(),
      input.kind,
      input.value,
      input.max_uses ?? null,
      input.expires_at || null,
      input.starts_at || null,
      input.min_order ?? null,
      input.auto_apply ? 1 : 0,
    ]
  );
}

// The best auto-apply code that is live right now (and qualifies for the order
// total, if given). Highest value wins. Returns null if none.
export async function getAutoApplyDiscount(orderTotal?: number): Promise<DiscountCode | null> {
  const rows = await query<DiscountCode>(
    `SELECT * FROM discount_codes
     WHERE active = 1 AND auto_apply = 1
       AND (starts_at IS NULL OR starts_at <= CURDATE())
       AND (expires_at IS NULL OR expires_at >= CURDATE())
       AND (max_uses IS NULL OR used_count < max_uses)
     ORDER BY value DESC`
  );
  for (const d of rows) {
    if (d.min_order != null && orderTotal != null && orderTotal < d.min_order) continue;
    return d;
  }
  return null;
}

export async function setDiscountActive(id: number, active: boolean): Promise<void> {
  await execute("UPDATE discount_codes SET active = ? WHERE id = ?", [active ? 1 : 0, id]);
}

export async function deleteDiscount(id: number): Promise<void> {
  await execute("DELETE FROM discount_codes WHERE id = ?", [id]);
}

// Validate a code for checkout. Honours active flag, schedule window, usage
// cap and (when an order total is supplied) the minimum-order requirement.
export async function validateDiscount(
  code: string,
  orderTotal?: number
): Promise<DiscountCode | null> {
  const d = await queryOne<DiscountCode>(
    `SELECT * FROM discount_codes
     WHERE code = ? AND active = 1
       AND (starts_at IS NULL OR starts_at <= CURDATE())
       AND (expires_at IS NULL OR expires_at >= CURDATE())
       AND (max_uses IS NULL OR used_count < max_uses)`,
    [code.trim().toUpperCase()]
  );
  if (!d) return null;
  if (d.min_order != null && orderTotal != null && orderTotal < d.min_order) return null;
  return d;
}

// Compute a human status for the admin list (independent of an order).
export type DiscountStatus = "active" | "scheduled" | "expired" | "exhausted" | "disabled";
export function discountStatus(d: DiscountCode): DiscountStatus {
  if (!d.active) return "disabled";
  const today = new Date().toISOString().slice(0, 10);
  if (d.starts_at && d.starts_at.slice(0, 10) > today) return "scheduled";
  if (d.expires_at && d.expires_at.slice(0, 10) < today) return "expired";
  if (d.max_uses != null && d.used_count >= d.max_uses) return "exhausted";
  return "active";
}
