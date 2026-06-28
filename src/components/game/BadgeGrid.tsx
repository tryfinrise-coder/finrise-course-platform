import { BADGES } from "@/data/badges";

// Shows every badge, dimmed until unlocked. Presentational.
export default function BadgeGrid({
  ownedKeys,
  limit,
}: {
  ownedKeys: string[];
  limit?: number;
}) {
  const owned = new Set(ownedKeys);
  const list = limit ? BADGES.slice(0, limit) : BADGES;

  return (
    <div
      className="grid stagger"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}
    >
      {list.map((b) => {
        const has = owned.has(b.key);
        return (
          <div
            key={b.key}
            className={`badge-tile tier-${b.tier} ${has ? "" : "locked"}`}
            title={b.description}
          >
            <div className="badge-face">{has ? b.icon : "🔒"}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{b.title}</div>
            <div className="faint" style={{ fontSize: 11, lineHeight: 1.3 }}>
              {b.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
