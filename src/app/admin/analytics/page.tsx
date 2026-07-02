import {
  getVisitorStats,
  getDailyVisits,
  getTopReferrers,
  getTopCampaigns,
  getRecentViews,
  getConversionFunnel,
  getAvgTimeOnPage,
  formatSeconds,
  friendlySource,
} from "@/lib/analytics";
import { Card } from "@/components/ui/card";
import { Users, Eye, TrendingUp, Megaphone, Clock, MousePointerClick } from "lucide-react";

export const dynamic = "force-dynamic";

function timeAgo(dt: string): string {
  const diff = Math.floor((Date.now() - new Date(dt).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function sourceColor(source: string): string {
  if (source === "Facebook") return "bg-blue-500/10 text-blue-400";
  if (source === "Instagram") return "bg-pink-500/10 text-pink-400";
  if (source === "Google") return "bg-yellow-500/10 text-yellow-600";
  if (source === "WhatsApp") return "bg-emerald-500/10 text-emerald-400";
  if (source === "Direct") return "bg-slate-500/10 text-slate-400";
  return "bg-violet-500/10 text-violet-400";
}

export default async function AnalyticsPage() {
  const [stats, daily, referrers, campaigns, recent, funnel, avgSecs] = await Promise.all([
    getVisitorStats(7),
    getDailyVisits(14),
    getTopReferrers(7),
    getTopCampaigns(30),
    getRecentViews(100),
    getConversionFunnel(7),
    getAvgTimeOnPage(7),
  ]);

  const ctaRate = funnel.visitors > 0
    ? ((funnel.ctaClicks / funnel.visitors) * 100).toFixed(1)
    : "0.0";

  const kpis = [
    { label: "Visits (7 days)", value: stats.total.toLocaleString(), icon: Eye, color: "text-sky-400", bg: "bg-sky-500/10" },
    { label: "Unique visitors (7d)", value: stats.unique.toLocaleString(), icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Avg time on page", value: formatSeconds(avgSecs), icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "CTA clicks (7d)", value: `${funnel.ctaClicks} (${ctaRate}%)`, icon: MousePointerClick, color: "text-pink-400", bg: "bg-pink-500/10" },
  ];

  const maxRef = referrers[0]?.count ?? 1;
  const maxCamp = campaigns[0]?.count ?? 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">Analytics</h2>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          Live · your visitors
        </span>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="flex items-start gap-3 p-4">
            <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </span>
            <div>
              <div className="text-2xl font-extrabold leading-tight">{value}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Conversion funnel */}
      <Card className="p-5">
        <h3 className="mb-4 text-sm font-bold">Conversion funnel — last 7 days</h3>
        {funnel.visitors === 0 ? (
          <p className="text-sm text-muted-foreground">No session data yet. Funnel populates once visitors land on your pages.</p>
        ) : (
          <div className="space-y-3">
            {[
              { label: "Visited the page", count: funnel.visitors, color: "bg-sky-500" },
              { label: "Scrolled 25%", count: funnel.scroll25, color: "bg-blue-500" },
              { label: "Scrolled 50%  (saw pricing)", count: funnel.scroll50, color: "bg-violet-500" },
              { label: "Scrolled 75%  (saw testimonials)", count: funnel.scroll75, color: "bg-amber-500" },
              { label: "Clicked Sign Up", count: funnel.ctaClicks, color: "bg-emerald-500" },
            ].map(({ label, count, color }) => {
              const pct = funnel.visitors > 0 ? Math.round((count / funnel.visitors) * 100) : 0;
              return (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-52 shrink-0 text-xs text-muted-foreground">{label}</div>
                  <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="w-20 text-right text-xs font-bold">
                    {count.toLocaleString()} <span className="font-normal text-muted-foreground">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Daily + referrers */}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Daily visits table */}
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-3.5">
            <h3 className="text-sm font-bold">Daily visits — last 14 days</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2.5 font-semibold">Date</th>
                  <th className="px-4 py-2.5 font-semibold">Total visits</th>
                  <th className="px-4 py-2.5 font-semibold">Unique IPs</th>
                </tr>
              </thead>
              <tbody>
                {daily.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-6 text-center text-muted-foreground text-sm">
                      No data yet — visits will appear here once people land on your pages.
                    </td>
                  </tr>
                )}
                {daily.map((d) => (
                  <tr key={d.date} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3 font-medium">{d.date}</td>
                    <td className="px-4 py-3">{Number(d.total).toLocaleString()}</td>
                    <td className="px-4 py-3">{Number(d.unique).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top sources */}
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-3.5">
            <h3 className="text-sm font-bold">Top sources (7 days)</h3>
          </div>
          <div className="divide-y divide-border">
            {referrers.length === 0 && (
              <p className="px-5 py-6 text-center text-sm text-muted-foreground">No data yet.</p>
            )}
            {referrers.map((r) => (
              <div key={r.source} className="flex items-center gap-3 px-5 py-3">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${sourceColor(r.source)}`}>
                  {r.source}
                </span>
                <div className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.round((r.count / maxRef) * 100)}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-xs font-bold">{r.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Facebook / UTM campaigns */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-5 py-3.5">
          <h3 className="text-sm font-bold">Ad campaigns — UTM tracking (30 days)</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Add <code className="rounded bg-secondary px-1 py-0.5">?utm_source=facebook&amp;utm_campaign=your_ad</code> to your Facebook ad URLs to see them here.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2.5 font-semibold">Campaign</th>
                <th className="px-4 py-2.5 font-semibold">Source</th>
                <th className="px-4 py-2.5 font-semibold">Medium</th>
                <th className="px-4 py-2.5 font-semibold">Visits</th>
                <th className="px-4 py-2.5 font-semibold">Share</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center text-sm text-muted-foreground">
                    No UTM data yet. Add <code>?utm_source=facebook&utm_campaign=ad_name</code> to your Facebook ad links.
                  </td>
                </tr>
              )}
              {campaigns.map((c, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3 font-medium">{c.utm_campaign}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${sourceColor(c.utm_source.charAt(0).toUpperCase() + c.utm_source.slice(1))}`}>
                      {c.utm_source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.utm_medium}</td>
                  <td className="px-4 py-3 font-bold">{Number(c.count).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-pink-500"
                          style={{ width: `${Math.round((c.count / maxCamp) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((c.count / maxCamp) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent visitors */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-5 py-3.5">
          <h3 className="text-sm font-bold">Recent visitors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2.5 font-semibold">IP address</th>
                <th className="px-4 py-2.5 font-semibold">Page</th>
                <th className="px-4 py-2.5 font-semibold">Source</th>
                <th className="px-4 py-2.5 font-semibold">Campaign</th>
                <th className="px-4 py-2.5 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center text-sm text-muted-foreground">
                    No visitors yet — come back after sharing your landing page.
                  </td>
                </tr>
              )}
              {recent.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3 font-mono text-xs">{v.ip}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.page}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${sourceColor(friendlySource(v.referrer))}`}>
                      {friendlySource(v.referrer)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{v.utm_campaign ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{timeAgo(v.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
