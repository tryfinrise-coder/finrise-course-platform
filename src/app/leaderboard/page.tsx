import AppShell from "@/components/shell/AppShell";
import { requireUser } from "@/lib/auth";
import { leaderboard } from "@/lib/gamification";
import Leaderboard from "@/components/game/Leaderboard";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const user = await requireUser("/leaderboard");
  const rows = await leaderboard(user.id, 50);

  return (
    <AppShell active="leaderboard" title="Leaderboard">
      <span className="eyebrow">Compete</span>
      <h1 style={{ fontSize: 28, margin: "6px 0 4px" }}>Leaderboard</h1>
      <p style={{ marginTop: 0, marginBottom: 18 }}>
        Ranked by total XP. Complete lessons and keep your streak to climb.
      </p>
      <div className="glass" style={{ padding: 16, maxWidth: 720 }}>
        <Leaderboard rows={rows} />
      </div>
    </AppShell>
  );
}
