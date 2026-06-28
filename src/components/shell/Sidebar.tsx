import Link from "next/link";
import {
  IconDashboard,
  IconCourse,
  IconSculptor,
  IconTrophy,
  IconLibrary,
  IconGift,
  IconGauge,
  IconBox,
  IconUsers,
  IconReceipt,
} from "./icons";

export type NavKey =
  | "dashboard"
  | "course"
  | "sculptor"
  | "achievements"
  | "leaderboard"
  | "library"
  | "bonuses"
  | "admin"
  | "admin-products"
  | "admin-users"
  | "admin-orders";

const COURSE = "/courses/candlestick-mastery";

const STUDENT = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", Icon: IconDashboard },
  { key: "course", label: "My Course", href: COURSE, Icon: IconCourse },
  { key: "bonuses", label: "My Bonuses", href: "/bonuses", Icon: IconGift },
  { key: "sculptor", label: "Candle Sculptor", href: `${COURSE}/sculptor`, Icon: IconSculptor },
  { key: "achievements", label: "Achievements", href: "/achievements", Icon: IconTrophy },
  { key: "library", label: "Library", href: "/library", Icon: IconLibrary },
] as const;

const ADMIN = [
  { key: "admin", label: "Overview", href: "/admin", Icon: IconGauge },
  { key: "admin-products", label: "Products", href: "/admin/products", Icon: IconBox },
  { key: "admin-users", label: "Students", href: "/admin/users", Icon: IconUsers },
  { key: "admin-orders", label: "Orders", href: "/admin/orders", Icon: IconReceipt },
] as const;

export default function Sidebar({
  active,
  isAdmin,
}: {
  active: NavKey;
  isAdmin: boolean;
}) {
  return (
    <aside className="sidebar">
      <Link href="/dashboard" className="sidebar-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/finrise-mark.svg" alt="Finrise" style={{ width: 26, height: 28, flexShrink: 0 }} />
        <span className="brandmark" style={{ fontSize: 19 }}>
          Finrise
        </span>
      </Link>

      <div className="nav-group-label">Learn</div>
      {STUDENT.map(({ key, label, href, Icon }) => (
        <Link key={key} href={href} className={`nav-item ${active === key ? "active" : ""}`}>
          <Icon />
          <span>{label}</span>
        </Link>
      ))}

      {isAdmin && (
        <>
          <div className="nav-group-label">Admin</div>
          {ADMIN.map(({ key, label, href, Icon }) => (
            <Link key={key} href={href} className={`nav-item ${active === key ? "active" : ""}`}>
              <Icon />
              <span>{label}</span>
            </Link>
          ))}
        </>
      )}
    </aside>
  );
}
