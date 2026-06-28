import AppShell from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth";
import { getStats, getUserBadgeKeys } from "@/lib/gamification";
import { countCompletedAll } from "@/lib/progress";
import BadgeGrid from "@/components/game/BadgeGrid";
import { BADGES } from "@/data/badges";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const user = await requireUser("/achievements");
  const [stats, badgeKeys, completed] = await Promise.all([
    getStats(user.id),
    getUserBadgeKeys(user.id),
    countCompletedAll(user.id),
  ]);

  const tiles = [
    { label: "Current streak", value: `${stats.current_streak}d` },
    { label: "Longest streak", value: `${stats.longest_streak}d` },
    { label: "Lessons done", value: completed },
    { label: "Badges", value: `${badgeKeys.size}/${BADGES.length}` },
  ];

  return (
    <AppShell active="achievements" title="Achievements">
      <span className="eyebrow">Your progress</span>
      <h1 style={{ fontSize: 28, margin: "6px 0 18px" }}>Achievements</h1>

      <div
        className="grid stagger"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", marginBottom: 24 }}
      >
        {tiles.map((t) => (
          <div key={t.label} className="stat">
            <div className="stat-val">{t.value}</div>
            <div className="stat-label">{t.label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Badges</h2>
      <div className="glass card-pad">
        <BadgeGrid ownedKeys={[...badgeKeys]} />
      </div>
    </AppShell>
  );
}
