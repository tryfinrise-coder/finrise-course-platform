import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Lock, FlaskConical, Layers, GraduationCap, BarChart3 } from "lucide-react";
import AppShell from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth";
import { getProductBySlug, getLessons } from "@/lib/products";
import { ownsProduct } from "@/lib/entitlements";
import { getProgressForProduct, countCompleted } from "@/lib/progress";
import { listResources } from "@/lib/resources";
import { PATTERNS } from "@/data/patterns";
import { PATTERN_FAMILIES } from "@/data/courseContent";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: { params: { course: string } }) {
  const user = await requireUser(`/courses/${params.course}`);
  const product = await getProductBySlug(params.course);
  if (!product || product.type !== "course") notFound();

  const hasAccess = user.role === "admin" || (await ownsProduct(user.id, product.id));
  if (!hasAccess) {
    return (
      <AppShell active="course" title={product.title} narrow>
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-500">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">This course is locked</h1>
          <p className="mt-1 text-sm text-slate-500">You don&apos;t own “{product.title}” yet.</p>
          <Link href="/library" className="mt-5 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">
            Back to library
          </Link>
        </div>
      </AppShell>
    );
  }

  const lessons = await getLessons(product.id);
  const progress = await getProgressForProduct(user.id, product.id);
  const done = await countCompleted(user.id, product.id);
  const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;

  const byKey = new Map(lessons.map((l) => [l.pattern_key ?? "", l]));
  const foundations = lessons
    .filter((l) => !l.pattern_key)
    .sort((a, b) => a.sort_order - b.sort_order);
  const resources = await listResources(product.id);
  const plainResources = resources.filter((r) => !r.description_html);
  const meta = [
    { icon: GraduationCap, label: `${lessons.length} interactive lessons` },
    { icon: Layers, label: `${PATTERN_FAMILIES.length} pattern families` },
    { icon: BarChart3, label: "Live, animated price action" },
  ];

  return (
    <AppShell active="course" title="My Course">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* course header */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-600 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">Interactive course</p>
            <h1 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">{product.title}</h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-emerald-100/90">{product.description}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {meta.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                  <Icon className="h-4 w-4" /> {label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 p-5 sm:px-9">
            <div className="min-w-[200px] flex-1">
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium text-slate-500">Your progress</span>
                <span className="font-bold text-emerald-600">{done}/{lessons.length} · {pct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-600" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <Link
              href={`/courses/${product.slug}/sculptor`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-slate-50"
            >
              <FlaskConical className="h-4 w-4 text-emerald-600" /> Candle Sculptor
            </Link>
          </div>
        </div>

        {/* plain downloadable resources (no description) */}
        {plainResources.length > 0 && (
          <section>
            <div className="mb-3">
              <h2 className="text-lg font-bold text-slate-900">Course resources</h2>
              <p className="text-sm text-slate-500">Cheat sheets and guides to download and keep.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {plainResources.map((r) => (
                <a
                  key={r.id}
                  href={`/download/resource/${r.id}`}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_12px_30px_-14px_rgba(24,168,122,0.4)]"
                >
                  {r.image_path ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={`/download/resource/${r.id}?image=1`} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  ) : r.kind === "pdf" ? (
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-rose-50">
                      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff" stroke="#dc2626" strokeWidth="1.4" strokeLinejoin="round" />
                        <path d="M13 2v5h5" fill="none" stroke="#dc2626" strokeWidth="1.4" strokeLinejoin="round" />
                        <rect x="5.5" y="12.5" width="13" height="6.6" rx="1.4" fill="#dc2626" />
                        <text x="12" y="17.5" fontSize="4.6" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="Arial, sans-serif">PDF</text>
                      </svg>
                    </span>
                  ) : (
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-emerald-50 text-xs font-extrabold uppercase tracking-wide text-emerald-700">
                      {r.kind || "file"}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-slate-900">{r.title}</h3>
                    {r.summary && <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{r.summary}</p>}
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <Download className="h-3.5 w-3.5" /> Download {(r.kind || "").toUpperCase()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* foundations — start here */}
        {foundations.length > 0 && (
          <section>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Start here · Foundations</h2>
                <p className="text-sm text-slate-500">How markets and candlesticks work — the groundwork every chart reader needs.</p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {foundations.filter((l) => progress[l.id]?.status === "completed").length}/{foundations.length}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {foundations.map((l, i) => {
                const isDone = progress[l.id]?.status === "completed";
                return (
                  <Link
                    key={l.id}
                    href={`/courses/${product.slug}/${l.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_12px_30px_-14px_rgba(24,168,122,0.4)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700">{i + 1}</span>
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-300 group-hover:text-emerald-400">Read →</span>
                      )}
                    </div>
                    <h3 className="mt-3 text-base font-bold leading-snug text-slate-900">{l.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{l.body}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* lessons grouped by family */}
        {PATTERN_FAMILIES.map((family) => {
          const famLessons = family.keys.map((k) => byKey.get(k)).filter(Boolean) as typeof lessons;
          if (famLessons.length === 0) return null;
          const famDone = famLessons.filter((l) => progress[l.id]?.status === "completed").length;
          return (
            <section key={family.title}>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{family.title}</h2>
                  <p className="text-sm text-slate-500">{family.blurb}</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {famDone}/{famLessons.length}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {famLessons.map((l) => {
                  const pat = l.pattern_key ? PATTERNS[l.pattern_key] : undefined;
                  const isDone = progress[l.id]?.status === "completed";
                  const biasCls =
                    pat?.bias === "bullish" ? "bg-emerald-50 text-emerald-700"
                    : pat?.bias === "bearish" ? "bg-rose-50 text-rose-700"
                    : "bg-slate-100 text-slate-600";
                  return (
                    <Link
                      key={l.id}
                      href={`/courses/${product.slug}/${l.slug}`}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_12px_30px_-14px_rgba(79,70,229,0.4)]"
                    >
                      <div className="flex items-center justify-between">
                        {pat && <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${biasCls}`}>{pat.bias}</span>}
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-300 group-hover:text-emerald-400">Start →</span>
                        )}
                      </div>
                      <h3 className="mt-3 text-base font-bold leading-snug text-slate-900">{l.title}</h3>
                      {pat && <p className="mt-1 text-sm leading-relaxed text-slate-500">{pat.tagline}</p>}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
