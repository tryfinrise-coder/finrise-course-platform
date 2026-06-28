import "server-only";
import { query, execute } from "./db";
import { createProduct } from "./products";
import type { Product } from "./types";

export interface BundleRow extends Product {
  child_count: number;
}

export async function listBundles(): Promise<BundleRow[]> {
  return query<BundleRow>(
    `SELECT p.*, COUNT(bi.child_id) AS child_count
     FROM products p
     LEFT JOIN bundle_items bi ON bi.bundle_id = p.id
     WHERE p.type = 'bundle'
     GROUP BY p.id
     ORDER BY p.created_at DESC`
  );
}

export async function bundleChildIds(bundleId: number): Promise<number[]> {
  const rows = await query<{ child_id: number }>(
    "SELECT child_id FROM bundle_items WHERE bundle_id = ?",
    [bundleId]
  );
  return rows.map((r) => r.child_id);
}

export async function createBundle(input: {
  slug: string;
  title: string;
  price: number;
  description?: string | null;
  childIds: number[];
}): Promise<void> {
  const bundle = await createProduct({
    slug: input.slug,
    title: input.title,
    type: "bundle",
    price: input.price,
    description: input.description ?? null,
    published: true,
  });
  for (const childId of input.childIds) {
    if (childId === bundle.id) continue;
    await execute(
      "INSERT IGNORE INTO bundle_items (bundle_id, child_id) VALUES (?, ?)",
      [bundle.id, childId]
    );
  }
}
