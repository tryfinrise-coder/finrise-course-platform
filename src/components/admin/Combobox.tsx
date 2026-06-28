"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboOption {
  value: string;
  label: string;
  hint?: string;
}

// Searchable single-select dropdown. Renders a hidden <input name> so it submits
// inside server-action forms just like a native <select>.
export function Combobox({
  name,
  options,
  defaultValue = "",
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  label,
  className,
}: {
  name: string;
  options: ComboOption[];
  defaultValue?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

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

  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query]
  );

  return (
    <div className={cn("block", className)} ref={ref}>
      {label && <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>}
      <input type="hidden" name={name} value={value} />

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-card px-3 text-[13px] font-medium text-foreground outline-none transition-all hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <span className={cn("truncate", !selected && "font-normal text-muted-foreground/70")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-border bg-popover shadow-[0_16px_40px_-12px_rgba(20,35,59,0.28)] animate-fade-in">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <ul className="max-h-56 overflow-auto p-1.5">
              {filtered.length === 0 && (
                <li className="px-3 py-3 text-center text-[13px] text-muted-foreground">No matches</li>
              )}
              {filtered.map((o) => {
                const active = o.value === value;
                return (
                  <li key={o.value}>
                    <button
                      type="button"
                      onClick={() => {
                        setValue(o.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded px-2.5 py-2 text-left text-[13px] transition-colors",
                        active ? "bg-primary/10 font-semibold text-primary" : "hover:bg-accent"
                      )}
                    >
                      <span className="truncate">
                        {o.label}
                        {o.hint && <span className="ml-2 text-xs text-muted-foreground">{o.hint}</span>}
                      </span>
                      {active && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
