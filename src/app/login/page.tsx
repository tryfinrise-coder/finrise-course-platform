import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

// /login is the ADMIN console sign-in. Students log in at /courses/login.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect(searchParams.next || (user.role === "admin" ? "/admin" : "/dashboard"));
  }

  return <AdminLogin next={searchParams.next} />;
}

// ---- admin console login (distinct, dark control-center look) ----
function AdminLogin({ next }: { next?: string }) {
  const perks = [
    "Products, bundles & digital goods",
    "Students, access & completion",
    "Discounts, payments & revenue",
    "Team, roles & permissions",
  ];
  return (
    <main className="auth-grid" style={{ minHeight: "100dvh", display: "grid", gridTemplateColumns: "1.05fr 1fr" }}>
      <section
        className="auth-brand"
        style={{
          position: "relative",
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#e8eefc",
          background:
            "radial-gradient(700px 520px at 16% 6%, rgba(37,99,235,0.55), transparent 60%)," +
            "radial-gradient(600px 500px at 92% 94%, rgba(200,150,30,0.35), transparent 55%)," +
            "linear-gradient(160deg, #0f1c3f, #0a1330)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: 12, background: "linear-gradient(135deg,#2f6bf6,#1d4ed8)", fontWeight: 800, color: "#fff", boxShadow: "0 8px 22px rgba(37,99,235,0.5)" }}>F</span>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>Finrise</span>
          <span style={{ marginLeft: 6, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
            Admin
          </span>
        </div>

        <div style={{ maxWidth: 460 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, color: "#9fc0ff" }}>
            Control center
          </span>
          <h1 style={{ fontSize: 40, lineHeight: 1.06, margin: "12px 0 16px", color: "#fff" }}>
            Run the whole <span style={{ color: "#f3c969" }}>platform</span> from one place.
          </h1>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {perks.map((p) => (
              <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(232,238,252,0.78)" }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, display: "grid", placeItems: "center", background: "linear-gradient(135deg,#2f6bf6,#1d4ed8)", color: "#fff", fontSize: 12, flexShrink: 0 }}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p style={{ margin: 0, fontSize: 13, color: "rgba(232,238,252,0.5)" }}>Authorized personnel only</p>
      </section>

      <section style={{ display: "grid", placeItems: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <span className="eyebrow">Admin console</span>
          <h2 style={{ fontSize: 26, marginTop: 6 }}>Sign in</h2>
          <p style={{ marginTop: 4 }}>Use your admin or employee credentials.</p>
          <LoginForm next={next} />
          <p className="faint" style={{ fontSize: 13, marginTop: 20, textAlign: "center" }}>
            Not an admin? <Link href="/courses/login" style={{ color: "var(--brand-3)" }}>Go to the student login →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
