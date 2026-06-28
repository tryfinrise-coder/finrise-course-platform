import type { LeaderRow } from "@/lib/gamification";
import StreakFlame from "./StreakFlame";

// Ranked XP leaderboard. The current user's row is highlighted. Presentational.
export default function Leaderboard({ rows }: { rows: LeaderRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="faint" style={{ fontSize: 14, margin: 0 }}>
        No ranked learners yet — complete a lesson to claim the top spot.
      </p>
    );
  }
  return (
    <div>
      {rows.map((r) => (
        <div key={r.userId} className={`leader-row ${r.isMe ? "me" : ""}`}>
          <span className={`leader-rank ${r.rank <= 3 ? "r" + r.rank : ""}`}>{r.rank}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {r.name} {r.isMe && <span className="faint" style={{ fontWeight: 400 }}>(you)</span>}
            </div>
            <div className="faint" style={{ fontSize: 12 }}>
              Level {r.level}
            </div>
          </div>
          {r.streak > 0 && <StreakFlame streak={r.streak} size={15} />}
          <span style={{ fontWeight: 800, color: "var(--xp)", fontVariantNumeric: "tabular-nums" }}>
            {r.xp.toLocaleString()} XP
          </span>
        </div>
      ))}
    </div>
  );
}
