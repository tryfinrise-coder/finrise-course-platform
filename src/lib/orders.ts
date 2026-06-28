import "server-only";
import { query, queryOne, execute } from "./db";
import type { Order } from "./types";

export async function listOrders(): Promise<
  (Order & { user_email: string | null; product_title: string | null })[]
> {
  return query(
    `SELECT o.*, u.email AS user_email, p.title AS product_title
     FROM orders o
     LEFT JOIN users u ON u.id = o.user_id
     LEFT JOIN products p ON p.id = o.product_id
     ORDER BY o.created_at DESC`
  );
}

export async function createOrder(input: {
  razorpay_order_id?: string | null;
  user_id?: number | null;
  product_id: number;
  email?: string | null;
  amount: number;
  status?: Order["status"];
}): Promise<Order> {
  const { insertId } = await execute(
    `INSERT INTO orders (razorpay_order_id, user_id, product_id, email, amount, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      input.razorpay_order_id ?? null,
      input.user_id ?? null,
      input.product_id,
      input.email ?? null,
      input.amount,
      input.status ?? "created",
    ]
  );
  return (await queryOne<Order>("SELECT * FROM orders WHERE id = ?", [insertId]))!;
}

export async function markOrderPaid(
  razorpayOrderId: string,
  paymentId: string
): Promise<void> {
  await execute(
    "UPDATE orders SET status = 'paid', razorpay_payment_id = ? WHERE razorpay_order_id = ?",
    [paymentId, razorpayOrderId]
  );
}

export async function getOrderByRazorpayId(
  razorpayOrderId: string
): Promise<Order | undefined> {
  return queryOne<Order>("SELECT * FROM orders WHERE razorpay_order_id = ?", [
    razorpayOrderId,
  ]);
}
