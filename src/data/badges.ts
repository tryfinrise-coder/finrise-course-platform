// Badge catalog. Plain, serializable data so it can be imported by both server
// and client components. The unlock *logic* lives in lib/gamification.ts; here
// we only describe each badge. `icon` is achievement art (emoji is fine here —
// these are decorative reward faces, not UI control icons).

export type BadgeTier = "bronze" | "silver" | "gold" | "streak" | "level";

export interface Badge {
  key: string;
  title: string;
  description: string;
  icon: string;
  tier: BadgeTier;
}

export const BADGES: Badge[] = [
  {
    key: "first-steps",
    title: "First Steps",
    description: "Complete your very first lesson.",
    icon: "🌱",
    tier: "bronze",
  },
  {
    key: "getting-warm",
    title: "Getting Warm",
    description: "Complete 3 lessons.",
    icon: "🔥",
    tier: "bronze",
  },
  {
    key: "pattern-apprentice",
    title: "Pattern Apprentice",
    description: "Complete 5 lessons.",
    icon: "📈",
    tier: "silver",
  },
  {
    key: "pattern-master",
    title: "Pattern Master",
    description: "Complete 8 pattern lessons.",
    icon: "👑",
    tier: "gold",
  },
  {
    key: "pattern-grandmaster",
    title: "Grandmaster",
    description: "Complete 20 pattern lessons.",
    icon: "🏆",
    tier: "gold",
  },
  {
    key: "goal-getter",
    title: "Goal Getter",
    description: "Hit your daily learning goal.",
    icon: "🎯",
    tier: "bronze",
  },
  {
    key: "streak-3",
    title: "On Fire",
    description: "Keep a 3-day learning streak.",
    icon: "🔥",
    tier: "streak",
  },
  {
    key: "streak-7",
    title: "Unstoppable",
    description: "Keep a 7-day learning streak.",
    icon: "⚡",
    tier: "streak",
  },
  {
    key: "level-5",
    title: "Rising Star",
    description: "Reach Level 5.",
    icon: "⭐",
    tier: "level",
  },
];

export const BADGES_BY_KEY: Record<string, Badge> = Object.fromEntries(
  BADGES.map((b) => [b.key, b])
);
