import { query } from "./db";

export interface VisitorStats {
  total: number;
  unique: number;
  today: number;
}

export interface ReferrerRow {
  source: string;
  count: number;
}

export interface CampaignRow {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  count: number;
}

export interface DailyRow {
  date: string;
  total: number;
  unique: number;
}

export interface RecentView {
  id: number;
  ip: string;
  page: string;
  referrer: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  created_at: string;
}

export function friendlySource(referrer: string | null): string {
  if (!referrer) return "Direct";
  try {
    const { hostname } = new URL(referrer);
    if (hostname.includes("facebook") || hostname.includes("fb.com")) return "Facebook";
    if (hostname.includes("instagram")) return "Instagram";
    if (hostname.includes("google")) return "Google";
    if (hostname.includes("youtube") || hostname.includes("youtu.be")) return "YouTube";
    if (hostname.includes("twitter") || hostname.includes("t.co") || hostname.includes("x.com")) return "Twitter / X";
    if (hostname.includes("whatsapp")) return "WhatsApp";
    if (hostname.includes("telegram")) return "Telegram";
    return hostname.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
}

export async function getVisitorStats(days = 7): Promise<VisitorStats> {
  const rows = await query<{ total: number; unique: number; today: number }>(
    `SELECT
       COUNT(*)                                                          AS total,
       COUNT(DISTINCT ip)                                                AS \`unique\`,
       SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END)   AS today
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
    [days]
  );
  const r = rows[0];
  return { total: Number(r?.total ?? 0), unique: Number(r?.unique ?? 0), today: Number(r?.today ?? 0) };
}

export async function getDailyVisits(days = 14): Promise<DailyRow[]> {
  return query<DailyRow>(
    `SELECT
       DATE(created_at)      AS date,
       COUNT(*)              AS total,
       COUNT(DISTINCT ip)    AS \`unique\`
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY DATE(created_at)
     ORDER BY date DESC`,
    [days]
  );
}

export async function getTopReferrers(days = 7): Promise<ReferrerRow[]> {
  const rows = await query<{ referrer: string | null; count: number }>(
    `SELECT referrer, COUNT(*) AS count
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY referrer
     ORDER BY count DESC
     LIMIT 15`,
    [days]
  );
  // Merge by friendly name
  const map = new Map<string, number>();
  for (const r of rows) {
    const key = friendlySource(r.referrer);
    map.set(key, (map.get(key) ?? 0) + Number(r.count));
  }
  return Array.from(map.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getTopCampaigns(days = 30): Promise<CampaignRow[]> {
  return query<CampaignRow>(
    `SELECT
       COALESCE(utm_source,   'organic') AS utm_source,
       COALESCE(utm_medium,   '-')       AS utm_medium,
       COALESCE(utm_campaign, '-')       AS utm_campaign,
       COUNT(*)                          AS count
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND utm_source IS NOT NULL
     GROUP BY utm_source, utm_medium, utm_campaign
     ORDER BY count DESC
     LIMIT 20`,
    [days]
  );
}

export async function getRecentViews(limit = 100): Promise<RecentView[]> {
  return query<RecentView>(
    `SELECT id, ip, page, referrer, utm_source, utm_campaign, created_at
     FROM page_views
     ORDER BY created_at DESC
     LIMIT ?`,
    [limit]
  );
}
