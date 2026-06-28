import Link from "next/link";
import { IconDashboard, IconCourse, IconLibrary, IconTrophy } from "./icons";
import type { NavKey } from "./Sidebar";

// Bottom tab bar shown only on small screens (see .tabbar in globals.css), so
// students can jump between the core areas with one tap — no drawer needed.
const TABS = [
  { key: "dashboard", label: "Home", href: "/dashboard", Icon: IconDashboard },
  { key: "course", label: "Course", href: "/courses/candlestick-mastery", Icon: IconCourse },
  { key: "achievements", label: "Badges", href: "/achievements", Icon: IconTrophy },
  { key: "library", label: "Library", href: "/library", Icon: IconLibrary },
] as const;

export default function MobileTabBar({ active }: { active: NavKey }) {
  return (
    <nav className="tabbar" aria-label="Primary">
      {TABS.map(({ key, label, href, Icon }) => (
        <Link key={key} href={href} className={`tab-item ${active === key ? "active" : ""}`}>
          <Icon width={22} height={22} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
