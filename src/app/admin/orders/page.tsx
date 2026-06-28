import { listOrders } from "@/lib/orders";
import { listPurchases } from "@/lib/purchases";
import { formatPrice, formatDate } from "@/lib/types";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminPayments() {
  const [orders, purchases] = await Promise.all([listOrders(), listPurchases()]);
  const paid = orders.filter((o) => o.status === "paid");
  const revenue = paid.reduce((s, o) => s + o.amount, 0);
  const paidPurchases = purchases.filter((p) => p.status === "paid");

  const summary = [
    { label: "Total revenue", value: formatPrice(revenue) },
    { label: "Paid orders", value: paid.length },
    { label: "All orders", value: orders.length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Orders</h2>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {orders.length} total
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {summary.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="font-display text-xl font-extrabold tabular-nums">{s.value}</div>
            <div className="mt-0.5 text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-secondary/40 px-5 py-3">
          <h3 className="font-display text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Order history</h3>
        </div>
        {orders.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            No orders yet. Razorpay orders and manual grants will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">When</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Razorpay ref</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border transition-colors last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3.5 text-muted-foreground">{formatDate(o.created_at)}</td>
                    <td className="px-5 py-3.5">{o.user_email || o.email || "—"}</td>
                    <td className="px-5 py-3.5">{o.product_title || "—"}</td>
                    <td className="px-5 py-3.5 font-semibold tabular-nums">{formatPrice(o.amount)}</td>
                    <td className="px-5 py-3.5">
                      {o.status === "paid" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {o.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> {o.status}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">
                      {o.razorpay_order_id || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Razorpay checkout leads — who paid, so you can create their login */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
          <h3 className="font-display text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Course purchases (create logins for paid buyers)
          </h3>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {paidPurchases.length} paid
          </span>
        </div>
        {purchases.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            No checkout attempts yet. When a buyer pays via Razorpay they appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">When</th>
                  <th className="px-5 py-3 font-semibold">Buyer</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Code</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-b border-border transition-colors last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3.5 text-muted-foreground">{formatDate(p.created_at)}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold">{p.name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{p.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{p.phone || "—"}</td>
                    <td className="px-5 py-3.5 font-semibold tabular-nums">{formatPrice(p.amount)}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{p.discount_code || "—"}</td>
                    <td className="px-5 py-3.5">
                      {p.status === "paid" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {p.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
