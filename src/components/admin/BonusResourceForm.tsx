"use client";

import { useRef, useState } from "react";
import { uploadResourceAction, updateResourceAction } from "@/app/actions/adminx";

export interface ResourceLike {
  id: number;
  title: string;
  summary: string | null;
  description_html: string | null;
  badge: string | null;
  sort_order: number;
  kind: string | null;
}

interface Props {
  productId: number;
  mode: "create" | "edit";
  resource?: ResourceLike;
}

// Ready-made starter descriptions for the promised bonuses. Picking one fills in
// the title / badge / description so you only need to attach the PDF.
const TEMPLATES: { key: string; label: string; title: string; badge: string; html: string }[] = [
  {
    key: "screeners",
    label: "5 Swing Screeners",
    title: "5 Swing-Trading Screeners",
    badge: "FREE BONUS",
    html: `<h3>What's inside</h3>
<p>Five ready-to-use stock screeners built for swing setups — import them once and scan the market in seconds.</p>
<ul>
  <li><strong>Momentum breakout</strong> — stocks pushing above recent range on volume.</li>
  <li><strong>Pullback to support</strong> — uptrends cooling off near a level.</li>
  <li><strong>Volume spike</strong> — unusual activity worth a closer look.</li>
  <li><strong>52-week high watch</strong> — relative-strength leaders.</li>
  <li><strong>Reversal candidates</strong> — oversold names showing a turn.</li>
</ul>
<h3>How to use</h3>
<p>Open the PDF, copy each screener's filters into your screener of choice, and review the shortlist with the candlestick skills from the course. <em>For research and learning only — not buy/sell calls.</em></p>`,
  },
  {
    key: "indicators",
    label: "4 TV Indicators",
    title: "4 TradingView Indicators",
    badge: "FREE BONUS",
    html: `<h3>What's inside</h3>
<p>Four TradingView tools to speed up your chart reading.</p>
<ul>
  <li><strong>Candlestick Pattern Scanner</strong> — auto-marks key patterns on the chart.</li>
  <li><strong>Support &amp; Resistance</strong> — plots the levels that matter.</li>
  <li><strong>Trend &amp; momentum overlay</strong> — context at a glance.</li>
  <li><strong>Volume profile helper</strong> — where activity is concentrated.</li>
</ul>
<h3>How to add them</h3>
<p>The PDF includes step-by-step instructions to add each indicator to your TradingView account. <em>Indicators are study aids, not signals.</em></p>`,
  },
  {
    key: "aiprompts",
    label: "AI Research Prompts",
    title: "AI Prompts to Research Stocks",
    badge: "FREE BONUS",
    html: `<h3>What's inside</h3>
<p>A pack of copy-paste AI prompts to <strong>research</strong> a stock faster — understand the business, recent news, and what to study next.</p>
<ul>
  <li>Summarise a company and its sector in plain English.</li>
  <li>List the key things to check before studying a chart.</li>
  <li>Turn an earnings report into simple bullet points.</li>
  <li>Build a personal learning checklist for a setup.</li>
</ul>
<p><em>These prompts are for research and education only. They do not give buy/sell advice or predict prices.</em></p>`,
  },
  { key: "blank", label: "Blank", title: "", badge: "", html: "" },
];

const TOOLBAR: { label: string; wrap: [string, string]; block?: boolean }[] = [
  { label: "H3", wrap: ["<h3>", "</h3>"], block: true },
  { label: "P", wrap: ["<p>", "</p>"], block: true },
  { label: "• List", wrap: ["<ul>\n  <li>", "</li>\n</ul>"], block: true },
  { label: "B", wrap: ["<strong>", "</strong>"] },
  { label: "i", wrap: ["<em>", "</em>"] },
  { label: "Link", wrap: ['<a href="https://">', "</a>"] },
];

export default function BonusResourceForm({ productId, mode, resource }: Props) {
  const [html, setHtml] = useState(resource?.description_html ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [title, setTitle] = useState(resource?.title ?? "");
  const [badge, setBadge] = useState(resource?.badge ?? "");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const action = mode === "create" ? uploadResourceAction : updateResourceAction;

  function applyTemplate(key: string) {
    const t = TEMPLATES.find((x) => x.key === key);
    if (!t) return;
    setHtml(t.html);
    if (t.title) setTitle(t.title);
    setBadge(t.badge);
    setTab("write");
  }

  function insert(wrap: [string, string], block?: boolean) {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = html.slice(start, end);
    const before = html.slice(0, start);
    const after = html.slice(end);
    const pre = block && before && !before.endsWith("\n") ? "\n" : "";
    const next = `${before}${pre}${wrap[0]}${sel}${wrap[1]}${after}`;
    setHtml(next);
    requestAnimationFrame(() => {
      ta.focus();
      const caret = before.length + pre.length + wrap[0].length + sel.length;
      ta.setSelectionRange(caret, caret);
    });
  }

  const inputCls =
    "h-9 w-full rounded-lg border border-input bg-card px-3 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      {mode === "create" ? (
        <input type="hidden" name="product_id" value={productId} />
      ) : (
        <input type="hidden" name="id" value={resource!.id} />
      )}

      <label className="text-xs text-muted-foreground">
        Title
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 5 Swing-Trading Screeners"
          required
          className={`mt-1 ${inputCls}`}
        />
      </label>
      <label className="text-xs text-muted-foreground">
        Short summary (optional)
        <input name="summary" defaultValue={resource?.summary ?? ""} placeholder="One line shown under the title" className={`mt-1 ${inputCls}`} />
      </label>
      <label className="text-xs text-muted-foreground">
        Badge (optional)
        <input
          name="badge"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="e.g. FREE BONUS / NEW"
          className={`mt-1 ${inputCls}`}
        />
      </label>
      <label className="text-xs text-muted-foreground">
        Display order (lower shows first)
        <input name="sort_order" type="number" defaultValue={resource?.sort_order ?? 0} className={`mt-1 ${inputCls}`} />
      </label>

      {/* Templates */}
      <div className="sm:col-span-2">
        <div className="mb-1.5 text-xs text-muted-foreground">Start from a template</div>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => applyTemplate(t.key)}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold text-foreground transition-colors hover:bg-accent"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description editor with toolbar + live preview */}
      <div className="sm:col-span-2">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">Description (HTML)</span>
          <div className="flex overflow-hidden rounded-lg border border-border text-[11px] font-semibold">
            <button type="button" onClick={() => setTab("write")} className={`px-3 py-1 ${tab === "write" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>
              Write
            </button>
            <button type="button" onClick={() => setTab("preview")} className={`px-3 py-1 ${tab === "preview" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>
              Preview
            </button>
          </div>
        </div>

        {tab === "write" ? (
          <>
            <div className="mb-1.5 flex flex-wrap gap-1">
              {TOOLBAR.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => insert(b.wrap, b.block)}
                  className="rounded-md border border-border bg-card px-2 py-1 text-[11px] font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  {b.label}
                </button>
              ))}
            </div>
            <textarea
              ref={taRef}
              name="description_html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={9}
              placeholder={"<h3>What's inside</h3>\n<p>Describe the PDF…</p>\n<ul><li>Point one</li></ul>"}
              className="block w-full rounded-lg border border-input bg-card px-3 py-2 font-mono text-[12px] leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </>
        ) : (
          <>
            {/* keep the value submittable while previewing */}
            <input type="hidden" name="description_html" value={html} />
            <div className="rounded-lg border border-border bg-white p-4">
              {html.trim() ? (
                <div className="resource-prose" dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <p className="text-xs text-muted-foreground">Nothing to preview yet — write some HTML.</p>
              )}
            </div>
          </>
        )}
      </div>

      <label className="text-xs text-muted-foreground">
        {mode === "create" ? "PDF file (PDF / DOCX / XLSX / TXT / ZIP)" : "Replace file (optional)"}
        <input
          type="file"
          name="file"
          required={mode === "create"}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.md,.zip"
          className="mt-1 block w-full text-xs file:mr-2 file:cursor-pointer file:rounded file:border-0 file:bg-secondary file:px-2 file:py-1 file:text-xs file:font-semibold"
        />
      </label>
      <label className="text-xs text-muted-foreground">
        {mode === "create" ? "Cover image (optional)" : "Replace cover image (optional)"}
        <input type="file" name="image" accept="image/*" className="mt-1 block w-full text-xs file:mr-2 file:cursor-pointer file:rounded file:border-0 file:bg-secondary file:px-2 file:py-1 file:text-xs file:font-semibold" />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {mode === "create" ? "Add bonus / resource" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
