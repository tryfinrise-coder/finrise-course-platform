import { NextResponse } from "next/server";
import type { OHLC } from "@/lib/classify";
import { PATTERNS } from "@/data/patterns";
import { PATTERN_FAMILIES, PATTERN_GUIDE, FOUNDATIONS } from "@/data/courseContent";
import { PLAYBOOK } from "@/courses/candlestick-mastery/playbook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INK = "#0E1B2E";
const EMER = "#18A87A";
const GREEN = "#16a34a";
const RED = "#dc2626";
const HAIR = "#e6e7e3";
const MUTED = "#51606e";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function candleSvg(candles: OHLC[], start: number, len: number): string {
  const cs = candles.slice(start, start + len);
  const H = 96;
  const pad = 9;
  const slot = 30;
  const W = slot * cs.length + 18;
  const vals: number[] = [];
  cs.forEach((k) => vals.push(k.h, k.l));
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  const sp = max - min || 1;
  min -= sp * 0.12;
  max += sp * 0.12;
  const y = (v: number) => pad + ((H - 2 * pad) * (max - v)) / (max - min);
  const bw = Math.min(slot * 0.6, 17);
  let g = "";
  cs.forEach((k, i) => {
    const x = 9 + slot * (i + 0.5);
    const up = k.c >= k.o;
    const col = up ? GREEN : RED;
    const yt = y(Math.max(k.o, k.c));
    const yb = y(Math.min(k.o, k.c));
    g += `<line x1="${x}" y1="${y(k.h)}" x2="${x}" y2="${y(k.l)}" stroke="${col}" stroke-width="2"/>`;
    g += `<rect x="${x - bw / 2}" y="${yt}" width="${bw}" height="${Math.max(2.5, yb - yt).toFixed(1)}" rx="2" fill="${col}"/>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block">${g}</svg>`;
}

function biasColor(bias: string): string {
  return bias === "bullish" ? GREEN : bias === "bearish" ? RED : "#64748b";
}
function biasChip(bias: string): string {
  const c = biasColor(bias);
  return `<span style="display:inline-block;border-radius:999px;background:${c}1f;color:${c};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:3px 11px;vertical-align:middle">${esc(bias)}</span>`;
}

export async function GET() {
  const now = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  // assign a continuous number to each pattern in family order
  const num: Record<string, number> = {};
  let counter = 0;
  PATTERN_FAMILIES.forEach((fam) => fam.keys.forEach((k) => { if (PATTERNS[k]) num[k] = ++counter; }));
  const totalPatterns = counter;

  let html = `<!doctype html><html><head><meta charset="utf-8"><title>Finrise Candlestick Handbook</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
    @page { size: A4; margin: 16mm 15mm; }
    * { box-sizing: border-box; }
    body { font-family: 'Poppins', 'Segoe UI', Arial, sans-serif; color: ${INK}; margin: 0; font-size: 14px; line-height: 1.6; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    h1,h2,h3 { margin: 0; font-weight: 700; }

    /* cover */
    .cover { height: 252mm; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
    .cover .mark { width: 78px; height: 78px; margin: 0 auto 26px; border-radius: 20px; background: ${INK}; display:flex; align-items:center; justify-content:center; }
    .cover h1 { font-size: 50px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
    .cover .accent { color: ${EMER}; }
    .cover .sub { color: ${MUTED}; font-size: 17px; margin-top: 18px; font-weight: 500; }
    .cover .meta { margin-top: 34px; font-size: 13px; color: #8a97a6; letter-spacing: .04em; text-transform: uppercase; }

    /* contents */
    .contents { page-break-after: always; }
    .contents h2 { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; border-bottom: 3px solid ${EMER}; padding-bottom: 10px; margin-bottom: 20px; }
    .toc-group { margin-bottom: 18px; }
    .toc-fam { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: ${EMER}; margin: 14px 0 6px; }
    .toc-row { display: flex; align-items: center; gap: 10px; padding: 4px 0; border-bottom: 1px dotted ${HAIR}; font-size: 14.5px; }
    .toc-num { width: 26px; flex-shrink: 0; font-weight: 700; color: ${MUTED}; text-align: right; }
    .toc-dot { width: 9px; height: 9px; border-radius: 999px; flex-shrink: 0; }
    .toc-name { font-weight: 600; }
    .toc-bias { margin-left: auto; font-size: 11.5px; font-weight: 700; text-transform: uppercase; }

    /* intro */
    .intro { page-break-after: always; }
    .intro h2 { font-size: 26px; font-weight: 800; border-bottom: 3px solid ${EMER}; padding-bottom: 8px; margin-bottom: 16px; }
    .intro .f { margin-bottom: 13px; font-size: 14.5px; }
    .intro .f b { color: ${INK}; }

    /* family + pattern */
    .section-title { page-break-before: always; border-bottom: 3px solid ${EMER}; padding-bottom: 8px; margin: 0 0 18px; }
    .section-title h2 { font-size: 27px; font-weight: 800; letter-spacing: -0.02em; }
    .section-title p { color: ${MUTED}; margin: 6px 0 0; font-size: 14px; font-weight: 500; }
    .pattern { page-break-inside: avoid; border: 1px solid ${HAIR}; border-radius: 14px; padding: 16px 18px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(14,27,46,0.05); }
    .pattern .top { display: flex; gap: 18px; align-items: flex-start; }
    .pattern .diagram { flex-shrink: 0; border: 1px solid ${HAIR}; border-radius: 10px; padding: 8px; background: #fafbfa; }
    .pattern .num { display:inline-flex; align-items:center; justify-content:center; width: 30px; height: 30px; border-radius: 8px; background: ${INK}; color:#fff; font-weight: 800; font-size: 14px; margin-right: 10px; vertical-align: middle; }
    .pattern h3 { font-size: 19px; font-weight: 700; display: inline; }
    .pattern .tag { color: ${MUTED}; font-size: 14px; margin-top: 6px; font-style: italic; }
    .row { margin-top: 11px; font-size: 14.5px; }
    .row b { color: ${INK}; }
    .lbl { color: ${EMER}; font-weight: 800; font-size: 11.5px; text-transform: uppercase; letter-spacing: .06em; display:block; margin-bottom: 2px; }
    ul { margin: 5px 0 0; padding-left: 20px; }
    li { margin: 4px 0; font-size: 14px; }
    .foot { margin-top: 28px; border-top: 1px solid ${HAIR}; padding-top: 10px; color: #8a97a6; font-size: 11.5px; }
  </style></head><body>`;

  // ---- cover ----
  html += `<div class="cover">
    <div class="mark"><svg viewBox="30 7 66 75" width="46" height="52"><rect x="36" y="26" width="9" height="50" rx="4.5" fill="#fff"/><line x1="40.5" y1="34" x2="74" y2="25" stroke="#fff" stroke-width="9" stroke-linecap="round"/><line x1="40.5" y1="49" x2="64" y2="42" stroke="#fff" stroke-width="9" stroke-linecap="round"/><polygon points="82,13 74,26 90,26" fill="${EMER}"/></svg></div>
    <h1>The Finrise<br><span class="accent">Candlestick Handbook</span></h1>
    <div class="sub">${totalPatterns} candlestick patterns — shape, meaning &amp; how to trade each one.</div>
    <div class="meta">Finrise Trading Academy &nbsp;·&nbsp; ${esc(now)}</div>
  </div>`;

  // ---- contents / index ----
  html += `<div class="contents"><h2>Contents</h2>`;
  html += `<div class="toc-group"><div class="toc-fam">Start here · The groundwork</div>`;
  FOUNDATIONS.forEach((f) => {
    html += `<div class="toc-row"><span class="toc-num">·</span><span class="toc-name">${esc(f.title)}</span></div>`;
  });
  html += `</div>`;
  PATTERN_FAMILIES.forEach((fam) => {
    html += `<div class="toc-group"><div class="toc-fam">${esc(fam.title)}</div>`;
    fam.keys.forEach((key) => {
      const p = PATTERNS[key];
      if (!p) return;
      const c = biasColor(p.bias);
      html += `<div class="toc-row"><span class="toc-num">${num[key]}</span><span class="toc-dot" style="background:${c}"></span><span class="toc-name">${esc(p.name)}</span><span class="toc-bias" style="color:${c}">${esc(p.bias)}</span></div>`;
    });
    html += `</div>`;
  });
  html += `</div>`;

  // ---- intro / groundwork ----
  html += `<div class="intro"><h2>Before the patterns: the groundwork</h2>`;
  FOUNDATIONS.forEach((f) => {
    html += `<div class="f"><b>${esc(f.title)}.</b> ${esc(f.tagline)}</div>`;
  });
  html += `<div class="f"><b>How to use this handbook.</b> Every pattern works best <i>with</i> the trend and <i>at</i> a support or resistance level. Read the trend, wait for the pattern at a level, confirm with the next candle, and define your stop before you enter.</div></div>`;

  // ---- families + patterns ----
  PATTERN_FAMILIES.forEach((fam) => {
    html += `<div class="section-title"><h2>${esc(fam.title)}</h2><p>${esc(fam.blurb)}</p></div>`;
    fam.keys.forEach((key) => {
      const p = PATTERNS[key];
      if (!p) return;
      const guide = PATTERN_GUIDE[key];
      const tips = (PLAYBOOK[key] ?? []).slice(0, 3);
      html += `<div class="pattern">
        <div class="top">
          <div class="diagram">${candleSvg(p.candles, p.patternStart, p.patternLength)}</div>
          <div>
            <div><span class="num">${num[key]}</span><h3>${esc(p.name)}</h3> &nbsp;${biasChip(p.bias)}</div>
            <div class="tag">${esc(p.tagline)}</div>
            <div class="row"><span class="lbl">What it means</span>${esc(p.keyIdea)}</div>
          </div>
        </div>`;
      if (guide) {
        html += `<div class="row"><span class="lbl">How to trade it</span>${esc(guide.howToTrade)} <b>Stop:</b> ${esc(guide.stop)}</div>`;
        html += `<div class="row"><span class="lbl">Reliability &amp; timeframe</span>${esc(guide.reliability)} <b>·</b> ${esc(guide.bestTf)}</div>`;
      }
      if (tips.length) {
        html += `<div class="row"><span class="lbl">Pro tips</span><ul>`;
        tips.forEach((t) => { html += `<li><b>${esc(t.title)}:</b> ${esc(t.body)}</li>`; });
        html += `</ul></div>`;
      }
      html += `</div>`;
    });
  });

  html += `<div class="foot">Educational material only — not investment advice. Candlestick patterns express probability, not certainty. Trading carries the risk of capital loss. Consult a SEBI-registered adviser before investing. © Finrise.</div>`;
  html += `</body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
