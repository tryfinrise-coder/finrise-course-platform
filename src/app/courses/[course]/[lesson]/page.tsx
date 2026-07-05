import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth";
import { getProductBySlug, getLessons, getLesson } from "@/lib/products";
import { ownsProduct } from "@/lib/entitlements";
import { getPattern } from "@/data/patterns";
import { markLessonCompleteAction } from "@/app/actions/progress";
import LessonClient from "./LessonClient";
import FoundationComplete from "./FoundationComplete";
import PatternDiagram from "@/components/game/PatternDiagram";
import SimpleLesson from "@/components/course/SimpleLesson";
import CandleAnatomy from "@/components/course/CandleAnatomy";
import CandleBreakdown from "@/components/chart/CandleBreakdown";
import PatternSpotlight from "@/components/chart/PatternSpotlight";
import ActionableTips from "@/components/chart/ActionableTips";
import SupportResistance from "@/components/course/SupportResistance";
import RiskManagementCharts from "@/components/course/RiskManagementCharts";
import LessonModulesNav from "@/components/course/LessonModulesNav";
import { PATTERN_GUIDE, FOUNDATION_BY_SLUG } from "@/data/courseContent";
import { PLAYBOOK_BY_SLUG } from "@/data/playbookContent";
import NichePrompts from "@/components/course/NichePrompts";
import { getSimpleContent } from "@/courses/candlestick-mastery";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: { course: string; lesson: string };
}) {
  const user = await requireUser(`/courses/${params.course}/${params.lesson}`);
  const product = await getProductBySlug(params.course);
  if (!product || product.type !== "course") notFound();

  const hasAccess = user.role === "admin" || (await ownsProduct(user.id, product.id));
  if (!hasAccess) notFound();

  const lesson = await getLesson(product.id, params.lesson);
  if (!lesson) notFound();

  const pattern = lesson.pattern_key ? getPattern(lesson.pattern_key) : undefined;

  const lessons = await getLessons(product.id);
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  const complete = markLessonCompleteAction.bind(null, lesson.id);
  const nextHref = next ? `/courses/${product.slug}/${next.slug}` : `/courses/${product.slug}`;
  const nextLabel = next ? next.title : "Back to course";

  const biasClass = pattern
    ? pattern.bias === "bullish"
      ? "chip-bull"
      : pattern.bias === "bearish"
      ? "chip-bear"
      : "chip"
    : "chip";

  const simple = getSimpleContent(lesson.slug);

  return (
    <AppShell active="course" title={`Lesson ${idx + 1}`}>
      <div className="lesson-layout">
        <aside className="lesson-nav-col">
          <LessonModulesNav lessons={lessons} currentSlug={lesson.slug} courseSlug={product.slug} />
        </aside>
        <div className="lesson-main">
      <Link href={`/courses/${product.slug}`} className="faint" style={{ fontSize: 13 }}>
        ← {product.title}
      </Link>

      <div style={{ display: "flex", gap: 10, alignItems: "center", margin: "10px 0 6px", flexWrap: "wrap" }}>
        <span className="eyebrow">Lesson {idx + 1} of {lessons.length}</span>
        {pattern && <span className={`chip ${biasClass}`}>{pattern.bias}</span>}
        <span className="chip chip-xp">+50 XP</span>
      </div>
      <h1 style={{ fontSize: 28 }}>{lesson.title}</h1>
      {pattern && <p style={{ marginTop: 0, maxWidth: 720 }}>{pattern.description}</p>}

      {/* beginner-friendly explainer + Hindi toggle + FAQs (when available) */}
      {simple && (
        <div style={{ margin: "20px 0 4px" }}>
          <SimpleLesson content={simple} />
        </div>
      )}

      {pattern ? (
        <>
          {/* 1 — understand the shape */}
          <h2 style={{ fontSize: 17, margin: "26px 0 12px" }}>1 · Understand the shape</h2>
          <div className="r-grid r-2">
            <div className="glass card-pad">
              <PatternDiagram pattern={pattern} />
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 14, fontSize: 13 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--bull)" }} /> Bullish candle
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--bear)" }} /> Bearish candle
                </span>
              </div>
            </div>

            <div className="glass card-pad">
              <h3 style={{ fontSize: 15, color: "var(--brand-3)", marginBottom: 12 }}>How to read it</h3>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {pattern.callouts.map((c, i) => (
                  <li key={i} style={{ display: "flex", gap: 10 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        flexShrink: 0,
                        borderRadius: 999,
                        display: "grid",
                        placeItems: "center",
                        background: "var(--grad)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.5 }}>{c.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* marked demo chart — "this is the pattern" */}
          <div style={{ marginTop: 16 }}>
            <PatternSpotlight pattern={pattern} />
          </div>

          {/* 2 — watch it form */}
          <h2 style={{ fontSize: 17, margin: "26px 0 12px" }}>2 · Watch it form</h2>
          <LessonClient pattern={pattern} onComplete={complete} nextHref={nextHref} nextLabel={nextLabel} />

          {/* per-candle play-by-play */}
          <div style={{ marginTop: 14 }}>
            <CandleBreakdown pattern={pattern} />
          </div>

          {/* 3 — why it matters */}
          <h2 style={{ fontSize: 17, margin: "26px 0 12px" }}>3 · Why it matters</h2>
          <div className="r-grid r-2">
            <div className="glass card-pad">
              <h3 style={{ fontSize: 15, color: "var(--brand-3)" }}>💡 Key idea</h3>
              <p style={{ margin: 0, fontSize: 14 }}>{pattern.keyIdea}</p>
            </div>
            <div className="glass card-pad">
              <h3 style={{ fontSize: 15, color: "var(--brand-3)" }}>📈 What happened next</h3>
              <p style={{ margin: 0, fontSize: 14 }}>{pattern.outcome}</p>
            </div>
          </div>

          {/* 4 — how to trade it (practical guide) */}
          {PATTERN_GUIDE[pattern.key] && (
            <>
              <h2 style={{ fontSize: 17, margin: "26px 0 12px" }}>4 · Trade it</h2>
              {(() => {
                const guide = PATTERN_GUIDE[pattern.key];
                return (
                  <div className="grid" style={{ gap: 16 }}>
                    <div className="r-grid r-2">
                      <div className="glass card-pad">
                        <h3 style={{ fontSize: 15, color: "var(--brand-3)" }}>🎯 How to trade it</h3>
                        <p style={{ margin: 0, fontSize: 14 }}>{guide.howToTrade}</p>
                        <p style={{ margin: "10px 0 0", fontSize: 13 }} className="muted">
                          <b style={{ color: "var(--text)" }}>Stop-loss:</b> {guide.stop}
                        </p>
                      </div>
                      <div className="glass card-pad">
                        <h3 style={{ fontSize: 15, color: "var(--brand-3)" }}>📊 Reliability</h3>
                        <p style={{ margin: 0, fontSize: 14 }}>{guide.reliability}</p>
                        <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {guide.bestTf.split("·").map((t) => (
                            <span key={t} className="chip">{t.trim()}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="glass card-pad">
                      <h3 style={{ fontSize: 15, color: "var(--brand-3)" }}>💡 Trading tips</h3>
                      <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
                        {guide.tips.map((t, i) => (
                          <li key={i} style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </>
          )}

          {/* 5 — pro trader's actionable playbook */}
          <h2 style={{ fontSize: 17, margin: "26px 0 12px" }}>5 · Pro trader&apos;s playbook</h2>
          <ActionableTips pattern={pattern} />
        </>
      ) : FOUNDATION_BY_SLUG[lesson.slug] ? (
        (() => {
          const f = FOUNDATION_BY_SLUG[lesson.slug];
          return (
            <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
              {lesson.slug === "anatomy-of-a-candle" && (
                <section className="glass card-pad">
                  <h2 style={{ fontSize: 18, margin: "0 0 4px" }}>The parts of a candle</h2>
                  <p style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
                    Every candlestick is drawn from just four prices — <strong>open, high, low, close</strong>.
                    Here is how they map to the shape you see on the chart.
                  </p>
                  <div style={{ maxWidth: 460, margin: "0 auto" }}>
                    <CandleAnatomy />
                  </div>
                </section>
              )}
              {lesson.slug === "trend-support-resistance" && <SupportResistance />}
              {lesson.slug === "risk-management" && <RiskManagementCharts />}
              {f.sections.map((s, i) => (
                <section key={i} className="glass card-pad">
                  <h2 style={{ fontSize: 18, margin: "0 0 10px" }}>{s.heading}</h2>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75 }}>{s.body}</p>
                  {s.example && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: "var(--accent, rgba(24,168,122,0.08))",
                        borderLeft: "3px solid var(--brand)",
                      }}
                    >
                      <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand)", margin: "0 0 4px" }}>
                        Real-life example
                      </h3>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }}>{s.example}</p>
                    </div>
                  )}
                </section>
              ))}

              <section className="glass card-pad">
                <h2 style={{ fontSize: 16, color: "var(--brand-3)", marginBottom: 10 }}>Key takeaways</h2>
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
                  {f.takeaways.map((t, i) => (
                    <li key={i} style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</li>
                  ))}
                </ul>
              </section>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <FoundationComplete onComplete={complete} nextHref={nextHref} nextLabel={nextLabel} />
              </div>
            </div>
          );
        })()
      ) : PLAYBOOK_BY_SLUG[lesson.slug] ? (
        (() => {
          const f = PLAYBOOK_BY_SLUG[lesson.slug];
          return (
            <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
              {f.sections.map((s, i) => (
                <section key={i} className="glass card-pad">
                  <h2 style={{ fontSize: 18, margin: "0 0 10px" }}>{s.heading}</h2>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75 }}>{s.body}</p>
                  {s.example && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: "var(--accent, rgba(24,168,122,0.08))",
                        borderLeft: "3px solid var(--brand)",
                      }}
                    >
                      <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand)", margin: "0 0 4px" }}>
                        Example
                      </h3>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }}>{s.example}</p>
                    </div>
                  )}
                </section>
              ))}

              {/* The prompt-library lesson renders all 15 niches below its intro */}
              {lesson.slug === "ai-prompt-library" && <NichePrompts />}

              <section className="glass card-pad">
                <h2 style={{ fontSize: 16, color: "var(--brand-3)", marginBottom: 10 }}>Key takeaways</h2>
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
                  {f.takeaways.map((t, i) => (
                    <li key={i} style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</li>
                  ))}
                </ul>
              </section>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <FoundationComplete onComplete={complete} nextHref={nextHref} nextLabel={nextLabel} />
              </div>
            </div>
          );
        })()
      ) : (
        <div className="glass card-pad" style={{ marginTop: 16 }}>
          <p>{lesson.body}</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, gap: 10 }}>
        {prev ? (
          <Link href={`/courses/${product.slug}/${prev.slug}`} className="btn btn-ghost tap">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/courses/${product.slug}/${next.slug}`} className="btn tap">
            {next.title} →
          </Link>
        ) : (
          <Link href={`/courses/${product.slug}`} className="btn tap">
            Finish course ✓
          </Link>
        )}
      </div>
        </div>
      </div>
    </AppShell>
  );
}
