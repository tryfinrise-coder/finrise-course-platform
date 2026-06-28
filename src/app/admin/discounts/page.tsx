import { listDiscounts, discountStatus, type DiscountStatus } from "@/lib/discounts";
import { formatPrice, formatDate } from "@/lib/types";
import {
  createDiscountAction,
  toggleDiscountAction,
  deleteDiscountAction,
} from "@/app/actions/adminx";
import { Card } from "@/components/ui/card";
import { TextField, SelectField, SubmitButton } from "@/components/admin/fields";
import { DatePicker } from "@/components/admin/DatePicker";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<DiscountStatus, { cls: string; dot: string; label: string }> = {
  active: { cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", label: "active" },
  scheduled: { cls: "bg-blue-50 text-blue-700", dot: "bg-blue-500", label: "scheduled" },
  expired: { cls: "bg-amber-50 text-amber-700", dot: "bg-amber-500", label: "expired" },
  exhausted: { cls: "bg-slate-100 text-slate-500", dot: "bg-slate-400", label: "used up" },
  disabled: { cls: "bg-slate-100 text-slate-500", dot: "bg-slate-400", label: "disabled" },
};

export default async function AdminDiscounts() {
  const codes = await listDiscounts();
  const liveCount = codes.filter((d) => discountStatus(d) === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Discounts</h2>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {codes.length} total · {liveCount} live
          </span>
        </div>
      </div>

      <Card className="p-5">
        <h3 className="mb-1 font-display font-bold">New discount code</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Set a percentage or flat amount off, with optional usage limit, schedule window and minimum order value.
        </p>
        <form action={createDiscountAction} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TextField label="Code" name="code" placeholder="LAUNCH20" required />
          <SelectField label="Type" name="kind" defaultValue="percent">
            <option value="percent">Percent %</option>
            <option value="fixed">Fixed ₹</option>
          </SelectField>
          <TextField label="Value" name="value" type="number" min="0" step="1" placeholder="20" required />
          <TextField label="Max uses" name="max_uses" type="number" min="0" placeholder="∞" />
          <TextField label="Min order (₹)" name="min_order" type="number" min="0" step="1" placeholder="none" />
          <DatePicker label="Starts" name="starts_at" />
          <DatePicker label="Expires" name="expires_at" />
          <label className="flex items-center gap-2 self-end pb-1 text-sm font-medium text-muted-foreground">
            <input type="checkbox" name="auto_apply" /> Auto-apply at checkout
          </label>
          <div className="flex items-end">
            <SubmitButton>Create code</SubmitButton>
          </div>
        </form>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
          <h3 className="font-display text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Promo codes
          </h3>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {codes.length}
          </span>
        </div>
        {codes.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">No discount codes yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {codes.map((d) => {
              const st = STATUS_STYLE[discountStatus(d)];
              const usePct = d.max_uses ? Math.min(100, Math.round((d.used_count / d.max_uses) * 100)) : 0;
              return (
                <div key={d.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5 transition-colors hover:bg-secondary/30">
                  <span className="rounded-lg bg-secondary px-3 py-1 font-mono text-sm font-bold tracking-wide">
                    {d.code}
                  </span>
                  <span className="text-sm font-semibold">
                    {d.kind === "percent" ? `${d.value}% off` : `${formatPrice(d.value)} off`}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${st.cls}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} /> {st.label}
                  </span>
                  {d.auto_apply ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                      ⚡ auto-applied
                    </span>
                  ) : null}

                  {/* meta */}
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    {d.min_order != null && <span>min {formatPrice(d.min_order)}</span>}
                    {d.starts_at && <span>from {formatDate(d.starts_at)}</span>}
                    {d.expires_at && <span>till {formatDate(d.expires_at)}</span>}
                  </span>

                  {/* usage */}
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    {d.max_uses ? (
                      <>
                        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                          <span className="block h-full rounded-full bg-primary" style={{ width: `${usePct}%` }} />
                        </span>
                        <span className="tabular-nums">{d.used_count}/{d.max_uses}</span>
                      </>
                    ) : (
                      <span className="tabular-nums">{d.used_count} used</span>
                    )}
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    <form action={toggleDiscountAction}>
                      <input type="hidden" name="id" value={d.id} />
                      <input type="hidden" name="active" value={d.active ? "0" : "1"} />
                      <button type="submit" className="inline-flex h-8 items-center rounded-lg border border-input bg-card px-3 text-xs font-semibold transition-colors hover:bg-secondary">
                        {d.active ? "Disable" : "Enable"}
                      </button>
                    </form>
                    <form action={deleteDiscountAction}>
                      <input type="hidden" name="id" value={d.id} />
                      <button type="submit" className="inline-flex h-8 items-center rounded-lg border border-destructive/30 bg-destructive/5 px-3 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
