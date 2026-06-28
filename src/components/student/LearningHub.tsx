"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, BookOpen, FlaskConical, Sparkles, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "lesson", label: "Video Lesson", icon: BookOpen },
  { key: "lab", label: "Pattern Lab", icon: FlaskConical },
  { key: "tutor", label: "AI Tutor", icon: Sparkles },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function LearningHub({
  courseTitle,
  nextHref,
  nextTitle,
  lessonNo,
  totalLessons,
  sculptorHref,
}: {
  courseTitle: string;
  nextHref: string;
  nextTitle: string;
  lessonNo: number;
  totalLessons: number;
  sculptorHref: string;
}) {
  const [tab, setTab] = useState<TabKey>("lesson");

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      {/* video area (dark, as players are) */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-60">
          <CandleBackdrop />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 ring-1 ring-white/15">
            Lesson {lessonNo} / {totalLessons}
          </span>
          <span className="rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-semibold text-rose-200 ring-1 ring-rose-400/30">
            ● Live chart
          </span>
        </div>
        <Link href={nextHref} className="group absolute inset-0 grid place-items-center" aria-label={`Continue: ${nextTitle}`}>
          <span className="grid h-[72px] w-[72px] place-items-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-600">
            <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" />
          </span>
        </Link>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-lg font-bold text-white drop-shadow">{nextTitle}</div>
          <div className="text-sm text-white/55">{courseTitle}</div>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-1 border-b border-slate-200 px-3">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "relative flex items-center gap-2 px-3 py-3.5 text-sm font-semibold transition-colors duration-200",
                active ? "text-emerald-600" : "text-slate-400 hover:text-slate-700"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
              {active && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* content */}
      <div className="p-5">
        {tab === "lesson" && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-600">
              You&apos;re on <span className="font-semibold text-slate-900">{nextTitle}</span>. Watch the candles form
              tick-by-tick, feel the bull-vs-bear pressure, then reveal what price did next.
            </p>
            <Link href={nextHref} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500">
              Continue lesson <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
        {tab === "lab" && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-600">
              Open the <span className="font-semibold text-slate-900">Candle Sculptor</span> — drag the open, high,
              low and close and the engine names the pattern in real time.
            </p>
            <Link href={sculptorHref} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
              Launch Pattern Lab <FlaskConical className="h-4 w-4" />
            </Link>
          </div>
        )}
        {tab === "tutor" && (
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-700">
                Ask me anything about candlesticks — “What invalidates a bullish engulfing?”
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
              <input disabled placeholder="Message your AI tutor…" className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-white">
                <Send className="h-4 w-4" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CandleBackdrop() {
  const candles = [
    { up: true, h: 38, y: 40 }, { up: false, h: 52, y: 22 }, { up: true, h: 30, y: 48 },
    { up: true, h: 64, y: 14 }, { up: false, h: 44, y: 30 }, { up: true, h: 72, y: 10 },
    { up: false, h: 34, y: 40 }, { up: true, h: 58, y: 18 }, { up: true, h: 48, y: 28 },
    { up: false, h: 40, y: 36 }, { up: true, h: 66, y: 12 }, { up: true, h: 54, y: 22 },
  ];
  return (
    <svg viewBox="0 0 480 270" className="h-full w-full" preserveAspectRatio="none">
      {candles.map((c, i) => {
        const x = 24 + i * 38;
        const col = c.up ? "#22c55e" : "#f43f5e";
        return (
          <g key={i}>
            <line x1={x} y1={c.y - 8} x2={x} y2={c.y + c.h + 8} stroke={col} strokeWidth="2" opacity="0.65" />
            <rect x={x - 9} y={c.y} width="18" height={c.h} rx="3" fill={col} opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
}
