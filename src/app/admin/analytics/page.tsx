import {
  getVisitorStats,
  getDailyVisits,
  getTopReferrers,
  getTopCampaigns,
  getRecentViews,
  getConversionFunnel,
  getAvgTimeOnPage,
  getSalesStats,
  getSalesBySource,
  getSalesByCampaign,
  getRecentSales,
  getCourseBreakdown,
  listAnalyticsCourses,
  formatSeconds,
  friendlySource,
  purchaseSource,
} from "@/lib/analytics";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/types";
import { Card } from "@/components/ui/card";
import AnalyticsFilters from "@/components/admin/AnalyticsFilters";
import { Users, Eye, Clock, MousePointerClick, IndianRupee, ShoppingCart, Target, Layers, Percent } from "lucide-react";

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

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: { course?: string; days?: string };
}) {
  const days = [7, 14, 30, 90].includes(Number(searchParams.days)) ? Number(searchParams.days) : 7;
  const course = searchParams.course ?? "";
  const pagePrefix = course ? `/pages/${course}` : null;
  const selected = course ? await getProductBySlug(course) : undefined;
  const productId = selected?.id ?? null;

  const [
    stats, daily, referrers, campaigns, recent, funnel, avgSecs,
    salesStats, salesBySource, salesByCampaign, recentSales,
    courseRows, courses,
  ] = await Promise.all([
    getVisitorStats(days, pagePrefix),
    getDailyVisits(days, pagePrefix),
    getTopReferrers(days, pagePrefix),
    getTopCampaigns(days, pagePrefix),
    getRecentViews(100, pagePrefix),
    getConversionFunnel(days, pagePrefix),
    getAvgTimeOnPage(days, pagePrefix),
    getSalesStats(days, productId),
    getSalesBySource(days, productId),
    getSalesByCampaign(days, productId),
    getRecentSales(50, productId),
    getCourseBreakdown(days),
    listAnalyticsCourses(),
  ]);

  const rangeLabel = `${days} days`;
  const scopeLabel = selected ? selected.title : "All courses";
  const maxSalesRev = salesBySource[0]?.revenue ?? 1;
  const maxCampRev = salesByCampaign[0]?.revenue ?? 1;
  const maxCourseVisits = Math.max(1, ...courseRows.map((c) => c.visits));

  const ctaRate = funnel.visitors > 0
    ? ((funnel.ctaClicks / funnel.visitors) * 100).toFixed(1)
    : "0.0";
  const visitToBuyRate = stats.unique > 0
    ? ((salesStats.orders / stats.unique) * 100).toFixed(1)
    : "0.0";

  const kpis = [
    { label: `Visits (${rangeLabel})`, value: stats.total.toLocaleString(), icon: Eye, color: "text-sky-400", bg: "bg-sky-500/10", sub: `${stats.today} today` },
    { label: `Unique visitors`, value: stats.unique.toLocaleString(), icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10", sub: "distinct IPs" },
    { label: "Avg time on page", value: formatSeconds(avgSecs), icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", sub: "engaged sessions" },
    { label: "Paid orders", value: salesStats.orders.toLocaleString(), icon: ShoppingCart, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", sub: formatPrice(salesStats.revenue) },
    { label: "Visitor → buyer", value: `${visitToBuyRate}%`, icon: Percent, color: "text-violet-400", bg: "bg-violet-500/10", sub: "of unique visitors" },
    { label: "CTA click rate", value: `${ctaRate}%`, icon: MousePointerClick, color: "text-pink-400", bg: "bg-pink-500/10", sub: `${funnel.ctaClicks} clicks` },
  ];

  const maxRef = referrers[0]?.count ?? 1;
  const maxCamp = campaigns[0]?.count ?? 1;

  return (
    <div className="space-y-6">
      {/* Header + filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Analytics</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{scopeLabel}</span> · last {rangeLabel}
          </p>
        </div>
        <AnalyticsFilters courses={courses} course={course} days={days} />
      </div>

      {/* ============ MULTI-COURSE COMPARISON ============ */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <Layers className="h-4 w-4 text-sky-400" />
          <h3 className="text-sm font-bold">Course-by-course performance</h3>
          <span className="ml-auto text-xs text-muted-foreground">last {rangeLabel}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2.5 font-semibold">Course</th>
                <th className="px-4 py-2.5 text-right font-semibold">Visits</th>
                <th className="px-4 py-2.5 text-right font-semibold">Unique</th>
                <th className="px-4 py-2.5 text-right font-semibold">Sales</th>
                <th className="px-4 py-2.5 text-right font-semibold">Revenue</th>
                <th className="px-4 py-2.5 text-right font-semibold">Conv.</th>
                <th className="px-4 py-2.5 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {courseRows.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-6 text-center text-sm text-muted-foreground">No course data yet.</td></tr>
              )}
              {courseRows.map((c) => (
                <tr key={c.slug} className={`border-b border-border last:border-0 hover:bg-secondary/30 ${course === c.slug ? "bg-primary/5" : ""}`}>
                  <td className="px-5 py-3">
                    <a href={`/admin/analytics?course=${c.slug}&days=${days}`} className="font-semibold hover:underline">
                      {c.title}
                    </a>
                    <div className="text-[11px] text-muted-foreground">/pages/{c.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{c.visits.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{c.unique.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{c.orders.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatPrice(c.revenue)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    <span className={c.cvr >= 3 ? "text-emerald-400" : c.cvr > 0 ? "text-amber-400" : "text-muted-foreground"}>
                      {c.cvr.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ minWidth: 90 }}>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-sky-500" style={{ width: `${Math.round((c.visits / maxCourseVisits) * 100)}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-border px-5 py-2.5 text-[11px] text-muted-foreground">
          Conv. = paid orders ÷ unique visitors. Click a course to filter the whole dashboard below to it.
        </p>
      </Card>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map(({ label, value, icon: Icon, color, bg, sub }) => (
          <Card key={label} className="p-4">
            <span className={`grid h-8 w-8 place-items-center rounded-lg ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </span>
            <div className="mt-2.5 text-xl font-extrabold leading-tight">{value}</div>
            <div className="mt-0.5 text-xs font-medium text-muted-foreground">{label}</div>
            {sub && <div className="text-[11px] text-muted-foreground/70">{sub}</div>}
          </Card>
        ))}
      </div>

      {/* ============ SALES ATTRIBUTION ============ */}
      <div className="flex items-center gap-2 pt-2">
        <IndianRupee className="h-5 w-5 text-emerald-400" />
        <h2 className="font-display text-lg font-extrabold tracking-tight">Sales &amp; ad attribution</h2>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
          who actually paid
        </span>
      </div>

      {/* Sales KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: `Revenue (${rangeLabel})`, value: formatPrice(salesStats.revenue), icon: IndianRupee, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: `Paid orders (${rangeLabel})`, value: salesStats.orders.toLocaleString(), icon: ShoppingCart, color: "text-sky-400", bg: "bg-sky-500/10" },
          { label: `Unique buyers (${rangeLabel})`, value: salesStats.buyers.toLocaleString(), icon: Target, color: "text-violet-400", bg: "bg-violet-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
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

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue by source */}
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-3.5">
            <h3 className="text-sm font-bold">Revenue by source ({rangeLabel})</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Where your paying customers came from.</p>
          </div>
          <div className="divide-y divide-border">
            {salesBySource.length === 0 && (
              <p className="px-5 py-6 text-center text-sm text-muted-foreground">
                No paid sales yet. Attribution appears here after your first tracked purchase.
              </p>
            )}
            {salesBySource.map((s) => (
              <div key={s.source} className="flex items-center gap-3 px-5 py-3">
                <span className={`w-20 shrink-0 rounded-full px-2 py-0.5 text-center text-[11px] font-bold ${sourceColor(s.source)}`}>
                  {s.source}
                </span>
                <div className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.round((s.revenue / maxSalesRev) * 100)}%` }} />
                  </div>
                </div>
                <div className="w-28 text-right">
                  <div className="text-xs font-bold">{formatPrice(s.revenue)}</div>
                  <div className="text-[11px] text-muted-foreground">{s.orders} order{s.orders === 1 ? "" : "s"}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue by campaign */}
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-3.5">
            <h3 className="text-sm font-bold">Revenue by campaign ({rangeLabel})</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Which specific ad / UTM campaign converts to money.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-2.5 font-semibold">Campaign</th>
                  <th className="px-3 py-2.5 font-semibold">Source</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Orders</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {salesByCampaign.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-6 text-center text-sm text-muted-foreground">
                      No campaign sales yet. Tag your ad links with <code>?utm_source=facebook&amp;utm_campaign=ad_name</code>.
                    </td>
                  </tr>
                )}
                {salesByCampaign.map((c, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3 font-medium">{c.utm_campaign}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${sourceColor(purchaseSource(c.utm_source === "organic" ? null : c.utm_source, null))}`}>
                        {c.utm_source}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-bold">{Number(c.orders).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-14 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.round((Number(c.revenue) / maxCampRev) * 100)}%` }} />
                        </div>
                        <span className="font-bold">{formatPrice(Number(c.revenue))}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Recent paid customers with IP + attribution */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-5 py-3.5">
          <h3 className="text-sm font-bold">Recent paid customers</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Every completed payment with the IP and the ad / source it came from.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2.5 font-semibold">Buyer</th>
                <th className="px-4 py-2.5 font-semibold">IP address</th>
                <th className="px-4 py-2.5 font-semibold">Source</th>
                <th className="px-4 py-2.5 font-semibold">Campaign</th>
                <th className="px-4 py-2.5 text-right font-semibold">Amount</th>
                <th className="px-4 py-2.5 font-semibold">When</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-6 text-center text-sm text-muted-foreground">
                    No paid customers yet — completed payments will appear here with full attribution.
                  </td>
                </tr>
              )}
              {recentSales.map((s) => {
                const src = purchaseSource(s.utm_source, s.referrer);
                return (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3">
                      <div className="font-semibold">{s.name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{s.email}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{s.ip ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${sourceColor(src)}`}>{src}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{s.utm_campaign ?? "—"}</td>
                    <td className="px-4 py-3 text-right font-bold tabular-nums">{formatPrice(s.amount)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{timeAgo(s.paid_at ?? s.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ============ TRAFFIC ANALYTICS ============ */}
      <div className="flex items-center gap-2 pt-2">
        <Eye className="h-5 w-5 text-sky-400" />
        <h2 className="font-display text-lg font-extrabold tracking-tight">Traffic &amp; engagement</h2>
      </div>

      {/* Conversion funnel */}
      <Card className="p-5">
        <h3 className="mb-4 text-sm font-bold">Conversion funnel — last {rangeLabel}</h3>
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
            <h3 className="text-sm font-bold">Daily visits — last {rangeLabel}</h3>
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
            <h3 className="text-sm font-bold">Top sources ({rangeLabel})</h3>
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
          <h3 className="text-sm font-bold">Ad campaigns — UTM tracking ({rangeLabel})</h3>
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
