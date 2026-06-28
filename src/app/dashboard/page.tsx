import Link from "next/link";
import { Flame, BookOpenCheck, Award, Layers, ArrowRight, Circle, TrendingUp } from "lucide-react";
import AppShell from "@/components/shell/AppShell";
import LearningHub from "@/components/student/LearningHub";
import { requireUser } from "@/lib/auth";
import { getStats, getUserBadgeKeys } from "@/lib/gamification";
import { listOwnedProducts } from "@/lib/entitlements";
import { getLessons } from "@/lib/products";
import { getProgressForProduct, countCompletedAll } from "@/lib/progress";
import { BADGES } from "@/data/badges";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");
  const [stats, badgeKeys, owned, totalDone] = await Promise.all([
    getStats(user.id),
    getUserBadgeKeys(user.id),
    listOwnedProducts(user.id),
    countCompletedAll(user.id),
  ]);

  const courses = owned.filter((p) => p.type === "course");
  const cards = await Promise.all(
    courses.map(async (c) => {
      const lessons = await getLessons(c.id);
      const progress = await getProgressForProduct(user.id, c.id);
      const done = lessons.filter((l) => progress[l.id]?.status === "completed").length;
      const nextLesson = lessons.find((l) => progress[l.id]?.status !== "completed") || lessons[0];
      return {
        product: c, lessons, progress,
        total: lessons.length, done,
        pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
        nextLesson,
      };
    })
  );

  const first = cards[0];
  const greeting = user.name?.split(" ")[0] || user.email.split("@")[0];
  const ownedBadges = BADGES.filter((b) => badgeKeys.has(b.key));
  const lockedBadges = BADGES.filter((b) => !badgeKeys.has(b.key));
  const upNext = first ? first.lessons.filter((l) => first.progress[l.id]?.status !== "completed").slice(0, 5) : [];

  const stat = [
    { label: "Lessons done", value: totalDone, icon: BookOpenCheck },
    { label: "Day streak", value: stats.current_streak, icon: Flame },
    { label: "Badges", value: `${badgeKeys.size}/${BADGES.length}`, icon: Award },
    { label: "Courses", value: courses.length, icon: Layers },
  ];

  return (
    <AppShell active="dashboard" title="Dashboard">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="grid items-stretch gap-5 lg:grid-cols-[1.8fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-500/[0.06] blur-2xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">Welcome back</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Hi {greeting} 👋</h1>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-500">
              {first ? `You've completed ${first.done} of ${first.total} lessons. Pick up where you left off.` : "Enroll in a course to start learning candlestick patterns."}
            </p>
            {first && (
              <Link
                href={first.nextLesson ? `/courses/${first.product.slug}/${first.nextLesson.slug}` : `/courses/${first.product.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-emerald-500"
              >
                Continue learning <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50/60 p-7 text-center shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-100 text-amber-500">
              <Flame className="h-7 w-7 fill-amber-400 text-amber-500" />
            </span>
            <div className="mt-3 text-3xl font-extrabold text-slate-900">{stats.current_streak}</div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-600">Day streak</div>
            <p className="mt-1.5 text-[13px] text-slate-500">Finish a lesson today to keep it alive.</p>
          </div>
        </section>

        {/* ── STATS STRIP ────────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stat.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-2xl font-bold leading-none text-slate-900">{value}</div>
                <div className="mt-1 text-xs font-medium text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ── MY COURSES ─────────────────────────────────────── */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Courses</h2>
            <Link href="/library" className="text-sm font-semibold text-emerald-600 hover:text-emerald-500">Browse all →</Link>
          </div>
          {cards.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">You&apos;re not enrolled in a course yet.</div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {cards.map(({ product, total, done, pct, nextLesson }) => (
                <Link
                  key={product.id}
                  href={nextLesson ? `/courses/${product.slug}/${nextLesson.slug}` : `/courses/${product.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_18px_40px_-16px_rgba(79,70,229,0.35)]"
                >
                  <div className="relative flex h-24 items-center justify-between bg-gradient-to-br from-emerald-500 to-emerald-500 px-5">
                    <TrendingUp className="h-8 w-8 text-white/90" />
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">{total - done} left</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold leading-snug text-slate-900">{product.title}</h3>
                    <div className="mt-1 text-xs font-medium text-slate-400">{done} of {total} lessons</div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-sm font-bold text-emerald-600">{pct}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── CONTINUE LEARNING ──────────────────────────────── */}
        {first && (
          <section>
            <h2 className="mb-4 text-lg font-bold text-slate-900">Continue learning</h2>
            <div className="grid gap-5 lg:grid-cols-[7fr_3fr]">
              <LearningHub
                courseTitle={first.product.title}
                nextHref={first.nextLesson ? `/courses/${first.product.slug}/${first.nextLesson.slug}` : `/courses/${first.product.slug}`}
                nextTitle={first.nextLesson?.title || "Review course"}
                lessonNo={Math.min(first.done + 1, first.total)}
                totalLessons={first.total}
                sculptorHref={`/courses/${first.product.slug}/sculptor`}
              />

              <aside className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <h3 className="mb-3 font-bold text-slate-900">Up next</h3>
                  <div className="space-y-0.5">
                    {upNext.length === 0 && <p className="text-sm text-slate-400">You&apos;ve completed every lesson 🎉</p>}
                    {upNext.map((l, idx) => (
                      <Link key={l.id} href={`/courses/${first.product.slug}/${l.slug}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50">
                        <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                        <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{l.title}</span>
                        {idx === 0 && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">NEXT</span>}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Badges</h3>
                    <Link href="/achievements" className="text-xs font-semibold text-emerald-600 hover:text-emerald-500">View all</Link>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {ownedBadges.map((b) => (
                      <span key={b.key} title={b.title} className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-xl ring-1 ring-emerald-100">{b.icon}</span>
                    ))}
                    {lockedBadges.slice(0, Math.max(0, 8 - ownedBadges.length)).map((b) => (
                      <span key={b.key} title={`Locked: ${b.title}`} className="grid h-11 w-11 place-items-center rounded-full bg-slate-50 text-xl opacity-40 ring-1 ring-slate-100 grayscale">🔒</span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
