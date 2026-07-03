import "server-only";
import { query, queryOne, execute } from "./db";

export interface Purchase {
  id: number;
  product_id: number | null;
  email: string;
  name: string | null;
  phone: string | null;
  amount: number;
  discount_code: string | null;
  rp_order_id: string | null;
  rp_payment_id: string | null;
  status: string;
  created_at: string;
  // attribution snapshot (frozen at checkout time)
  ip: string | null;
  session_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  paid_at: string | null;
}

export async function createPurchase(input: {
  product_id: number | null;
  email: string;
  name?: string | null;
  phone?: string | null;
  amount: number;
  discount_code?: string | null;
  rp_order_id?: string | null;
  status?: string;
  // attribution — where this buyer came from
  ip?: string | null;
  session_id?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
}): Promise<number> {
  const { insertId } = await execute(
    `INSERT INTO course_purchases
       (product_id, email, name, phone, amount, discount_code, rp_order_id, status,
        ip, session_id, utm_source, utm_medium, utm_campaign, utm_content, referrer)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.product_id ?? null,
      input.email,
      input.name ?? null,
      input.phone ?? null,
      input.amount,
      input.discount_code ?? null,
      input.rp_order_id ?? null,
      input.status ?? "created",
      input.ip ?? null,
      input.session_id ?? null,
      input.utm_source ?? null,
      input.utm_medium ?? null,
      input.utm_campaign ?? null,
      input.utm_content ?? null,
      input.referrer ? input.referrer.slice(0, 1000) : null,
    ]
  );
  return insertId;
}

export async function markPurchasePaid(
  rpOrderId: string,
  rpPaymentId: string
): Promise<void> {
  await execute(
    `UPDATE course_purchases SET status = 'paid', rp_payment_id = ?, paid_at = NOW() WHERE rp_order_id = ?`,
    [rpPaymentId, rpOrderId]
  );
}

export async function getPurchaseByOrderId(
  rpOrderId: string
): Promise<Purchase | undefined> {
  return queryOne<Purchase>(
    "SELECT * FROM course_purchases WHERE rp_order_id = ?",
    [rpOrderId]
  );
}

export async function listPurchases(): Promise<Purchase[]> {
  return query<Purchase>(
    "SELECT * FROM course_purchases ORDER BY created_at DESC"
  );
}
