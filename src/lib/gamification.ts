import "server-only";
import { query, queryOne, execute } from "./db";
import { countCompletedAll } from "./progress";
import { BADGES, BADGES_BY_KEY, type Badge } from "@/data/badges";

// ---------------------------------------------------------------------------
// Gamification: XP, levels, streaks, badges, leaderboard.
// ---------------------------------------------------------------------------

export const LESSON_XP = 50; // XP for completing a lesson (first time only)
export const GOAL_BONUS = 25; // bonus the moment the daily goal is hit

// XP required to *be at* a given level. Gentle quadratic curve:
//   L1=0, L2=100, L3=300, L4=600, L5=1000, L6=1500 ...
export function cumXpForLevel(level: number): number {
  return 50 * level * (level - 1);
}

export function levelForXp(xp: number): number {
  let level = 1;
  while (cumXpForLevel(level + 1) <= xp) level++;
  return level;
}

export interface LevelInfo {
  level: number;
  xpIntoLevel: number; // xp earned since the start of this level
  xpForLevel: number; // xp span of this level
  progress: number; // 0..1 toward next level
  xpToNext: number; // xp remaining to next level
}

export function levelInfo(xp: number): LevelInfo {
  const level = levelForXp(xp);
  const lo = cumXpForLevel(level);
  const hi = cumXpForLevel(level + 1);
  const span = hi - lo;
  const into = xp - lo;
  return {
    level,
    xpIntoLevel: into,
    xpForLevel: span,
    progress: span > 0 ? into / span : 0,
    xpToNext: Math.max(0, hi - xp),
  };
}

export interface UserStats {
  user_id: number;
  xp: number;
  current_streak: number;
  longest_streak: number;
  last_active: string | null;
  daily_goal: number;
  daily_count: number;
  daily_date: string | null;
}

export interface StatsView extends UserStats, LevelInfo {
  dailyGoalMet: boolean;
}

async function ensureStatsRow(userId: number): Promise<void> {
  await execute("INSERT IGNORE INTO user_stats (user_id) VALUES (?)", [userId]);
}

export async function getStats(userId: number): Promise<StatsView> {
  await ensureStatsRow(userId);
  const row = (await queryOne<UserStats & { is_today: number | null }>(
    `SELECT xp, current_streak, longest_streak, last_active, daily_goal,
            daily_count, daily_date, (daily_date = CURDATE()) AS is_today
     FROM user_stats WHERE user_id = ?`,
    [userId]
  ))!;
  const info = levelInfo(row.xp);
  const dailyCountToday = row.is_today ? row.daily_count : 0;
  return {
    user_id: userId,
    xp: row.xp,
    current_streak: row.current_streak,
    longest_streak: row.longest_streak,
    last_active: row.last_active,
    daily_goal: row.daily_goal,
    daily_count: dailyCountToday,
    daily_date: row.daily_date,
    dailyGoalMet: dailyCountToday >= row.daily_goal,
    ...info,
  };
}

export async function getUserBadgeKeys(userId: number): Promise<Set<string>> {
  const rows = await query<{ badge_key: string }>(
    "SELECT badge_key FROM user_badges WHERE user_id = ?",
    [userId]
  );
  return new Set(rows.map((r) => r.badge_key));
}

export interface RewardResult {
  awarded: boolean; // false when the lesson was already completed before
  xpGained: number;
  totalXp: number;
  level: number;
  prevLevel: number;
  leveledUp: boolean;
  progress: number; // 0..1 within the new level
  streak: number;
  dailyCount: number;
  dailyGoal: number;
  dailyGoalMet: boolean;
  goalJustMet: boolean;
  newBadges: Badge[];
}

// Which badges a context unlocks (pure predicate map).
function badgeUnlocked(
  key: string,
  ctx: { completed: number; streak: number; level: number; dailyGoalMet: boolean }
): boolean {
  switch (key) {
    case "first-steps":
      return ctx.completed >= 1;
    case "getting-warm":
      return ctx.completed >= 3;
    case "pattern-apprentice":
      return ctx.completed >= 5;
    case "pattern-master":
      return ctx.completed >= 8;
    case "pattern-grandmaster":
      return ctx.completed >= 20;
    case "goal-getter":
      return ctx.dailyGoalMet;
    case "streak-3":
      return ctx.streak >= 3;
    case "streak-7":
      return ctx.streak >= 7;
    case "level-5":
      return ctx.level >= 5;
    default:
      return false;
  }
}

// Award XP + update streak + unlock badges for a lesson completion. The caller
// must already have marked the lesson complete (so countCompletedAll includes
// it) and must only call this when the completion was new (firstTime).
export async function awardLessonCompletion(userId: number): Promise<RewardResult> {
  await ensureStatsRow(userId);

  const row = (await queryOne<
    UserStats & { days_since: number | null; is_today: number | null }
  >(
    `SELECT xp, current_streak, longest_streak, daily_goal, daily_count,
            DATEDIFF(CURDATE(), last_active) AS days_since,
            (daily_date = CURDATE()) AS is_today
     FROM user_stats WHERE user_id = ?`,
    [userId]
  ))!;

  // streak
  let streak: number;
  if (row.days_since === 0) streak = row.current_streak; // already counted today
  else if (row.days_since === 1) streak = row.current_streak + 1;
  else streak = 1; // gap, or first ever (days_since null)
  const longest = Math.max(row.longest_streak, streak);

  // daily goal
  const countToday = row.is_today ? row.daily_count : 0;
  const newDailyCount = countToday + 1;
  const goalJustMet =
    newDailyCount >= row.daily_goal && countToday < row.daily_goal;
  const dailyGoalMet = newDailyCount >= row.daily_goal;

  // xp + level
  const xpGained = LESSON_XP + (goalJustMet ? GOAL_BONUS : 0);
  const totalXp = row.xp + xpGained;
  const prevLevel = levelForXp(row.xp);
  const level = levelForXp(totalXp);

  await execute(
    `UPDATE user_stats
     SET xp = ?, current_streak = ?, longest_streak = ?, last_active = CURDATE(),
         daily_count = ?, daily_date = CURDATE()
     WHERE user_id = ?`,
    [totalXp, streak, longest, newDailyCount, userId]
  );
  await execute(
    "INSERT INTO xp_events (user_id, amount, reason) VALUES (?, ?, 'lesson')",
    [userId, xpGained]
  );

  // badges
  const completed = await countCompletedAll(userId);
  const owned = await getUserBadgeKeys(userId);
  const ctx = { completed, streak, level, dailyGoalMet };
  const newBadges: Badge[] = [];
  for (const b of BADGES) {
    if (!owned.has(b.key) && badgeUnlocked(b.key, ctx)) {
      const { affectedRows } = await execute(
        "INSERT IGNORE INTO user_badges (user_id, badge_key) VALUES (?, ?)",
        [userId, b.key]
      );
      if (affectedRows > 0) newBadges.push(BADGES_BY_KEY[b.key]);
    }
  }

  return {
    awarded: true,
    xpGained,
    totalXp,
    level,
    prevLevel,
    leveledUp: level > prevLevel,
    progress: levelInfo(totalXp).progress,
    streak,
    dailyCount: newDailyCount,
    dailyGoal: row.daily_goal,
    dailyGoalMet,
    goalJustMet,
    newBadges,
  };
}

export interface LeaderRow {
  userId: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
  rank: number;
  isMe: boolean;
}

export async function leaderboard(
  meId: number,
  limit = 10
): Promise<LeaderRow[]> {
  const rows = await query<{
    user_id: number;
    name: string | null;
    email: string;
    xp: number;
    current_streak: number;
  }>(
    `SELECT u.id AS user_id, u.name, u.email, s.xp, s.current_streak
     FROM user_stats s
     JOIN users u ON u.id = s.user_id
     ORDER BY s.xp DESC, s.current_streak DESC, u.id ASC
     LIMIT ?`,
    [limit]
  );
  return rows.map((r, i) => ({
    userId: r.user_id,
    name: r.name || r.email.split("@")[0],
    xp: r.xp,
    level: levelForXp(r.xp),
    streak: r.current_streak,
    rank: i + 1,
    isMe: r.user_id === meId,
  }));
}
