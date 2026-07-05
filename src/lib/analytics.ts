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

// Optional "scope to one course's pages" filter. A course landing page lives at
// /pages/<slug>, so we match page_views/page_events on that path prefix.
function pageScope(pagePrefix?: string | null): { clause: string; params: string[] } {
  if (!pagePrefix) return { clause: "", params: [] };
  return { clause: " AND page LIKE ?", params: [pagePrefix + "%"] };
}
// Optional "scope to one product" filter for the sales tables.
function productScope(productId?: number | null): { clause: string; params: number[] } {
  if (!productId) return { clause: "", params: [] };
  return { clause: " AND product_id = ?", params: [productId] };
}

export async function getVisitorStats(days = 7, pagePrefix?: string | null): Promise<VisitorStats> {
  const s = pageScope(pagePrefix);
  const rows = await query<{ total: number; unique: number; today: number }>(
    `SELECT
       COUNT(*)                                                          AS total,
       COUNT(DISTINCT ip)                                                AS \`unique\`,
       SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END)   AS today
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)${s.clause}`,
    [days, ...s.params]
  );
  const r = rows[0];
  return { total: Number(r?.total ?? 0), unique: Number(r?.unique ?? 0), today: Number(r?.today ?? 0) };
}

export async function getDailyVisits(days = 14, pagePrefix?: string | null): Promise<DailyRow[]> {
  const s = pageScope(pagePrefix);
  return query<DailyRow>(
    `SELECT
       DATE(created_at)      AS date,
       COUNT(*)              AS total,
       COUNT(DISTINCT ip)    AS \`unique\`
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)${s.clause}
     GROUP BY DATE(created_at)
     ORDER BY date DESC`,
    [days, ...s.params]
  );
}

export async function getTopReferrers(days = 7, pagePrefix?: string | null): Promise<ReferrerRow[]> {
  const s = pageScope(pagePrefix);
  const rows = await query<{ referrer: string | null; count: number }>(
    `SELECT referrer, COUNT(*) AS count
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)${s.clause}
     GROUP BY referrer
     ORDER BY count DESC
     LIMIT 15`,
    [days, ...s.params]
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

export async function getTopCampaigns(days = 30, pagePrefix?: string | null): Promise<CampaignRow[]> {
  const s = pageScope(pagePrefix);
  return query<CampaignRow>(
    `SELECT
       COALESCE(utm_source,   'organic') AS utm_source,
       COALESCE(utm_medium,   '-')       AS utm_medium,
       COALESCE(utm_campaign, '-')       AS utm_campaign,
       COUNT(*)                          AS count
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND utm_source IS NOT NULL${s.clause}
     GROUP BY utm_source, utm_medium, utm_campaign
     ORDER BY count DESC
     LIMIT 20`,
    [days, ...s.params]
  );
}

export interface ConversionFunnel {
  visitors: number;
  scroll25: number;
  scroll50: number;
  scroll75: number;
  ctaClicks: number;
}

export async function getConversionFunnel(days = 7, pagePrefix?: string | null): Promise<ConversionFunnel> {
  const s = pageScope(pagePrefix);
  const vRows = await query<{ n: number }>(
    `SELECT COUNT(DISTINCT session_id) AS n
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND session_id IS NOT NULL${s.clause}`,
    [days, ...s.params]
  );
  const eRows = await query<{ event: string; value: string; n: number }>(
    `SELECT event, value, COUNT(DISTINCT session_id) AS n
     FROM page_events
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)${s.clause}
     GROUP BY event, value`,
    [days, ...s.params]
  );
  const get = (ev: string, val: string) =>
    Number(eRows.find((r) => r.event === ev && r.value === val)?.n ?? 0);
  const ctaRow = eRows.filter((r) => r.event === "cta_click");
  const ctaTotal = ctaRow.reduce((s, r) => s + Number(r.n), 0);

  return {
    visitors: Number(vRows[0]?.n ?? 0),
    scroll25: get("scroll_depth", "25%"),
    scroll50: get("scroll_depth", "50%"),
    scroll75: get("scroll_depth", "75%"),
    ctaClicks: ctaTotal,
  };
}

export async function getAvgTimeOnPage(days = 7, pagePrefix?: string | null): Promise<number> {
  const s = pageScope(pagePrefix);
  const rows = await query<{ avg_secs: number }>(
    `SELECT AVG(CAST(REPLACE(value, 's', '') AS UNSIGNED)) AS avg_secs
     FROM page_events
     WHERE event = 'time_on_page'
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND CAST(REPLACE(value, 's', '') AS UNSIGNED) BETWEEN 3 AND 1800${s.clause}`,
    [days, ...s.params]
  );
  return Math.round(Number(rows[0]?.avg_secs ?? 0));
}

export function formatSeconds(secs: number): string {
  if (secs <= 0) return "—";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export async function getRecentViews(limit = 100, pagePrefix?: string | null): Promise<RecentView[]> {
  const s = pageScope(pagePrefix);
  return query<RecentView>(
    `SELECT id, ip, page, referrer, utm_source, utm_campaign, created_at
     FROM page_views
     ${pagePrefix ? "WHERE page LIKE ?" : ""}
     ORDER BY created_at DESC
     LIMIT ?`,
    pagePrefix ? [s.params[0], limit] : [limit]
  );
}

// ---------------------------------------------------------------------------
// Sales attribution — trace paid purchases back to the ad / source / campaign
// that produced them. Amounts are stored in paise; format with formatPrice.
// ---------------------------------------------------------------------------

/** Friendly source for a purchase: prefer the UTM tag, else derive from the referrer. */
export function purchaseSource(utmSource: string | null, referrer: string | null): string {
  if (utmSource) {
    const s = utmSource.toLowerCase();
    if (s.includes("facebook") || s === "fb") return "Facebook";
    if (s.includes("instagram") || s === "ig") return "Instagram";
    if (s.includes("google")) return "Google";
    if (s.includes("youtube")) return "YouTube";
    if (s.includes("whatsapp")) return "WhatsApp";
    if (s.includes("telegram")) return "Telegram";
    return utmSource.charAt(0).toUpperCase() + utmSource.slice(1);
  }
  return friendlySource(referrer);
}

export interface SalesStats {
  orders: number;
  revenue: number; // paise
  buyers: number; // distinct emails
}

export async function getSalesStats(days = 30, productId?: number | null): Promise<SalesStats> {
  const s = productScope(productId);
  const rows = await query<{ orders: number; revenue: number; buyers: number }>(
    `SELECT COUNT(*) AS orders, COALESCE(SUM(amount), 0) AS revenue, COUNT(DISTINCT email) AS buyers
     FROM course_purchases
     WHERE status = 'paid'
       AND COALESCE(paid_at, created_at) >= DATE_SUB(NOW(), INTERVAL ? DAY)${s.clause}`,
    [days, ...s.params]
  );
  const r = rows[0];
  return { orders: Number(r?.orders ?? 0), revenue: Number(r?.revenue ?? 0), buyers: Number(r?.buyers ?? 0) };
}

export interface SalesSourceRow {
  source: string;
  orders: number;
  revenue: number; // paise
}

/** Paid sales grouped by friendly source (UTM source first, else referrer). */
export async function getSalesBySource(days = 30, productId?: number | null): Promise<SalesSourceRow[]> {
  const sc = productScope(productId);
  const rows = await query<{ utm_source: string | null; referrer: string | null; amount: number }>(
    `SELECT utm_source, referrer, amount
     FROM course_purchases
     WHERE status = 'paid'
       AND COALESCE(paid_at, created_at) >= DATE_SUB(NOW(), INTERVAL ? DAY)${sc.clause}`,
    [days, ...sc.params]
  );
  const map = new Map<string, { orders: number; revenue: number }>();
  for (const r of rows) {
    const key = purchaseSource(r.utm_source, r.referrer);
    const cur = map.get(key) ?? { orders: 0, revenue: 0 };
    cur.orders += 1;
    cur.revenue += Number(r.amount);
    map.set(key, cur);
  }
  return Array.from(map.entries())
    .map(([source, v]) => ({ source, ...v }))
    .sort((a, b) => b.revenue - a.revenue);
}

export interface SalesCampaignRow {
  utm_source: string;
  utm_campaign: string;
  orders: number;
  revenue: number; // paise
}

/** Paid sales grouped by UTM campaign — the row that tells you which ad converts. */
export async function getSalesByCampaign(days = 90, productId?: number | null): Promise<SalesCampaignRow[]> {
  const sc = productScope(productId);
  return query<SalesCampaignRow>(
    `SELECT
       COALESCE(utm_source,   'organic') AS utm_source,
       COALESCE(utm_campaign, '(none)')  AS utm_campaign,
       COUNT(*)                          AS orders,
       COALESCE(SUM(amount), 0)          AS revenue
     FROM course_purchases
     WHERE status = 'paid'
       AND COALESCE(paid_at, created_at) >= DATE_SUB(NOW(), INTERVAL ? DAY)${sc.clause}
     GROUP BY utm_source, utm_campaign
     ORDER BY revenue DESC
     LIMIT 30`,
    [days, ...sc.params]
  );
}

export interface RecentSale {
  id: number;
  email: string;
  name: string | null;
  ip: string | null;
  amount: number; // paise
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  paid_at: string | null;
  created_at: string;
}

/** Most recent paid purchases with their full attribution, newest first. */
export async function getRecentSales(limit = 50, productId?: number | null): Promise<RecentSale[]> {
  const sc = productScope(productId);
  return query<RecentSale>(
    `SELECT id, email, name, ip, amount, utm_source, utm_medium, utm_campaign, referrer, paid_at, created_at
     FROM course_purchases
     WHERE status = 'paid'${sc.clause}
     ORDER BY COALESCE(paid_at, created_at) DESC
     LIMIT ?`,
    [...sc.params, limit]
  );
}

// ── Multi-course comparison + the filter list ─────────────────────
export interface CourseRow {
  slug: string;
  title: string;
  visits: number;
  unique: number;
  orders: number;
  revenue: number; // paise
  cvr: number; // orders ÷ unique visitors, as a %
}

/** Per-course rollup: visits, unique, sales, revenue and conversion — the multi-course view. */
export async function getCourseBreakdown(days = 30): Promise<CourseRow[]> {
  const products = await query<{ id: number; slug: string; title: string }>(
    "SELECT id, slug, title FROM products ORDER BY created_at ASC"
  );
  const views = await query<{ page: string; total: number; uniq: number }>(
    `SELECT page, COUNT(*) AS total, COUNT(DISTINCT ip) AS uniq
     FROM page_views
     WHERE page LIKE '/pages/%' AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY page`,
    [days]
  );
  const sales = await query<{ product_id: number; orders: number; revenue: number }>(
    `SELECT product_id, COUNT(*) AS orders, COALESCE(SUM(amount), 0) AS revenue
     FROM course_purchases
     WHERE status = 'paid' AND product_id IS NOT NULL
       AND COALESCE(paid_at, created_at) >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY product_id`,
    [days]
  );

  const viewsBySlug = new Map<string, { total: number; uniq: number }>();
  for (const v of views) {
    const m = v.page.match(/^\/pages\/([^/?#]+)/);
    if (!m) continue;
    const cur = viewsBySlug.get(m[1]) ?? { total: 0, uniq: 0 };
    cur.total += Number(v.total);
    cur.uniq += Number(v.uniq);
    viewsBySlug.set(m[1], cur);
  }
  const salesById = new Map<number, { orders: number; revenue: number }>();
  for (const s of sales) salesById.set(Number(s.product_id), { orders: Number(s.orders), revenue: Number(s.revenue) });

  return products
    .map((p) => {
      const v = viewsBySlug.get(p.slug) ?? { total: 0, uniq: 0 };
      const s = salesById.get(p.id) ?? { orders: 0, revenue: 0 };
      const cvr = v.uniq > 0 ? (s.orders / v.uniq) * 100 : 0;
      return { slug: p.slug, title: p.title, visits: v.total, unique: v.uniq, orders: s.orders, revenue: s.revenue, cvr };
    })
    .sort((a, b) => b.visits - a.visits || b.revenue - a.revenue);
}

/** The course list used to populate the analytics filter dropdown. */
export async function listAnalyticsCourses(): Promise<{ slug: string; title: string }[]> {
  return query<{ slug: string; title: string }>(
    "SELECT slug, title FROM products ORDER BY created_at ASC"
  );
}
