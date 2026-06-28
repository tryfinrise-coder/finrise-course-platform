"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createResource, updateResource, deleteResource, resourceKind } from "@/lib/resources";
import {
  createUser,
  findUserByEmail,
  setUserRole,
  deleteUser,
  updateUser,
  findUserById,
  countAdmins,
  setUserPassword,
} from "@/lib/users";
import { generatePassword } from "@/lib/passwords";
import { createDiscount, setDiscountActive, deleteDiscount } from "@/lib/discounts";
import { createBundle } from "@/lib/bundles";

function rupeesToPaise(v: FormDataEntryValue | null): number {
  const n = Number(String(v || "0"));
  return Math.max(0, Math.round(n * 100));
}

const STORAGE_DIR = path.join(process.cwd(), "storage");

async function saveUpload(file: File, prefix: string): Promise<string> {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const safe = `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(STORAGE_DIR, safe), bytes);
  return safe;
}

// ----------------------------------------------------------- course resources

export async function uploadResourceAction(formData: FormData) {
  await requireAdmin();
  const productId = Number(formData.get("product_id"));
  const title = String(formData.get("title") || "").trim();
  const file = formData.get("file") as File | null;
  if (!productId || !title || !file || file.size === 0) {
    revalidatePath("/admin/products");
    return;
  }
  const filePath = await saveUpload(file, "res");

  let imagePath: string | null = null;
  const image = formData.get("image") as File | null;
  if (image && image.size > 0) imagePath = await saveUpload(image, "img");

  await createResource({
    product_id: productId,
    title,
    summary: String(formData.get("summary") || "") || null,
    description_html: String(formData.get("description_html") || "") || null,
    badge: String(formData.get("badge") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0) || 0,
    file_path: filePath,
    image_path: imagePath,
    kind: resourceKind(file.name),
  });
  revalidatePath("/admin/products");
}

export async function updateResourceAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") || "").trim();
  if (!id || !title) {
    revalidatePath("/admin/products");
    return;
  }

  // Optional file / image replacement — leave existing if none supplied.
  let filePath: string | undefined;
  let kind: string | undefined;
  const file = formData.get("file") as File | null;
  if (file && file.size > 0) {
    filePath = await saveUpload(file, "res");
    kind = resourceKind(file.name);
  }
  let imagePath: string | undefined;
  const image = formData.get("image") as File | null;
  if (image && image.size > 0) imagePath = await saveUpload(image, "img");

  await updateResource({
    id,
    title,
    summary: String(formData.get("summary") || "") || null,
    description_html: String(formData.get("description_html") || "") || null,
    badge: String(formData.get("badge") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0) || 0,
    file_path: filePath,
    image_path: imagePath,
    kind,
  });
  revalidatePath("/admin/products");
}

export async function deleteResourceAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await deleteResource(id);
  revalidatePath("/admin/products");
}

// ----------------------------------------------------------------- team

export async function createTeamMemberAction(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email || (await findUserByEmail(email))) {
    revalidatePath("/admin/team");
    return;
  }
  const role = formData.get("role") === "admin" ? "admin" : "student";
  const password = String(formData.get("password") || "") || generatePassword();
  await createUser({
    email,
    password,
    name: String(formData.get("name") || "") || null,
    role,
  });
  revalidatePath("/admin/team");
  revalidatePath("/admin/users");
}

export async function changeRoleAction(formData: FormData) {
  const me = await requireAdmin();
  const id = Number(formData.get("id"));
  const role = formData.get("role") === "admin" ? "admin" : "student";
  if (!id) return;
  // never demote yourself or the last remaining admin
  if (role === "student") {
    const target = await findUserById(id);
    if (target?.role === "admin" && (id === me.id || (await countAdmins()) <= 1)) {
      revalidatePath("/admin/team");
      return;
    }
  }
  await setUserRole(id, role);
  revalidatePath("/admin/team");
  revalidatePath("/admin/users");
}

export async function editUserAction(formData: FormData) {
  const me = await requireAdmin();
  const id = Number(formData.get("id"));
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!id || !email) return;
  // if another user already has this email, ignore
  const existing = await findUserByEmail(email);
  if (existing && existing.id !== id) return;
  let role = formData.get("role") === "admin" ? "admin" : "student";
  // don't let an admin demote themselves or the last admin via edit
  if (role === "student") {
    const target = await findUserById(id);
    if (target?.role === "admin" && (id === me.id || (await countAdmins()) <= 1)) {
      role = "admin";
    }
  }
  await updateUser(id, {
    email,
    name: String(formData.get("name") || "") || null,
    role: role as "student" | "admin",
  });
  revalidatePath("/admin/team");
  revalidatePath("/admin/users");
}

export async function deleteUserAction(formData: FormData) {
  const me = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id || id === me.id) return; // can't delete yourself
  const target = await findUserById(id);
  if (target?.role === "admin" && (await countAdmins()) <= 1) return; // keep ≥1 admin
  await deleteUser(id);
  revalidatePath("/admin/team");
  revalidatePath("/admin/users");
}

export async function setUserPasswordAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const password = String(formData.get("password") || "").trim();
  if (!id || password.length < 4) return;
  await setUserPassword(id, password);
  revalidatePath("/admin/team");
  revalidatePath("/admin/users");
}

// ------------------------------------------------------------- discounts

export async function createDiscountAction(formData: FormData) {
  await requireAdmin();
  const code = String(formData.get("code") || "").trim();
  if (!code) return;
  const kind = formData.get("kind") === "fixed" ? "fixed" : "percent";
  const rawValue = Number(formData.get("value") || 0);
  const value = kind === "percent" ? Math.min(100, Math.max(0, Math.round(rawValue))) : Math.round(rawValue * 100);
  const maxUsesRaw = Number(formData.get("max_uses") || 0);
  const minOrderRaw = Number(formData.get("min_order") || 0);
  await createDiscount({
    code,
    kind,
    value,
    max_uses: maxUsesRaw > 0 ? maxUsesRaw : null,
    expires_at: String(formData.get("expires_at") || "") || null,
    starts_at: String(formData.get("starts_at") || "") || null,
    min_order: minOrderRaw > 0 ? Math.round(minOrderRaw * 100) : null,
    auto_apply: formData.get("auto_apply") === "on",
  });
  revalidatePath("/admin/discounts");
}

export async function toggleDiscountAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const active = formData.get("active") === "1";
  if (id) await setDiscountActive(id, active);
  revalidatePath("/admin/discounts");
}

export async function deleteDiscountAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await deleteDiscount(id);
  revalidatePath("/admin/discounts");
}

// --------------------------------------------------------------- bundles

export async function createBundleAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") || "").trim();
  const title = String(formData.get("title") || "").trim();
  if (!slug || !title) return;
  const childIds = formData.getAll("child_ids").map((v) => Number(v)).filter(Boolean);
  await createBundle({
    slug,
    title,
    price: rupeesToPaise(formData.get("price")),
    description: String(formData.get("description") || "") || null,
    childIds,
  });
  revalidatePath("/admin/bundles");
}
