import { getCurrentUser } from "@/lib/auth";
import { getAdminKpis } from "@/lib/adminStats";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const [user, kpis] = await Promise.all([getCurrentUser(), getAdminKpis()]);

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
