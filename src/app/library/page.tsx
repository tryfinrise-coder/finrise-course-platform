import Link from "next/link";
import AppShell from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth";
import { listOwnedProducts } from "@/lib/entitlements";
import { formatPrice } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const user = await requireUser("/library");
  const owned = await listOwnedProducts(user.id);

  return (
    <AppShell active="library" title="Library">
      <span className="eyebrow">Everything you own</span>
      <h1 style={{ fontSize: 28, margin: "6px 0 4px" }}>Your library</h1>
      <p style={{ marginTop: 0, marginBottom: 18 }}>Courses to open and files to download.</p>

      {owned.length === 0 ? (
        <div className="glass card-pad">
          <p style={{ margin: 0 }}>
            You don&apos;t own anything yet.{" "}
            <Link href="/courses/candlestick-mastery" style={{ color: "var(--brand-3)" }}>
              Explore the candlestick course →
            </Link>
          </p>
        </div>
      ) : (
        <div
          className="grid stagger"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {owned.map((p) => (
            <div key={p.id} className="glass card-hover card-pad">
              <span className="badge" style={{ marginBottom: 10 }}>
                {p.type}
              </span>
              <h3 style={{ fontSize: 18 }}>{p.title}</h3>
              <p style={{ fontSize: 14, minHeight: 40 }}>{p.description}</p>
              {p.type === "course" ? (
                <Link href={`/courses/${p.slug}`} className="btn btn-primary tap" style={{ marginTop: 6 }}>
                  Open course →
                </Link>
              ) : p.type === "pdf" || p.type === "video" ? (
                <a href={`/download/${p.slug}`} className="btn tap" style={{ marginTop: 6 }}>
                  ↓ Download
                </a>
              ) : (
                <span className="faint">Bundle</span>
              )}
              <div className="faint" style={{ marginTop: 10, fontSize: 12 }}>
                {formatPrice(p.price)}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
