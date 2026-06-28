// Shared row types mirroring the SQLite schema (see src/lib/db.ts).

export type ProductType = "course" | "pdf" | "video" | "bundle";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  role: "student" | "admin";
  created_at: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  type: ProductType;
  price: number; // paise
  description: string | null;
  file_path: string | null;
  cover: string | null;
  hero_video: string | null;
  published: number;
  created_at: string;
}

export interface Lesson {
  id: number;
  product_id: number;
  slug: string;
  title: string;
  sort_order: number;
  pattern_key: string | null;
  body: string | null;
}

export interface Order {
  id: number;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  user_id: number | null;
  product_id: number | null;
  email: string | null;
  status: "created" | "paid" | "failed";
  amount: number;
  created_at: string;
}

export interface Progress {
  id: number;
  user_id: number;
  lesson_id: number;
  status: "in_progress" | "completed";
  completed_at: string | null;
}

export function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

// MySQL DATETIME comes back as a "YYYY-MM-DD HH:mm:ss" string (dateStrings).
// Render a friendly date; falls back to the raw value if it can't be parsed.
export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value.replace(" ", "T"));
  return isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
