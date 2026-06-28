import Link from "next/link";
import { GraduationCap, Wallet, TrendingUp, Download, Package, CreditCard, ArrowUpRight } from "lucide-react";
import { getAdminKpis, recentStudents } from "@/lib/adminStats";
import { downloadsByProduct } from "@/lib/downloads";
import { listOrders } from "@/lib/orders";
import { formatPrice, formatDate } from "@/lib/types";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [kpis, students, dls, orders] = await Promise.all([
    getAdminKpis(),
    recentStudents(6),
    downloadsByProduct(),
    listOrders(),
  ]);

  const cards = [
    { label: "Students", value: kpis.students.toLocaleString(), icon: GraduationCap, href: "/admin/users", ring: "bg-emerald-50 text-emerald-600" },
    { label: "Paid revenue", value: formatPrice(kpis.revenue), icon: Wallet, href: "/admin/orders", ring: "bg-emerald-50 text-emerald-600" },
    { label: "Avg. completion", value: `${kpis.completionRate}%`, icon: TrendingUp, href: "/admin/users", ring: "bg-emerald-50 text-emerald-600" },
    { label: "Downloads", value: kpis.totalDownloads.toLocaleString(), icon: Download, href: "/admin/products", ring: "bg-amber-50 text-amber-600" },
    { label: "Products", value: kpis.products.toLocaleString(), icon: Package, href: "/admin/products", ring: "bg-emerald-50 text-emerald-600" },
    { label: "Paid orders", value: kpis.paidOrders.toLocaleString(), icon: CreditCard, href: "/admin/orders", ring: "bg-pink-50 text-pink-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Dashboard</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">A snapshot of your platform — students, revenue, and engagement.</p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map(({ label, value, icon: Icon, href, ring }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-9 w-9 place-items-center rounded-lg ${ring}`}>
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
            </div>
            <div className="mt-3 text-[22px] font-extrabold tracking-tight tabular-nums">{value}</div>
            <div className="text-[13px] font-medium text-muted-foreground">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* recent students */}
        <Card className="overflow-hidden p-0 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-display font-bold">Recent students</h3>
            <Link href="/admin/users" className="text-[13px] font-semibold text-primary hover:text-primary/80">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {students.length === 0 && (
              <p className="px-5 py-6 text-sm text-muted-foreground">No students yet.</p>
            )}
            {students.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-colors">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-bold text-muted-foreground">
                  {(s.name || s.email).charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{s.name || s.email.split("@")[0]}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.email}</div>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(s.created_at)}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* top downloads */}
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-4">
            <h3 className="font-display font-bold">Top downloads</h3>
          </div>
          <div className="space-y-3 p-5">
            {dls.length === 0 && <p className="text-sm text-muted-foreground">No downloads yet.</p>}
            {dls.slice(0, 6).map((d) => (
              <div key={d.product_id} className="flex items-center justify-between gap-3">
                <span className="truncate text-sm">{d.title || `#${d.product_id}`}</span>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold tabular-nums text-amber-700">{d.downloads}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* recent payments */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-display font-bold">Recent payments</h3>
          <Link href="/admin/orders" className="text-[13px] font-semibold text-primary hover:text-primary/80">View all</Link>
        </div>
        {orders.length === 0 ? (
          <p className="px-5 py-6 text-sm text-muted-foreground">No orders yet.</p>
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
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
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
