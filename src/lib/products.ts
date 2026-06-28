import "server-only";
import { query, queryOne, execute } from "./db";
import type { Lesson, Product, ProductType } from "./types";

export async function listProducts(): Promise<Product[]> {
  return query<Product>("SELECT * FROM products ORDER BY created_at DESC");
}

export async function listPublishedProducts(): Promise<Product[]> {
  return query<Product>(
    "SELECT * FROM products WHERE published = 1 ORDER BY created_at DESC"
  );
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return queryOne<Product>("SELECT * FROM products WHERE slug = ?", [slug]);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  return queryOne<Product>("SELECT * FROM products WHERE id = ?", [id]);
}

export interface ProductInput {
  slug: string;
  title: string;
  type: ProductType;
  price: number;
  description?: string | null;
  file_path?: string | null;
  cover?: string | null;
  hero_video?: string | null;
  published?: boolean;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const { insertId } = await execute(
    `INSERT INTO products (slug, title, type, price, description, file_path, cover, hero_video, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.title,
      input.type,
      input.price,
      input.description ?? null,
      input.file_path ?? null,
      input.cover ?? null,
      input.hero_video ?? null,
      input.published === false ? 0 : 1,
    ]
  );
  return (await getProductById(insertId))!;
}

export async function updateProduct(id: number, input: ProductInput): Promise<void> {
  await execute(
    `UPDATE products
     SET slug = ?, title = ?, type = ?, price = ?, description = ?, file_path = ?, cover = ?, hero_video = ?, published = ?
     WHERE id = ?`,
    [
      input.slug,
      input.title,
      input.type,
      input.price,
      input.description ?? null,
      input.file_path ?? null,
      input.cover ?? null,
      input.hero_video ?? null,
      input.published === false ? 0 : 1,
      id,
    ]
  );
}

export async function deleteProduct(id: number): Promise<void> {
  await execute("DELETE FROM products WHERE id = ?", [id]);
}

// ---- lessons ----

export async function getLessons(productId: number): Promise<Lesson[]> {
  return query<Lesson>(
    "SELECT * FROM lessons WHERE product_id = ? ORDER BY sort_order, id",
    [productId]
  );
}

export async function getLesson(
  productId: number,
  slug: string
): Promise<Lesson | undefined> {
  return queryOne<Lesson>(
    "SELECT * FROM lessons WHERE product_id = ? AND slug = ?",
    [productId, slug]
  );
}
