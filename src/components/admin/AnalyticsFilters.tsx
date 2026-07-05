"use client";

import { useRouter, usePathname } from "next/navigation";
import { Filter } from "lucide-react";

interface Props {
  courses: { slug: string; title: string }[];
  course: string; // active slug or ""
  days: number;
}

const RANGES = [
  { v: 7, label: "Last 7 days" },
  { v: 14, label: "Last 14 days" },
  { v: 30, label: "Last 30 days" },
  { v: 90, label: "Last 90 days" },
];

export default function AnalyticsFilters({ courses, course, days }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function setParam(key: string, val: string) {
    const p = new URLSearchParams(window.location.search);
    if (val) p.set(key, val);
    else p.delete(key);
    router.push(`${pathname}?${p.toString()}`);
  }

  const selectCls =
    "rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        <Filter className="h-3.5 w-3.5" /> Filter
      </span>
      <select className={selectCls} value={course} onChange={(e) => setParam("course", e.target.value)}>
        <option value="">All courses</option>
        {courses.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.title}
          </option>
        ))}
      </select>
      <select className={selectCls} value={String(days)} onChange={(e) => setParam("days", e.target.value)}>
        {RANGES.map((r) => (
          <option key={r.v} value={r.v}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
