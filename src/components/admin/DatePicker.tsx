"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

function pretty(value: string): string {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Calendar date picker. Submits a hidden <input name> with a YYYY-MM-DD value,
// so it works inside server-action forms. The calendar grid only renders while
// open (client-side), so there is no SSR/hydration mismatch.
export function DatePicker({
  name,
  defaultValue = "",
  placeholder = "Select date",
  label,
  className,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const init = defaultValue ? defaultValue.split("-").map(Number) : null;
  const start = init ? { y: init[0], m: init[1] - 1 } : currentYM();
  const [view, setView] = useState(start);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const firstDow = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }));
  const next = () => setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }));
  const todayYM = currentYM();
  const today = iso(todayYM.y, todayYM.m, new Date().getDate());

  return (
    <div className={cn("block", className)} ref={ref}>
      {label && <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>}
      <input type="hidden" name={name} value={value} />

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-full items-center gap-2 rounded-lg border border-input bg-card px-3 text-[13px] font-medium text-foreground outline-none transition-all hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className={cn("truncate", !value && "font-normal text-muted-foreground/70")}>
            {value ? pretty(value) : placeholder}
          </span>
        </button>

        {open && (
          <div className="absolute left-0 z-50 mt-1 w-64 rounded-lg border border-border bg-popover p-3 shadow-[0_16px_40px_-12px_rgba(20,35,59,0.28)] animate-fade-in">
            <div className="mb-2 flex items-center justify-between">
              <button type="button" onClick={prev} className="grid h-7 w-7 place-items-center rounded hover:bg-accent" aria-label="Previous month">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-[13px] font-semibold">
                {MONTHS[view.m]} {view.y}
              </div>
              <button type="button" onClick={next} className="grid h-7 w-7 place-items-center rounded hover:bg-accent" aria-label="Next month">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 text-center">
              {DOW.map((d) => (
                <div key={d} className="py-1 text-[11px] font-semibold text-muted-foreground">{d}</div>
              ))}
              {cells.map((d, i) =>
                d === null ? (
                  <div key={i} />
                ) : (
                  <DayCell
                    key={i}
                    label={d}
                    selected={iso(view.y, view.m, d) === value}
                    today={iso(view.y, view.m, d) === today}
                    onPick={() => {
                      setValue(iso(view.y, view.m, d));
                      setOpen(false);
                    }}
                  />
                )
              )}
            </div>

            {value && (
              <button
                type="button"
                onClick={() => {
                  setValue("");
                  setOpen(false);
                }}
                className="mt-2 w-full rounded border border-input py-1.5 text-xs font-semibold hover:bg-accent"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DayCell({
  label,
  selected,
  today,
  onPick,
}: {
  label: number;
  selected: boolean;
  today: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={cn(
        "grid h-8 place-items-center rounded text-[13px] transition-colors",
        selected
          ? "bg-primary font-semibold text-white"
          : today
          ? "bg-secondary font-semibold"
          : "hover:bg-accent"
      )}
    >
      {label}
    </button>
  );
}

function currentYM() {
  const d = new Date();
  return { y: d.getFullYear(), m: d.getMonth() };
}
