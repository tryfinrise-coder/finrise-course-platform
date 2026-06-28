"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_GROUPS } from "./nav";

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col bg-[#0E1B2E] lg:flex">
      {/* brand */}
      <Link href="/admin" className="flex items-center gap-3 px-5 py-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow-lg shadow-black/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/finrise-mark.svg" alt="Finrise" className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <div className="text-[15px] font-bold tracking-tight text-white">Finrise</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">Admin</div>
        </div>
      </Link>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {ADMIN_GROUPS.map((group) => (
          <div key={group.title} className="mb-1 mt-4 first:mt-1">
            <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon, exact, activeIcon, activeBg }) => {
                const active = isActive(href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "group/item flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                      active
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-md transition-colors",
                        active ? activeBg : "bg-transparent"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-[16px] w-[16px] transition-colors",
                          active ? activeIcon : "text-slate-500 group-hover/item:text-slate-300"
                        )}
                      />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* footer */}
      <div className="border-t border-slate-800 px-5 py-4">
        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
          <ShieldCheck className="h-4 w-4 text-slate-600" />
          Management console
        </div>
      </div>
    </aside>
  );
}
