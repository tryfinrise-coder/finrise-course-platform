import "server-only";
import { query, execute } from "./db";
import type { Product } from "./types";

// A user "owns" a product if they have a direct entitlement to it, OR they own
// a bundle that contains it. This keeps the bundle product type working without
// duplicating entitlement rows.

export async function accessibleProductIds(userId: number): Promise<Set<number>> {
  const direct = await query<{ product_id: number }>(
    "SELECT product_id FROM entitlements WHERE user_id = ?",
    [userId]
  );

  const ids = new Set<number>(direct.map((r) => r.product_id));

  // expand any owned bundles into their child products
  if (ids.size > 0) {
    const placeholders = [...ids].map(() => "?").join(",");
    const children = await query<{ child_id: number }>(
      `SELECT child_id FROM bundle_items WHERE bundle_id IN (${placeholders})`,
      [...ids]
    );
    for (const c of children) ids.add(c.child_id);
  }
  return ids;
}

export async function ownsProduct(userId: number, productId: number): Promise<boolean> {
  return (await accessibleProductIds(userId)).has(productId);
}

export async function grantEntitlement(
  userId: number,
  productId: number,
  source: "manual" | "purchase" = "manual"
): Promise<void> {
  await execute(
    `INSERT INTO entitlements (user_id, product_id, source)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE source = source`,
    [userId, productId, source]
  );
}

export async function revokeEntitlement(
  userId: number,
  productId: number
): Promise<void> {
  await execute(
    "DELETE FROM entitlements WHERE user_id = ? AND product_id = ?",
    [userId, productId]
  );
}

// Products the user can open in their library (direct + bundle children),
// excluding the bundle wrappers themselves.
export async function listOwnedProducts(userId: number): Promise<Product[]> {
  const ids = await accessibleProductIds(userId);
  if (ids.size === 0) return [];
  const placeholders = [...ids].map(() => "?").join(",");
  return query<Product>(
    `SELECT * FROM products
     WHERE id IN (${placeholders}) AND type != 'bundle'
     ORDER BY created_at DESC`,
    [...ids]
  );
}

// Direct entitlements for a user (not expanding bundles) — admin view.
export async function directEntitlementProducts(userId: number): Promise<Product[]> {
  return query<Product>(
    `SELECT p.* FROM entitlements e
     JOIN products p ON p.id = e.product_id
     WHERE e.user_id = ?
     ORDER BY p.title`,
    [userId]
  );
}

// Which user_ids have a direct entitlement to a product (admin view).
export async function usersWithEntitlement(productId: number): Promise<number[]> {
  const rows = await query<{ user_id: number }>(
    "SELECT user_id FROM entitlements WHERE product_id = ?",
    [productId]
  );
  return rows.map((r) => r.user_id);
}
