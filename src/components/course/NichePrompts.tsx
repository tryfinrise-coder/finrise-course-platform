import { NICHE_PROMPTS } from "@/data/playbookContent";

// Renders the 15-niche AI prompt library inside the playbook course lesson.
// Presentational only — safe as a server component.
export default function NichePrompts() {
  return (
    <div style={{ display: "grid", gap: 18, marginTop: 8 }}>
      {NICHE_PROMPTS.map((set, i) => (
        <section key={set.niche} className="glass card-pad">
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 26,
                height: 26,
                borderRadius: 8,
                background: "var(--grad)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <h2 style={{ fontSize: 18, margin: 0 }}>{set.niche}</h2>
            <span className="chip" style={{ fontSize: 11 }}>{set.price}</span>
          </div>
          <p style={{ margin: "8px 0 12px", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>
            <b style={{ color: "var(--text)" }}>Who it's for:</b> {set.audience}
          </p>

          <div style={{ display: "grid", gap: 12 }}>
            {set.prompts.map((pr) => (
              <div key={pr.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: "var(--brand, #18A87A)",
                      padding: "3px 9px",
                      borderRadius: 100,
                    }}
                  >
                    {pr.label}
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{pr.goal}</span>
                </div>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontFamily: "'Consolas','Courier New',monospace",
                    fontSize: 12.5,
                    lineHeight: 1.6,
                    color: "#EDE9FB",
                    background: "#1B1530",
                    border: "1px solid #2E2450",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  {pr.prompt}
                </pre>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
