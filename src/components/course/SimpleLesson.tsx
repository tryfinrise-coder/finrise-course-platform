"use client";

import { useEffect, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { SimpleLessonContent } from "@/courses/candlestick-mastery";

type Lang = "en" | "hi";

// Beginner-friendly explainer + learning FAQs with an English / हिन्दी toggle.
// Language choice is remembered across lessons (localStorage).
export default function SimpleLesson({ content }: { content: SimpleLessonContent }) {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("finrise_lang") as Lang) : null;
    if (saved === "hi" || saved === "en") setLang(saved);
  }, []);

  const choose = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("finrise_lang", l);
    } catch {}
  };

  const t = (b: { en: string; hi: string }) => (lang === "hi" ? b.hi : b.en);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* language toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontSize: 17, margin: 0 }}>In simple words</h2>
        <div style={{ display: "inline-flex", padding: 3, borderRadius: 999, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          {(["en", "hi"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => choose(l)}
              style={{
                padding: "5px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                background: lang === l ? "var(--brand)" : "transparent",
                color: lang === l ? "#fff" : "var(--muted)",
                transition: "all .2s ease",
              }}
            >
              {l === "en" ? "English" : "हिन्दी"}
            </button>
          ))}
        </div>
      </div>

      {/* explainer + real-life example */}
      <div className="glass card-pad">
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75 }}>{t(content.simple)}</p>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            padding: 16,
            borderRadius: 12,
            background: "var(--grad-soft)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: 34, lineHeight: 1, flexShrink: 0 }}>{content.emoji}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand)", marginBottom: 4 }}>
              {lang === "hi" ? "ऐसे समझो 🧒" : "Imagine this 🧒"}
            </div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65 }}>{t(content.example)}</p>
          </div>
        </div>
      </div>

      {/* learning FAQs */}
      {content.faqs.length > 0 && (
        <div>
          <h3 style={{ fontSize: 15, color: "var(--brand-3)", margin: "4px 0 10px", display: "flex", alignItems: "center", gap: 8 }}>
            <HelpCircle size={16} /> {lang === "hi" ? "सीखने के सवाल" : "Learning FAQs"}
          </h3>
          <div style={{ display: "grid", gap: 8 }}>
            {content.faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="glass" style={{ overflow: "hidden" }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "13px 16px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {t(f.q)}
                    <ChevronDown size={18} style={{ flexShrink: 0, transition: "transform .2s ease", transform: isOpen ? "rotate(180deg)" : "none", color: "var(--muted)" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 16px 14px", fontSize: 14, lineHeight: 1.65, color: "var(--muted)" }}>{t(f.a)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
