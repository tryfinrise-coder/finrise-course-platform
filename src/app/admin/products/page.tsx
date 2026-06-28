import Link from "next/link";
import { listProducts, getLessons } from "@/lib/products";
import { formatPrice } from "@/lib/types";
import { deleteProductAction } from "@/app/actions/admin";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  const products = await listProducts();
  const lessonCounts = await Promise.all(
    products.map((p) => getLessons(p.id).then((l) => l.length))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Products</h2>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {products.length} total
          </span>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          + New product
        </Link>
      </div>

      {/* list */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-3 py-3 font-semibold">Type</th>
                <th className="px-3 py-3 font-semibold">Price</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Lessons</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    No products yet — create one above.
                  </td>
                </tr>
              )}
              {products.map((p, i) => (
                <tr key={p.id} className="border-b border-border transition-colors last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/products/${p.id}`} className="font-semibold text-foreground hover:text-primary">
                      {p.title}
                    </Link>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold capitalize">{p.type}</span>
                  </td>
                  <td className="px-3 py-3.5 font-medium tabular-nums">{formatPrice(p.price)}</td>
                  <td className="px-3 py-3.5">
                    {p.published ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-muted-foreground tabular-nums">
                    {p.type === "course" ? lessonCounts[i] : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Manage →
                      </Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="inline-flex h-8 items-center rounded-lg border border-destructive/30 bg-destructive/5 px-3 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
