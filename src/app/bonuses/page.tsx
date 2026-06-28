import { Download } from "lucide-react";
import AppShell from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth";
import { listOwnedProducts } from "@/lib/entitlements";
import { listProducts } from "@/lib/products";
import { listResources } from "@/lib/resources";

export const dynamic = "force-dynamic";

export default async function BonusesPage() {
  const user = await requireUser("/bonuses");

  // Admins see bonuses from all courses; students see only what they own.
  const allProducts =
    user.role === "admin"
      ? (await listProducts()).filter((p) => p.type === "course")
      : (await listOwnedProducts(user.id)).filter((p) => p.type === "course");

  const sections = await Promise.all(
    allProducts.map(async (product) => {
      const resources = await listResources(product.id);
      const bonuses = resources.filter((r) => r.description_html);
      return { product, bonuses };
    })
  );

  const hasAny = sections.some((s) => s.bonuses.length > 0);

  return (
    <AppShell active="bonuses" title="My Bonuses">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* page header */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">
              Free bonuses
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              My Bonuses
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-amber-100/90">
              All the free bonus materials included with your courses — read the
              details, then download.
            </p>
          </div>
        </div>

        {!hasAny && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <span className="text-5xl">🎁</span>
            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No bonuses yet
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Bonus materials will appear here once your course is set up.
            </p>
          </div>
        )}

        {sections.map(({ product, bonuses }) => {
          if (bonuses.length === 0) return null;
          return (
            <section key={product.id} className="space-y-4">
              {/* course label */}
              {allProducts.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    {product.title}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
              )}

              {bonuses.map((r) => (
                <div
                  key={r.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                >
                  {/* bonus header row */}
                  <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 p-4 sm:p-5">
                    {r.image_path ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={`/download/resource/${r.id}?image=1`}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-rose-50">
                        <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                            fill="#fff"
                            stroke="#dc2626"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 2v5h5"
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          />
                          <rect x="5.5" y="12.5" width="13" height="6.6" rx="1.4" fill="#dc2626" />
                          <text
                            x="12"
                            y="17.5"
                            fontSize="4.6"
                            fontWeight="800"
                            fill="#fff"
                            textAnchor="middle"
                            fontFamily="Arial, sans-serif"
                          >
                            PDF
                          </text>
                        </svg>
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {r.badge && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                            {r.badge}
                          </span>
                        )}
                        <h2 className="text-base font-bold text-slate-900">{r.title}</h2>
                      </div>
                      {r.summary && (
                        <p className="mt-0.5 text-sm text-slate-500">{r.summary}</p>
                      )}
                    </div>

                    <a
                      href={`/download/resource/${r.id}`}
                      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      <Download className="h-4 w-4" /> Download{" "}
                      {(r.kind || "").toUpperCase()}
                    </a>
                  </div>

                  {/* rich HTML description */}
                  <div
                    className="resource-prose p-4 sm:p-5"
                    dangerouslySetInnerHTML={{ __html: r.description_html as string }}
                  />
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
