import {
  LayoutDashboard,
  Package,
  Layers,
  GraduationCap,
  UserCog,
  Ticket,
  CreditCard,
  Settings,
  BarChart2,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  // explicit Tailwind classes (kept literal so JIT never purges them)
  activeIcon: string; // icon color when active
  activeBg: string; // soft tint behind the icon when active
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const ADMIN_GROUPS: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true, activeIcon: "text-sky-400", activeBg: "bg-sky-500/15" },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart2, activeIcon: "text-emerald-400", activeBg: "bg-emerald-500/15" },
    ],
  },
  {
    title: "Commerce",
    items: [
      { label: "Products", href: "/admin/products", icon: Package, activeIcon: "text-violet-400", activeBg: "bg-violet-500/15" },
      { label: "Bundles", href: "/admin/bundles", icon: Layers, activeIcon: "text-amber-400", activeBg: "bg-amber-500/15" },
      { label: "Discounts", href: "/admin/discounts", icon: Ticket, activeIcon: "text-orange-400", activeBg: "bg-orange-500/15" },
      { label: "Payments", href: "/admin/orders", icon: CreditCard, activeIcon: "text-emerald-400", activeBg: "bg-emerald-500/15" },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Students", href: "/admin/users", icon: GraduationCap, activeIcon: "text-blue-400", activeBg: "bg-blue-500/15" },
      { label: "Team", href: "/admin/team", icon: UserCog, activeIcon: "text-pink-400", activeBg: "bg-pink-500/15" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings, activeIcon: "text-slate-300", activeBg: "bg-slate-500/20" },
    ],
  },
];

// flat list (used by the mobile menu)
export const ADMIN_NAV: AdminNavItem[] = ADMIN_GROUPS.flatMap((g) => g.items);
