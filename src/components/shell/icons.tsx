// Lightweight inline icon set (Lucide-style, 1.7 stroke). Vector, themeable —
// used for navigation and UI controls (no emoji as structural icons).
import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function IconDashboard(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}
export function IconCourse(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H20v14H5.5A1.5 1.5 0 0 0 4 19.5z" />
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 18H20" />
    </svg>
  );
}
export function IconSculptor(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="20" cy="14" r="2" />
    </svg>
  );
}
export function IconTrophy(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M6 4h12v3a6 6 0 0 1-12 0z" />
      <path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3" />
      <path d="M9 18h6M12 13v5M10 21h4" />
    </svg>
  );
}
export function IconLeaderboard(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="12" width="5" height="9" rx="1" />
      <rect x="9.5" y="4" width="5" height="17" rx="1" />
      <rect x="16" y="9" width="5" height="12" rx="1" />
    </svg>
  );
}
export function IconLibrary(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M4 5v14M9 4v16" />
      <path d="m13 5 5 1-3 13-5-1z" />
      <path d="M9 4H5a1 1 0 0 0-1 1M9 20H5a1 1 0 0 1-1-1" />
    </svg>
  );
}
export function IconGauge(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M12 14 16 9" />
      <path d="M3.5 18a9 9 0 1 1 17 0z" />
      <circle cx="12" cy="14" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconBox(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </svg>
  );
}
export function IconUsers(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6a3 3 0 0 1 0 6M16.5 20a5.5 5.5 0 0 0-2-4.3" />
    </svg>
  );
}
export function IconReceipt(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}
export function IconLogout(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M15 5V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1" />
      <path d="M10 12h11M18 9l3 3-3 3" />
    </svg>
  );
}
export function IconGift(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M20 12v10H4V12" />
      <path d="M22 7H2v5h20z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
export function IconMenu(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(p)}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
