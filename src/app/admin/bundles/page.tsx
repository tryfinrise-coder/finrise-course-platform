import { listBundles } from "@/lib/bundles";
import { listProducts } from "@/lib/products";
import { deleteProductAction } from "@/app/actions/admin";
import { createBundleAction } from "@/app/actions/adminx";
import { formatPrice } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { TextField, TextArea, SubmitButton } from "@/components/admin/fields";

export const dynamic = "force-dynamic";

export default async function AdminBundles() {
  const [bundles, products] = await Promise.all([listBundles(), listProducts()]);
  const sellable = products.filter((p) => p.type !== "bundle");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Bundles</h2>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {bundles.length} total
          </span>
        </div>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 font-display font-bold">New bundle</h3>
        <form action={createBundleAction} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <TextField label="Title" name="title" required />
            <TextField label="Slug" name="slug" placeholder="starter-bundle" required />
            <TextField label="Price (₹)" name="price" type="number" min="0" defaultValue={0} />
          </div>
          <TextArea label="Description" name="description" />
          <div>
            <span className="mb-2 block text-xs font-semibold text-muted-foreground">Include products</span>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sellable.map((p) => (
                <label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/50">
                  <input type="checkbox" name="child_ids" value={p.id} />
                  <span className="truncate">{p.title}</span>
                  <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold">{p.type}</span>
                </label>
              ))}
            </div>
          </div>
          <SubmitButton>Create bundle</SubmitButton>
        </form>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
          <h3 className="font-display text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            All bundles
          </h3>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {bundles.length}
          </span>
        </div>
        {bundles.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">No bundles yet — create one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Bundle</th>
                  <th className="px-3 py-3 font-semibold">Items</th>
                  <th className="px-3 py-3 font-semibold">Price</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bundles.map((b) => (
                  <tr key={b.id} className="border-b border-border transition-colors last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold">{b.title}</div>
                      <div className="text-xs text-muted-foreground">/{b.slug}</div>
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground tabular-nums">
                      {b.child_count} item{b.child_count === 1 ? "" : "s"}
                    </td>
                    <td className="px-3 py-3.5 font-medium tabular-nums">{formatPrice(b.price)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end">
                        <form action={deleteProductAction}>
                          <input type="hidden" name="id" value={b.id} />
                          <button type="submit" className="inline-flex h-8 items-center rounded-lg border border-destructive/30 bg-destructive/5 px-3 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10">
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
        )}
      </Card>
    </div>
  );
}
