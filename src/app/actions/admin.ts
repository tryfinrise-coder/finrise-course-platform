"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "@/lib/products";
import { createUser, findUserByEmail } from "@/lib/users";
import { generatePassword } from "@/lib/passwords";
import { grantEntitlement, revokeEntitlement } from "@/lib/entitlements";
import { sendCredentialsEmail } from "@/lib/email";
import type { ProductType } from "@/lib/types";

const STORAGE_DIR = path.join(process.cwd(), "storage");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function savePublicUpload(file: File, prefix: string): Promise<string> {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const safeName = `${prefix}-${Date.now()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOADS_DIR, safeName), bytes);
  return `/uploads/${safeName}`;
}

function rupeesToPaise(v: FormDataEntryValue | null): number {
  const n = Number(String(v || "0"));
  return Math.max(0, Math.round(n * 100));
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();
  const created = await createProduct({
    slug: String(formData.get("slug") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    type: (String(formData.get("type") || "course") as ProductType),
    price: rupeesToPaise(formData.get("price")),
    description: String(formData.get("description") || "") || null,
    published: formData.get("published") === "on",
  });
  revalidatePath("/admin/products");
  // land on the new product's editor so resources/files can be added next
  redirect(`/admin/products/${created.id}`);
}

export async function updateProductAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const existing = await getProductById(id);
  if (!existing) return;
  await updateProduct(id, {
    slug: String(formData.get("slug") || existing.slug).trim(),
    title: String(formData.get("title") || existing.title).trim(),
    type: (String(formData.get("type") || existing.type) as ProductType),
    price: rupeesToPaise(formData.get("price")),
    description: String(formData.get("description") || "") || null,
    file_path: existing.file_path,
    cover: existing.cover,
    hero_video: existing.hero_video,
    published: formData.get("published") === "on",
  });
  revalidatePath("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  await deleteProduct(Number(formData.get("id")));
  revalidatePath("/admin/products");
  // when deleting from a product's detail page, send the admin back to the list
  if (formData.get("redirect") === "list") redirect("/admin/products");
}

export async function uploadFileAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const product = await getProductById(id);
  const file = formData.get("file") as File | null;
  if (!product || !file || file.size === 0) return;

  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const safeName = `${product.slug}-${Date.now()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(STORAGE_DIR, safeName), bytes);

  await updateProduct(id, {
    slug: product.slug,
    title: product.title,
    type: product.type,
    price: product.price,
    description: product.description,
    file_path: safeName,
    cover: product.cover,
    hero_video: product.hero_video,
    published: product.published === 1,
  });
  revalidatePath("/admin/products");
}

export async function setHeroMediaAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const existing = await getProductById(id);
  if (!existing) return;
  let cover = existing.cover ?? null;
  const image = formData.get("image") as File | null;
  if (image && image.size > 0) cover = await savePublicUpload(image, "hero");
  const hero_video = String(formData.get("hero_video") || "").trim() || null;
  await updateProduct(id, {
    slug: existing.slug,
    title: existing.title,
    type: existing.type,
    price: existing.price,
    description: existing.description,
    file_path: existing.file_path,
    cover,
    hero_video,
    published: existing.published === 1,
  });
  revalidatePath(`/admin/products/${id}`);
}

export async function createUserAction(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email || (await findUserByEmail(email))) {
    revalidatePath("/admin/users");
    return;
  }
  const password = String(formData.get("password") || "") || generatePassword();
  const user = await createUser({
    email,
    password,
    name: String(formData.get("name") || "") || null,
    role: formData.get("role") === "admin" ? "admin" : "student",
  });

  const grantProductId = Number(formData.get("grant_product_id") || 0);
  if (grantProductId > 0) await grantEntitlement(user.id, grantProductId, "manual");

  if (formData.get("send_email") === "on") {
    const product = grantProductId ? await getProductById(grantProductId) : undefined;
    await sendCredentialsEmail({
      to: email,
      password,
      productTitle: product?.title || "your Finrise account",
    });
  }
  revalidatePath("/admin/users");
}

export async function grantAccessAction(formData: FormData) {
  await requireAdmin();
  const userId = Number(formData.get("user_id"));
  const productId = Number(formData.get("product_id"));
  if (userId && productId) await grantEntitlement(userId, productId, "manual");
  revalidatePath("/admin/users");
}

export async function revokeAccessAction(formData: FormData) {
  await requireAdmin();
  const userId = Number(formData.get("user_id"));
  const productId = Number(formData.get("product_id"));
  if (userId && productId) await revokeEntitlement(userId, productId);
  revalidatePath("/admin/users");
}
