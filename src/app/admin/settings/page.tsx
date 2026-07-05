import { getCurrentUser } from "@/lib/auth";
import { getAdminKpis } from "@/lib/adminStats";
import { getSettings } from "@/lib/settings";
import { setIncomeProofAction, clearIncomeProofAction } from "@/app/actions/admin";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const [user, kpis, proof] = await Promise.all([
    getCurrentUser(),
    getAdminKpis(),
    getSettings(["income_proof_image", "income_proof_caption", "income_proof_amount"]),
  ]);

  const rows = [
    { k: "Signed in as", v: user?.email ?? "—" },
    { k: "Your role", v: user?.role ?? "—" },
    { k: "Admins / employees", v: String(kpis.admins) },
    { k: "Students", v: String(kpis.students) },
    { k: "Products", v: String(kpis.products) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Settings</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Platform configuration and account.</p>
        </div>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 font-display font-bold">Account &amp; platform</h3>
        <dl className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.k} className="flex items-center justify-between py-3 text-sm">
              <dt className="text-muted-foreground">{r.k}</dt>
              <dd className="font-semibold">{r.v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* Playbook income-proof screenshot — shown on /pages/income-playbook */}
      <Card className="p-5">
        <h3 className="mb-1 font-display font-bold">Playbook income proof</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Upload the income screenshot shown as live proof at the bottom of the{" "}
          <a href="/pages/income-playbook" target="_blank" className="font-mono text-xs underline">/pages/income-playbook</a> landing page.
        </p>

        {proof.income_proof_image ? (
          <div className="mb-4 flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={proof.income_proof_image}
              alt="Current income proof"
              className="h-32 w-auto rounded-lg border border-border object-cover"
            />
            <form action={clearIncomeProofAction}>
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary">
                Remove current image
              </button>
            </form>
          </div>
        ) : (
          <p className="mb-4 rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-6 text-center text-sm text-muted-foreground">
            No proof image uploaded yet — the landing page shows a placeholder until you add one.
          </p>
        )}

        <form action={setIncomeProofAction} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-muted-foreground">Screenshot image (PNG / JPG)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Amount label (optional)</label>
              <input
                type="text"
                name="amount"
                defaultValue={proof.income_proof_amount ?? ""}
                placeholder="₹4,62,140 this month"
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Caption (optional)</label>
              <input
                type="text"
                name="caption"
                defaultValue={proof.income_proof_caption ?? ""}
                placeholder="Razorpay payouts — last 30 days"
                className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-105">
            Save proof
          </button>
        </form>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 font-display font-bold">Routing</h3>
        <p className="text-sm text-muted-foreground">
          Everything runs on a single domain. The public site is{" "}
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">tryfinrise.com</span> (marketing &amp; sales pages at{" "}
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">/pages/&lt;course&gt;</span>). The student app lives at{" "}
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">/courses</span> and this admin panel at{" "}
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">/admin</span> — both require a login (admin role for{" "}
          <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">/admin</span>) and are never linked from the public site.
        </p>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 font-display font-bold">Security</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
            Change the default admin password before going live.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
            Reset any account&apos;s password with{" "}
            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">npm run seed:users -- email pass role</span>.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
            Course content is defined in code; courses can&apos;t be edited from the panel.
          </li>
        </ul>
      </Card>
    </div>
  );
}
