import { NextResponse } from "next/server";

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

// ─── Inline SVG helpers ────────────────────────────────────────────────────

/** Three trend mini-charts side by side */
function trendChartsSvg(): string {
  const W = 140;
  const H = 72;
  const pad = 10;

  // Uptrend: higher highs + higher lows zig-zag
  const upPts: [number, number][] = [
    [pad, H - pad - 10],
    [W * 0.25, H - pad - 28],
    [W * 0.42, H - pad - 18],
    [W * 0.62, H - pad - 42],
    [W * 0.78, H - pad - 30],
    [W - pad, H - pad - 55],
  ];
  const upD = upPts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  // Sideways: oscillating in a range
  const sW = W;
  const sH = H;
  const sTop = sH * 0.28;
  const sBot = sH * 0.72;
  const sidePts: [number, number][] = [
    [pad, (sTop + sBot) / 2],
    [sW * 0.15, sTop + 4],
    [sW * 0.3, sBot - 4],
    [sW * 0.48, sTop + 6],
    [sW * 0.63, sBot - 6],
    [sW * 0.8, sTop + 5],
    [sW - pad, (sTop + sBot) / 2 + 3],
  ];
  const sideD = sidePts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  // Downtrend: lower highs + lower lows zig-zag
  const downPts: [number, number][] = [
    [pad, pad + 10],
    [W * 0.22, pad + 28],
    [W * 0.38, pad + 16],
    [W * 0.58, pad + 44],
    [W * 0.74, pad + 30],
    [W - pad, pad + 56],
  ];
  const downD = downPts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  const card = (label: string, content: string, color: string) =>
    `<div style="text-align:center">
      <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;margin:0 auto">${content}</svg>
      <div style="font-size:12px;font-weight:700;color:${color};margin-top:4px;letter-spacing:.03em">${label}</div>
    </div>`;

  const upChart = card(
    "Uptrend",
    `<polyline points="${upPts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${GREEN}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`,
    GREEN
  );
  const sideChart = card(
    "Sideways / Range",
    `<line x1="${pad}" y1="${sTop}" x2="${sW - pad}" y2="${sTop}" stroke="${MUTED}" stroke-width="1.2" stroke-dasharray="4,3"/>
     <line x1="${pad}" y1="${sBot}" x2="${sW - pad}" y2="${sBot}" stroke="${MUTED}" stroke-width="1.2" stroke-dasharray="4,3"/>
     <polyline points="${sidePts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`,
    MUTED
  );
  const downChart = card(
    "Downtrend",
    `<polyline points="${downPts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`,
    RED
  );

  return `<div style="display:flex;gap:24px;justify-content:center;align-items:flex-start;flex-wrap:wrap">${upChart}${sideChart}${downChart}</div>`;
}

/** FII big candle with small preceding candles */
function fiiCandleSvg(): string {
  const W = 200;
  const H = 90;
  const slot = 28;
  const pad = 10;

  // small candles then one big green candle
  type Candle = { o: number; c: number; h: number; l: number; col: string };
  const candles: Candle[] = [
    { o: 55, c: 52, h: 58, l: 50, col: RED },
    { o: 52, c: 54, h: 56, l: 51, col: GREEN },
    { o: 54, c: 51, h: 56, l: 49, col: RED },
    { o: 51, c: 78, h: 82, l: 49, col: GREEN }, // big FII candle
  ];
  const all: number[] = candles.flatMap((c) => [c.h, c.l]);
  let mn = Math.min(...all);
  let mx = Math.max(...all);
  const sp = mx - mn || 1;
  mn -= sp * 0.1;
  mx += sp * 0.1;
  const y = (v: number) => pad + ((H - 2 * pad) * (mx - v)) / (mx - mn);
  const bw = 14;

  let g = "";
  candles.forEach((k, i) => {
    const x = pad + slot * i + slot / 2;
    const yt = y(Math.max(k.o, k.c));
    const yb = y(Math.min(k.o, k.c));
    g += `<line x1="${x}" y1="${y(k.h)}" x2="${x}" y2="${y(k.l)}" stroke="${k.col}" stroke-width="2"/>`;
    g += `<rect x="${x - bw / 2}" y="${yt.toFixed(1)}" width="${bw}" height="${Math.max(2.5, yb - yt).toFixed(1)}" rx="2" fill="${k.col}"/>`;
  });
  // "High Volume" tag on the big candle
  const bigX = pad + slot * 3 + slot / 2;
  g += `<text x="${bigX}" y="${H - 2}" text-anchor="middle" font-size="8" fill="${EMER}" font-weight="700" font-family="Poppins,sans-serif">HIGH VOL</text>`;

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block">${g}</svg>`;
}

/** Bullish engulfing: valid + invalid side by side */
function engulfingSvg(): string {
  const W = 120;
  const H = 100;
  const pad = 12;

  // valid: small red, then bigger green fully covering it, tiny wick
  function validSvg(): string {
    const bw = 20;
    const x1 = 32;
    const x2 = 72;
    // red candle: o=70, c=60, h=72, l=58
    // green candle: o=58, c=74, h=75, l=57 (tiny wick below)
    const vals = [72, 58, 75, 57];
    let mn = Math.min(...vals) - 4;
    let mx = Math.max(...vals) + 4;
    const y = (v: number) => pad + ((H - 2 * pad) * (mx - v)) / (mx - mn);

    let g = "";
    // red
    g += `<line x1="${x1}" y1="${y(72)}" x2="${x1}" y2="${y(58)}" stroke="${RED}" stroke-width="2"/>`;
    g += `<rect x="${x1 - bw / 2}" y="${y(70).toFixed(1)}" width="${bw}" height="${Math.max(2.5, y(60) - y(70)).toFixed(1)}" rx="2" fill="${RED}"/>`;
    // green (big, fully engulfs)
    g += `<line x1="${x2}" y1="${y(75)}" x2="${x2}" y2="${y(57)}" stroke="${GREEN}" stroke-width="2"/>`;
    g += `<rect x="${x2 - bw / 2}" y="${y(74).toFixed(1)}" width="${bw}" height="${Math.max(2.5, y(58) - y(74)).toFixed(1)}" rx="2" fill="${GREEN}"/>`;
    g += `<text x="${W / 2}" y="${H - 2}" text-anchor="middle" font-size="9" fill="${GREEN}" font-weight="700" font-family="Poppins,sans-serif">&#10003; Proper</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block">${g}</svg>`;
  }

  // invalid: green body doesn't cover the red / long wick
  function invalidSvg(): string {
    const bw = 20;
    const x1 = 32;
    const x2 = 72;
    // red candle: o=70, c=58, h=72, l=56
    // green candle: small body, long upper wick
    const vals = [72, 56, 78, 54];
    let mn = Math.min(...vals) - 4;
    let mx = Math.max(...vals) + 4;
    const y = (v: number) => pad + ((H - 2 * pad) * (mx - v)) / (mx - mn);

    let g = "";
    // red
    g += `<line x1="${x1}" y1="${y(72)}" x2="${x1}" y2="${y(56)}" stroke="${RED}" stroke-width="2"/>`;
    g += `<rect x="${x1 - bw / 2}" y="${y(70).toFixed(1)}" width="${bw}" height="${Math.max(2.5, y(58) - y(70)).toFixed(1)}" rx="2" fill="${RED}"/>`;
    // green – body only goes from 58 to 63 (doesn't cover red body) + long upper wick to 78
    g += `<line x1="${x2}" y1="${y(78)}" x2="${x2}" y2="${y(54)}" stroke="${GREEN}" stroke-width="2"/>`;
    g += `<rect x="${x2 - bw / 2}" y="${y(63).toFixed(1)}" width="${bw}" height="${Math.max(2.5, y(58) - y(63)).toFixed(1)}" rx="2" fill="${GREEN}"/>`;
    g += `<text x="${W / 2}" y="${H - 2}" text-anchor="middle" font-size="9" fill="${RED}" font-weight="700" font-family="Poppins,sans-serif">&#10007; Weak</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block">${g}</svg>`;
  }

  return `<div style="display:flex;gap:32px;justify-content:center;align-items:flex-start">${validSvg()}${invalidSvg()}</div>`;
}

/** 200 EMA bounce SVG */
function emaBounce(): string {
  const W = 280;
  const H = 100;
  const pad = 14;

  // Price goes up, dips to EMA, bounces
  const pricePts: [number, number][] = [
    [pad, 75],
    [50, 60],
    [80, 68],
    [110, 48],
    [140, 62],  // dip toward EMA
    [160, 70],  // touch EMA
    [190, 50],  // bounce up
    [220, 38],
    [W - pad, 30],
  ];
  // EMA line – smoother and lower
  const emaPts: [number, number][] = [
    [pad, 82],
    [60, 76],
    [110, 70],
    [160, 72],   // EMA at touch point
    [220, 64],
    [W - pad, 56],
  ];

  const priceD = pricePts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const emaD = emaPts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  // bounce marker at ~x=160
  const bx = 160;
  const by = 72;

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;margin:0 auto">
    <polyline points="${pricePts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <polyline points="${emaPts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${EMER}" stroke-width="2" stroke-dasharray="5,3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${bx}" cy="${by}" r="5" fill="none" stroke="${GREEN}" stroke-width="2"/>
    <text x="${bx + 8}" y="${by - 6}" font-size="8" fill="${GREEN}" font-weight="700" font-family="Poppins,sans-serif">Bounce</text>
    <text x="${W - pad}" y="${emaPts[emaPts.length - 1][1] - 5}" font-size="8" fill="${EMER}" font-weight="700" font-family="Poppins,sans-serif" text-anchor="end">200 EMA</text>
    <text x="${W - pad}" y="${pricePts[pricePts.length - 1][1] - 5}" font-size="8" fill="${INK}" font-weight="700" font-family="Poppins,sans-serif" text-anchor="end">Price</text>
  </svg>`;
}

/** Stochastic + Support SVG */
function stochasticSvg(): string {
  const W = 280;
  const pH = 72;
  const sH = 48;
  const H = pH + sH + 12;
  const pad = 12;

  // Price panel: dashes support line, green candle bouncing
  const suppY = pH - 18;
  const pricePts: [number, number][] = [
    [pad, 30],
    [60, 44],
    [90, 28],
    [120, 48],   // dips to support
    [145, suppY + 2],  // touches support
    [170, 35],   // bounces
    [200, 22],
    [W - pad, 18],
  ];
  const priceD = pricePts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  // green candle at support bounce (x≈145)
  const cx = 145;
  const co = suppY + 2;
  const cc = suppY - 12;
  const ch = suppY - 14;
  const cl = suppY + 4;
  const bw = 12;
  const y = (v: number) => v; // already in pixel coords for price panel

  // Stochastic panel (offset by pH+12)
  const sOff = pH + 12;
  const lvl20 = sOff + sH * 0.75;
  // %K line: starts low (oversold), crosses up above 20
  const stochPts: [number, number][] = [
    [pad, sOff + sH * 0.85],
    [60, sOff + sH * 0.9],
    [100, sOff + sH * 0.88],
    [130, sOff + sH * 0.82],  // near 20 level
    [155, sOff + sH * 0.6],   // crossover
    [180, sOff + sH * 0.35],
    [210, sOff + sH * 0.25],
    [W - pad, sOff + sH * 0.2],
  ];
  const stochD = stochPts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;margin:0 auto">
    <!-- price panel -->
    <line x1="${pad}" y1="${suppY}" x2="${W - pad}" y2="${suppY}" stroke="${MUTED}" stroke-width="1.2" stroke-dasharray="5,3"/>
    <text x="${pad}" y="${suppY - 3}" font-size="7" fill="${MUTED}" font-weight="700" font-family="Poppins,sans-serif">Support</text>
    <polyline points="${pricePts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- bounce candle -->
    <line x1="${cx}" y1="${ch}" x2="${cx}" y2="${cl}" stroke="${GREEN}" stroke-width="1.8"/>
    <rect x="${cx - bw / 2}" y="${cc}" width="${bw}" height="${Math.max(2.5, co - cc)}" rx="2" fill="${GREEN}"/>
    <!-- stoch panel divider -->
    <line x1="${pad}" y1="${pH + 6}" x2="${W - pad}" y2="${pH + 6}" stroke="${HAIR}" stroke-width="1"/>
    <text x="${pad}" y="${pH + 10}" font-size="6.5" fill="${MUTED}" font-weight="600" font-family="Poppins,sans-serif">Stochastic %K</text>
    <!-- 20 level line -->
    <line x1="${pad}" y1="${lvl20}" x2="${W - pad}" y2="${lvl20}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="${pad}" y="${lvl20 - 2}" font-size="6.5" fill="#94a3b8" font-weight="600" font-family="Poppins,sans-serif">20</text>
    <polyline points="${stochPts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${EMER}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- crossover marker -->
    <circle cx="155" cy="${sOff + sH * 0.6}" r="4" fill="none" stroke="${GREEN}" stroke-width="1.8"/>
    <text x="162" y="${sOff + sH * 0.6 - 4}" font-size="7" fill="${GREEN}" font-weight="700" font-family="Poppins,sans-serif">Cross ↑</text>
  </svg>`;
}

/** W / Double Bottom SVG */
function doubleBottomSvg(): string {
  const W = 280;
  const H = 100;
  const pad = 12;

  const pts: [number, number][] = [
    [pad, 40],          // start high
    [45, 72],           // first low
    [85, 48],           // middle peak (neckline height)
    [125, 72],          // second low (equal to first)
    [165, 50],          // recovery to neckline
    [190, 32],          // breakout above neckline
    [W - pad, 24],      // continues up
  ];
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  // neckline at y=48 (the middle peak)
  const neckY = 48;

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;margin:0 auto">
    <!-- neckline -->
    <line x1="${pad}" y1="${neckY}" x2="${W - pad}" y2="${neckY}" stroke="${MUTED}" stroke-width="1.2" stroke-dasharray="5,3"/>
    <text x="${pad}" y="${neckY - 3}" font-size="7.5" fill="${MUTED}" font-weight="700" font-family="Poppins,sans-serif">Neckline</text>
    <!-- W shape -->
    <polyline points="${pts.slice(0, 6).map((p) => p.join(",")).join(" ")}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- breakout segment in green -->
    <polyline points="165,50 190,32 ${W - pad},24" fill="none" stroke="${GREEN}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- arrow up at breakout -->
    <polygon points="190,26 186,36 194,36" fill="${GREEN}"/>
    <text x="196" y="30" font-size="7.5" fill="${GREEN}" font-weight="700" font-family="Poppins,sans-serif">Breakout</text>
    <!-- label lows -->
    <text x="38" y="84" font-size="7" fill="${RED}" font-weight="600" font-family="Poppins,sans-serif">Low 1</text>
    <text x="118" y="84" font-size="7" fill="${RED}" font-weight="600" font-family="Poppins,sans-serif">Low 2</text>
  </svg>`;
}

/** Triangle / Ascending triangle breakout SVG */
function triangleSvg(): string {
  const W = 280;
  const H = 100;
  const pad = 12;

  // Ascending triangle: flat resistance top, rising support bottom
  const resistY = 28;
  // Rising support: starts at y=80, ends near y=28 at x=200
  const suppStart: [number, number] = [pad, 78];
  const suppEnd: [number, number] = [200, resistY + 2];

  // Price oscillating between the two lines
  const pricePts: [number, number][] = [
    [pad, 76],
    [30, resistY + 1],    // hits resistance
    [55, 64],
    [80, resistY + 1],    // hits resistance again
    [105, 54],
    [130, resistY + 2],   // hits resistance
    [155, 46],
    [178, resistY + 1],   // near apex
    [200, resistY - 2],   // breakout
    [230, 18],
    [W - pad, 12],
  ];
  const priceD = pricePts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block;margin:0 auto">
    <!-- flat resistance -->
    <line x1="${pad}" y1="${resistY}" x2="205" y2="${resistY}" stroke="${MUTED}" stroke-width="1.3" stroke-dasharray="5,3"/>
    <text x="${pad}" y="${resistY - 3}" font-size="7.5" fill="${MUTED}" font-weight="700" font-family="Poppins,sans-serif">Resistance</text>
    <!-- rising support trendline -->
    <line x1="${suppStart[0]}" y1="${suppStart[1]}" x2="${suppEnd[0]}" y2="${suppEnd[1]}" stroke="${EMER}" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="${pad}" y="${suppStart[1] + 10}" font-size="7.5" fill="${EMER}" font-weight="700" font-family="Poppins,sans-serif">Support</text>
    <!-- price oscillation + breakout -->
    <polyline points="${pricePts.slice(0, 9).map((p) => p.join(",")).join(" ")}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
    <!-- breakout in green -->
    <polyline points="200,${resistY - 2} 230,18 ${W - pad},12" fill="none" stroke="${GREEN}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <polygon points="230,12 226,22 234,22" fill="${GREEN}"/>
    <text x="235" y="14" font-size="7.5" fill="${GREEN}" font-weight="700" font-family="Poppins,sans-serif">Breakout</text>
  </svg>`;
}

// ─── Reusable card building blocks ────────────────────────────────────────

function profitRuleBox(): string {
  return `<div style="margin-top:14px;background:#f0fdf4;border-left:4px solid ${GREEN};border-radius:8px;padding:11px 15px;font-size:13px;line-height:1.6">
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:${GREEN};margin-bottom:4px">Profit Rule</div>
    <div><strong>Under ₹500</strong> — aim to ride up to <strong>~20%</strong> &nbsp;|&nbsp; <strong>₹500 and above</strong> — target up to <strong>~10%</strong></div>
    <div style="margin-top:4px;color:${MUTED};font-size:12px">Always pair with a defined stop-loss. Keep targets realistic.</div>
  </div>`;
}

function lbl(text: string): string {
  return `<div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:${EMER};margin-top:13px;margin-bottom:3px">${text}</div>`;
}

export async function GET() {
  const now = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let html = `<!doctype html><html><head><meta charset="utf-8"><title>The Finrise Swing-Trading Playbook</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
    @page { size: A4; margin: 16mm 15mm; }
    * { box-sizing: border-box; }
    body { font-family: 'Poppins', 'Segoe UI', Arial, sans-serif; color: ${INK}; margin: 0; font-size: 14px; line-height: 1.65; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    h1,h2,h3 { margin: 0; font-weight: 700; }

    /* cover */
    .cover { height: 252mm; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
    .cover .mark { width: 78px; height: 78px; margin: 0 auto 26px; border-radius: 20px; background: ${INK}; display:flex; align-items:center; justify-content:center; }
    .cover h1 { font-size: 46px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
    .cover .accent { color: ${EMER}; }
    .cover .sub { color: ${MUTED}; font-size: 17px; margin-top: 18px; font-weight: 500; }
    .cover .risk-line { margin-top: 28px; font-size: 16px; font-weight: 800; color: ${RED}; letter-spacing: .02em; }
    .cover .meta { margin-top: 16px; font-size: 13px; color: #8a97a6; letter-spacing: .04em; text-transform: uppercase; }

    /* disclaimer page */
    .disclaimer { page-break-after: always; padding: 10mm 0; }
    .disclaimer h2 { font-size: 22px; font-weight: 800; color: ${RED}; border-bottom: 3px solid ${RED}; padding-bottom: 8px; margin-bottom: 18px; }
    .disc-box { border: 2px solid ${RED}; border-radius: 14px; padding: 22px 26px; background: #fff5f5; font-size: 14.5px; line-height: 1.7; }
    .disc-box p { margin: 0 0 12px; }
    .disc-box p:last-child { margin-bottom: 0; }
    .disc-bold { font-weight: 800; color: ${RED}; }

    /* contents */
    .contents { page-break-after: always; }
    .contents h2 { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; border-bottom: 3px solid ${EMER}; padding-bottom: 10px; margin-bottom: 20px; }
    .toc-fam { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: ${EMER}; margin: 16px 0 6px; }
    .toc-row { display: flex; align-items: center; gap: 10px; padding: 5px 0; border-bottom: 1px dotted ${HAIR}; font-size: 14.5px; }
    .toc-num { width: 26px; flex-shrink: 0; font-weight: 700; color: ${MUTED}; text-align: right; }
    .toc-dot { width: 9px; height: 9px; border-radius: 999px; background: ${EMER}; flex-shrink: 0; }
    .toc-name { font-weight: 600; }

    /* section rule */
    .section-rule { display: flex; align-items: center; gap: 12px; margin: 0 0 18px; }
    .section-rule h2 { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; white-space: nowrap; }
    .section-rule .bar { flex: 1; height: 3px; background: ${EMER}; border-radius: 2px; }

    /* cards */
    .card { border: 1px solid ${HAIR}; border-radius: 14px; padding: 18px 20px; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(14,27,46,0.06); page-break-inside: avoid; }
    .card .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
    .card .num-badge { display:inline-flex; align-items:center; justify-content:center; width: 32px; height: 32px; border-radius: 9px; background: ${INK}; color:#fff; font-weight: 800; font-size: 15px; flex-shrink: 0; }
    .card h3 { font-size: 19px; font-weight: 700; }
    .card .screener-url { font-size: 12.5px; font-family: 'Courier New', monospace; background: #f1f5f9; border-radius: 6px; padding: 3px 9px; color: ${INK}; word-break: break-all; display: inline-block; }
    ul { margin: 4px 0 0; padding-left: 20px; }
    li { margin: 4px 0; font-size: 14px; }
    .svg-wrap { margin: 12px 0; text-align: center; }
    .svg-caption { font-size: 11px; color: ${MUTED}; margin-top: 4px; font-style: italic; }

    /* basics section */
    .basics-page { page-break-after: always; }
    .basics-card { border: 1px solid ${HAIR}; border-radius: 12px; padding: 15px 18px; margin-bottom: 14px; background: #fafbfa; }
    .basics-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }

    /* strategy page break */
    .strategy-page { page-break-before: always; }

    /* footer */
    .foot { margin-top: 32px; border-top: 1px solid ${HAIR}; padding-top: 10px; color: #8a97a6; font-size: 11.5px; text-align: center; }
  </style></head><body>`;

  // ── 1. COVER ──────────────────────────────────────────────────────────────
  html += `<div class="cover">
    <div class="mark"><svg viewBox="30 7 66 75" width="46" height="52"><rect x="36" y="26" width="9" height="50" rx="4.5" fill="#fff"/><line x1="40.5" y1="34" x2="74" y2="25" stroke="#fff" stroke-width="9" stroke-linecap="round"/><line x1="40.5" y1="49" x2="64" y2="42" stroke="#fff" stroke-width="9" stroke-linecap="round"/><polygon points="82,13 74,26 90,26" fill="${EMER}"/></svg></div>
    <h1>The Finrise<br><span class="accent">Swing-Trading Playbook</span></h1>
    <div class="sub">5 screener-based strategies for Indian stocks</div>
    <div class="risk-line">Trade at your own risk.</div>
    <div class="meta">Finrise Trading Academy &nbsp;·&nbsp; ${esc(now)}</div>
  </div>`;

  // ── 2. RISK DISCLAIMER ────────────────────────────────────────────────────
  html += `<div class="disclaimer">
    <h2>Risk Disclaimer — Please Read Before Proceeding</h2>
    <div class="disc-box">
      <p>This document is provided <strong>for educational purposes only</strong>. Nothing in this playbook constitutes investment advice, a buy or sell recommendation, or a SEBI-registered research report. Finrise is <strong>not a registered investment adviser</strong> and this material must not be treated as a solicitation to trade any security.</p>
      <p>Swing trading in equities involves <strong>substantial risk of capital loss</strong>. Markets can and do move sharply against open positions. You may lose part or all of the money you commit. Past performance of any pattern, strategy, or indicator shown here is <strong>not a guarantee or indicator of future results</strong>.</p>
      <p>Always size each position so that the maximum potential loss on that trade is a small fraction of your total capital that you can genuinely afford to lose. Do not use borrowed money or funds set aside for essential expenses.</p>
      <p class="disc-bold">Trade at your own risk. Consult a SEBI-registered investment adviser before making any trading or investment decision.</p>
    </div>
  </div>`;

  // ── 3. CONTENTS / INDEX ───────────────────────────────────────────────────
  html += `<div class="contents">
    <h2>Contents</h2>
    <div class="toc-fam">Foundation</div>
    <div class="toc-row"><span class="toc-num">·</span><span class="toc-name">Market Basics — Trends, Who Moves the Market, FII Behaviour</span></div>
    <div class="toc-row"><span class="toc-num">·</span><span class="toc-name">The Position &amp; Profit Rule (used by every strategy)</span></div>
    <div class="toc-fam">The 5 Strategies</div>
    <div class="toc-row"><span class="toc-num">1</span><span class="toc-dot"></span><span class="toc-name">Bullish Engulfing (intraday-to-swing)</span></div>
    <div class="toc-row"><span class="toc-num">2</span><span class="toc-dot"></span><span class="toc-name">Near the 200 EMA</span></div>
    <div class="toc-row"><span class="toc-num">3</span><span class="toc-dot"></span><span class="toc-name">Stochastic + Support / Resistance</span></div>
    <div class="toc-row"><span class="toc-num">4</span><span class="toc-dot"></span><span class="toc-name">W Pattern / Double Bottom</span></div>
    <div class="toc-row"><span class="toc-num">5</span><span class="toc-dot"></span><span class="toc-name">Triangle Pattern</span></div>
  </div>`;

  // ── 4. MARKET BASICS ──────────────────────────────────────────────────────
  html += `<div class="basics-page">
    <div class="section-rule"><h2>Market Basics</h2><div class="bar"></div></div>

    <div class="basics-card">
      <h3>Trends</h3>
      <p style="font-size:14px;margin:0 0 12px">Every stock is either trending or ranging. Recognising which state you are in before you trade is the single most important habit you can build.</p>
      <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:13.5px;margin-bottom:14px">
        <div style="flex:1;min-width:160px"><strong style="color:${GREEN}">Uptrend</strong> — Price makes a series of <em>higher highs</em> and <em>higher lows</em>. Each rally reaches a new peak; each pullback stops above the previous low. The bulls are firmly in control.</div>
        <div style="flex:1;min-width:160px"><strong style="color:${MUTED}">Sideways / Range</strong> — Price oscillates between a floor (support) and a ceiling (resistance) without making new highs or lower lows. Neither side is winning.</div>
        <div style="flex:1;min-width:160px"><strong style="color:${RED}">Downtrend</strong> — Price makes a series of <em>lower highs</em> and <em>lower lows</em>. Each rally is weaker than the last; each sell-off reaches a deeper low. The bears are in control.</div>
      </div>
      <div class="svg-wrap">${trendChartsSvg()}</div>
    </div>

    <div class="basics-card">
      <h3>Who Moves the Market</h3>
      <div style="display:flex;gap:18px;flex-wrap:wrap;font-size:13.5px;margin-top:6px">
        <div style="flex:1;min-width:180px"><strong>FII — Foreign Institutional Investors</strong><br>Large global asset managers, hedge funds, and sovereign wealth funds that invest cross-border. Their order sizes are enormous, so when they rotate into or out of Indian equities the market can move sharply in a single session.</div>
        <div style="flex:1;min-width:180px"><strong>DII — Domestic Institutional Investors</strong><br>Indian entities such as mutual funds, life insurers, pension funds, and banks. DIIs often act as a counterbalancing force — buying when FIIs sell and vice versa — which can slow sharp moves.</div>
        <div style="flex:1;min-width:180px"><strong>Retail Traders</strong><br>Individual investors and traders like us. Retail is the smallest pool of capital and tends to be reactive — often entering a move after institutions have already committed, which can result in being caught in reversals.</div>
      </div>
    </div>

    <div class="basics-card">
      <h3>How FIIs Push the Market &amp; How Candles Behave</h3>
      <p style="font-size:13.5px;margin:0 0 10px">When large foreign funds deploy capital into Indian equities in a single session, a distinctive fingerprint appears on the chart:</p>
      <ul style="font-size:13.5px;margin-bottom:12px">
        <li><strong>Long green (bullish) candles</strong> with bodies that dwarf the surrounding bars — FII buying pressure overwhelms sellers.</li>
        <li><strong>Gap-up opens</strong> — overnight buy orders push the price above the previous day's close before Indian markets even open.</li>
        <li><strong>Volume spike</strong> — exchange volume can be two to four times the recent average on a heavy FII accumulation day.</li>
        <li><strong>Retail gets trapped</strong> — seeing the sharp move, retail traders pile in near the top; if FIIs begin distributing shortly after, retail is left holding a declining position.</li>
      </ul>
      <div style="text-align:center">
        ${fiiCandleSvg()}
        <div class="svg-caption">Small-bodied candles followed by a large FII-driven green candle on high volume.</div>
      </div>
    </div>
  </div>`;

  // ── 5. POSITION & PROFIT RULE (standalone highlighted section) ───────────
  html += `<div style="page-break-before:always">
    <div class="section-rule"><h2>The Position &amp; Profit Rule</h2><div class="bar"></div></div>
    <div style="border: 2px solid ${GREEN}; border-radius: 14px; padding: 22px 26px; background: #f0fdf4; font-size: 15px; line-height: 1.75; margin-bottom: 20px;">
      <p style="margin:0 0 14px">Every strategy in this playbook uses the same profit target framework. Apply it consistently:</p>
      <div style="display:flex;gap:20px;flex-wrap:wrap">
        <div style="flex:1;min-width:200px;background:#fff;border-radius:10px;padding:14px 18px;border:1px solid ${HAIR}">
          <div style="font-size:22px;font-weight:800;color:${GREEN}">Under ₹500</div>
          <div style="font-size:14px;margin-top:6px">You can aim to ride the move up to approximately <strong>20%</strong>. Smaller-priced stocks have more room to run on a percentage basis and volatility works in your favour on the way up.</div>
        </div>
        <div style="flex:1;min-width:200px;background:#fff;border-radius:10px;padding:14px 18px;border:1px solid ${HAIR}">
          <div style="font-size:22px;font-weight:800;color:${INK}">₹500 and Above</div>
          <div style="font-size:14px;margin-top:6px">Target up to approximately <strong>10%</strong>. Higher-priced stocks tend to be larger-cap and may move more slowly; a 10% swing is still a highly meaningful return.</div>
        </div>
      </div>
      <p style="margin:16px 0 0;font-size:13.5px;color:${MUTED}">These are <em>maximum guides</em>, not guaranteed outcomes. Always set a stop-loss before entering any trade and honour it without exception. Partial profit-booking at 50–60% of the target, then trailing the rest, is a sound approach.</p>
    </div>
  </div>`;

  // ── 6. STRATEGY 1 — BULLISH ENGULFING ────────────────────────────────────
  html += `<div class="strategy-page">
    <div class="section-rule"><h2>Strategy 1 — Bullish Engulfing</h2><div class="bar"></div></div>
    <div class="card">
      <div class="card-header"><span class="num-badge">1</span><h3>Bullish Engulfing (intraday-to-swing)</h3></div>

      ${lbl("What it is")}
      <div style="font-size:14px">A two-candle reversal signal where a large green candle completely swallows the body of the previous red candle, indicating that buyers have seized control after a period of selling. When spotted near a support level or after a pullback in an uptrend, it can mark the start of a multi-day swing move.</div>

      ${lbl("The screener")}
      <div style="margin-top:4px">Run this scan on ChartInk to find today's occurrences:<br>
        <span class="screener-url">chartink.com/screener/bullish-engulfing-pattern-1</span>
      </div>
      <div style="font-size:13.5px;margin-top:8px">
        <strong>How to run it:</strong> Around <strong>2:30 PM IST</strong> — about 30 minutes before the NSE close — open the screener and click <strong>Run Scan</strong>. The list shows every stock that has printed the bullish engulfing pattern on that day's candles. Review the <strong>top 10 results</strong>.
      </div>

      ${lbl("Picking the #1 candidate — what makes a proper engulfing")}
      <ul>
        <li>The green candle's <strong>body must fully cover the previous red candle's body</strong> — open-to-close of the green must be wider than open-to-close of the red.</li>
        <li>Only a <strong>very small lower wick</strong> on the green candle is acceptable. A large lower wick means buyers struggled near the lows and the signal is weakened.</li>
        <li>The green candle should close <strong>near its high</strong> — strong conviction buying right through the close.</li>
        <li>Volume on the green candle should be noticeably higher than average — institutional participation matters.</li>
        <li>Prefer stocks already in an uptrend or pulling back to a known support level.</li>
      </ul>

      ${lbl("Chart example")}
      <div class="svg-wrap">
        ${engulfingSvg()}
        <div class="svg-caption">Left: a valid engulfing — the green body fully covers the red body with a tiny lower wick. Right: a weak signal — the green body is too small and the long wick shows indecision.</div>
      </div>

      ${profitRuleBox()}
    </div>
  </div>`;

  // ── 7. STRATEGY 2 — 200 EMA ───────────────────────────────────────────────
  html += `<div class="strategy-page">
    <div class="section-rule"><h2>Strategy 2 — Near the 200 EMA</h2><div class="bar"></div></div>
    <div class="card">
      <div class="card-header"><span class="num-badge">2</span><h3>Price Pulling Back to the 200 EMA</h3></div>

      ${lbl("What it is")}
      <div style="font-size:14px">The <strong>200-period Exponential Moving Average</strong> is the most widely watched long-term trend indicator by institutions worldwide. In a healthy uptrend, price regularly pulls back to this line and finds buyers, making each touch-and-bounce a high-probability entry for a continuation swing.</div>

      ${lbl("The screener")}
      <div style="margin-top:4px"><span class="screener-url">chartink.com/screener/near-200-ema</span></div>
      <div style="font-size:13px;color:${MUTED};margin-top:4px">Lists stocks whose current price is within a few percent of their 200 EMA — exactly where the bounce opportunity lives.</div>

      ${lbl("The setup / rules")}
      <ul>
        <li>Confirm the stock is in a <strong>clear uptrend</strong> on the daily chart — the 200 EMA must be <em>rising</em> (pointing upward from left to right).</li>
        <li>Price has pulled back and is now <strong>testing or sitting just above the 200 EMA</strong> — not breaking below it.</li>
        <li>Wait for a <strong>bullish confirmation candle</strong> at or near the 200 EMA: a green candle, a hammer, or a bullish engulfing forming at that level.</li>
        <li>Enter on the close of the confirmation candle (or early the next morning).</li>
        <li><strong>Stop-loss:</strong> a daily close convincingly below the 200 EMA invalidates the trade — exit immediately.</li>
        <li>Avoid if the 200 EMA is <em>flat or declining</em> — the uptrend support dynamic no longer applies.</li>
      </ul>

      ${lbl("Chart example")}
      <div class="svg-wrap">
        ${emaBounce()}
        <div class="svg-caption">Price rising above the 200 EMA (dashed), pulling back to touch it, then bouncing — the classic setup.</div>
      </div>

      ${profitRuleBox()}
    </div>
  </div>`;

  // ── 8. STRATEGY 3 — STOCHASTIC + SUPPORT ─────────────────────────────────
  html += `<div class="strategy-page">
    <div class="section-rule"><h2>Strategy 3 — Stochastic + Support</h2><div class="bar"></div></div>
    <div class="card">
      <div class="card-header"><span class="num-badge">3</span><h3>Stochastic Oversold at a Support Level</h3></div>

      ${lbl("What it is")}
      <div style="font-size:14px">The <strong>Stochastic oscillator</strong> measures where a stock's current close sits relative to its recent price range. When it falls below 20 the stock is considered <em>oversold</em> — selling may be exhausted. Combine this with a price at a known support zone and you have two independent reasons to expect a bounce.</div>

      ${lbl("The screener")}
      <div style="margin-top:4px"><span class="screener-url">chartink.com/screener/stochastic-oversold</span></div>
      <div style="font-size:13px;color:${MUTED};margin-top:4px">Find this indicator on TradingView under "Stochastic" — default settings (14, 3, 3) work fine for daily charts.</div>

      ${lbl("The setup / rules — all three must align")}
      <ul>
        <li><strong>Support level:</strong> price is sitting at a clearly identifiable horizontal support zone (a previous swing low, a round number, or a consolidation base).</li>
        <li><strong>Green candle:</strong> a bullish candle forms at that support level — not a doji or a wick-heavy indecision bar, but a proper green body.</li>
        <li><strong>Stochastic %K crosses above 20 from below:</strong> the %K line has been below 20 (oversold) and now turns upward, crossing through the 20 level — confirming momentum is reversing.</li>
        <li>Enter after all three conditions are confirmed at the close of the green candle.</li>
        <li><strong>Stop-loss:</strong> a candle close below the support level. If support breaks, the thesis is wrong.</li>
      </ul>

      ${lbl("Chart example")}
      <div class="svg-wrap">
        ${stochasticSvg()}
        <div class="svg-caption">Top: price at support (dashed line) with a green bounce candle. Bottom: the Stochastic %K line (teal) crossing up through the 20 level at the same moment.</div>
      </div>

      ${profitRuleBox()}
    </div>
  </div>`;

  // ── 9. STRATEGY 4 — W PATTERN / DOUBLE BOTTOM ────────────────────────────
  html += `<div class="strategy-page">
    <div class="section-rule"><h2>Strategy 4 — W Pattern / Double Bottom</h2><div class="bar"></div></div>
    <div class="card">
      <div class="card-header"><span class="num-badge">4</span><h3>W Pattern (Double Bottom)</h3></div>

      ${lbl("What it is")}
      <div style="font-size:14px">The double bottom — shaped like a letter W — is one of the most reliable reversal patterns in technical analysis. Price falls to a low, rebounds to a middle peak (the <strong>neckline</strong>), falls again to approximately the same low, and then rallies decisively. The pattern completes only when price breaks and closes <em>above the neckline</em>.</div>

      ${lbl("The screeners")}
      <div style="margin-top:4px;display:flex;gap:10px;flex-wrap:wrap">
        <span class="screener-url">chartink.com/screener/w-pattern</span>
        <span class="screener-url">topstockresearch.com → Double Bottom scan</span>
      </div>

      ${lbl("The setup / rules")}
      <ul>
        <li>Identify two <strong>roughly equal lows</strong> — they don't need to be pixel-perfect, but the second low should not be more than a few percent below the first.</li>
        <li>The peak between the two lows establishes the <strong>neckline</strong>. Mark it with a horizontal line.</li>
        <li><strong>Only enter on a confirmed breakout above the neckline</strong> — do not buy in anticipation. Entering early is the most common mistake with this pattern.</li>
        <li>Look for the breakout candle to have above-average volume — that confirms institutional participation in the breakout move.</li>
        <li><strong>Stop-loss:</strong> a close back below the neckline after the breakout.</li>
      </ul>

      ${lbl("Spotting a fake breakout")}
      <ul>
        <li>Breakout occurs on <strong>thin or below-average volume</strong> — no institutional follow-through.</li>
        <li>The breakout candle <strong>closes back below the neckline</strong> within one or two sessions.</li>
        <li>Price fails to hold the neckline as support on a retest — what was resistance now needs to act as support, and if it doesn't, the breakout is false.</li>
        <li>A real breakout has a strong, decisive close above the neckline, volume expansion, and ideally holds the neckline on the first pullback.</li>
      </ul>

      ${lbl("Chart example")}
      <div class="svg-wrap">
        ${doubleBottomSvg()}
        <div class="svg-caption">Two equal lows form the W shape. The dashed neckline marks the middle peak. A green segment shows the valid breakout above the neckline.</div>
      </div>

      ${profitRuleBox()}
    </div>
  </div>`;

  // ── 10. STRATEGY 5 — TRIANGLE PATTERN ────────────────────────────────────
  html += `<div class="strategy-page">
    <div class="section-rule"><h2>Strategy 5 — Triangle Pattern</h2><div class="bar"></div></div>
    <div class="card">
      <div class="card-header"><span class="num-badge">5</span><h3>Triangle Pattern Breakout</h3></div>

      ${lbl("What it is")}
      <div style="font-size:14px">A triangle forms when price oscillates between two converging trendlines, compressing into a tighter and tighter range. This contraction reflects a temporary balance between buyers and sellers. When price finally breaks out of the triangle, the pent-up energy drives a sharp directional move — usually in the direction of the trend that preceded the consolidation.</div>

      ${lbl("The screener")}
      <div style="margin-top:4px"><span class="screener-url">chartink.com/screener/triangle-pattern-14</span></div>

      ${lbl("Types of triangles")}
      <ul>
        <li><strong>Ascending triangle</strong> — flat resistance at the top, rising support at the bottom. Bullish bias; expect an upward breakout.</li>
        <li><strong>Descending triangle</strong> — flat support at the bottom, declining resistance at the top. Bearish bias; expect a downward breakdown.</li>
        <li><strong>Symmetrical triangle</strong> — both trendlines converge at the same angle. Neutral until the breakout direction is confirmed; trade in the direction of the prior trend.</li>
      </ul>

      ${lbl("The setup / rules")}
      <ul>
        <li>Identify the two converging trendlines clearly — you need at least <strong>two touch points on each line</strong> to draw them reliably.</li>
        <li>Notice how <strong>volume typically contracts</strong> as price moves deeper into the triangle. This is normal — it signals the market waiting for a catalyst.</li>
        <li><strong>Wait for a decisive close beyond the trendline</strong> — not just an intraday pierce. A daily close outside the triangle is the trigger.</li>
        <li>Confirm with a <strong>volume expansion on the breakout candle</strong> — volume should jump above the recent average, ideally significantly.</li>
        <li>Trade the breakout <strong>in the direction of the prior trend</strong>: if the triangle formed after an uptrend, favour the upside breakout.</li>
        <li><strong>Stop-loss:</strong> a close back inside the triangle negates the breakout — exit promptly.</li>
      </ul>

      ${lbl("Chart example")}
      <div class="svg-wrap">
        ${triangleSvg()}
        <div class="svg-caption">An ascending triangle: price bouncing between a flat resistance (dashed) and a rising support trendline (teal), then breaking out to the upside on strong volume.</div>
      </div>

      ${profitRuleBox()}
    </div>
  </div>`;

  // ── FOOTER ────────────────────────────────────────────────────────────────
  html += `<div class="foot">Educational only — not investment advice. Trade at your own risk. Consult a SEBI-registered adviser. © Finrise Trading Academy.</div>`;
  html += `</body></html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
