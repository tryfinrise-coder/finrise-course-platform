import Link from "next/link";
import LoginForm from "./LoginForm";
import Candles from "@/components/Candles";

// Student login view — rendered at /courses/login (the student URL).
// /login is the separate admin console sign-in.
export default function StudentLogin({ next }: { next?: string }) {
  const perks = [
    "30 interactive candlestick patterns",
    "Living, tick-by-tick price action",
    "Earn XP, keep streaks, unlock badges",
    "Climb the student leaderboard",
  ];

  return (
    <main style={{ minHeight: "100dvh", display: "grid", gridTemplateColumns: "1.05fr 1fr" }} className="auth-grid">
      <section
        className="auth-brand"
        style={{
          position: "relative",
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(700px 500px at 18% 8%, rgba(37,99,235,0.14), transparent 60%)," +
            "radial-gradient(600px 500px at 92% 92%, rgba(200,150,30,0.16), transparent 55%)," +
            "linear-gradient(160deg, #eaf1fe, #fff8ea)",
          borderRight: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <Link href="/" className="brandmark" style={{ fontSize: 24 }}>
          Finrise
        </Link>
        <div style={{ maxWidth: 460 }}>
          <Candles count={6} />
          <div style={{ marginTop: 14 }} />
          <span className="eyebrow">Interactive candlestick course</span>
          <h1 style={{ fontSize: 40, lineHeight: 1.05, margin: "12px 0 16px" }}>
            Learn candlesticks as <span style={{ color: "var(--brand-3)" }}>living price action</span>.
          </h1>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {perks.map((p) => (
              <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)" }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, display: "grid", placeItems: "center", background: "var(--grad)", color: "#fff", fontSize: 12, flexShrink: 0 }}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="faint" style={{ margin: 0, fontSize: 13 }}>© Finrise — Professional Trader Series</p>
      </section>

      <section style={{ display: "grid", placeItems: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <h2 style={{ fontSize: 26 }}>Welcome back</h2>
          <p style={{ marginTop: 4 }}>Log in to continue your learning streak.</p>
          <LoginForm next={next} />
          <p className="faint" style={{ fontSize: 13, marginTop: 20, textAlign: "center" }}>
            Accounts are created by purchase or by an admin.
          </p>
        </div>
      </section>
    </main>
  );
}
