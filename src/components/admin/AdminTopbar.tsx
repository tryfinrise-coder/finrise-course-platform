"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { ADMIN_NAV } from "./nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminTopbar({ initial, email }: { initial: string; email: string }) {
  const pathname = usePathname();
  const current =
    [...ADMIN_NAV].sort((a, b) => b.href.length - a.href.length).find((n) =>
      n.exact ? pathname === n.href : pathname === n.href || pathname.startsWith(n.href + "/")
    ) || ADMIN_NAV[0];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* mobile menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-500/40 lg:hidden">
          <Menu className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {ADMIN_NAV.map(({ label, href, icon: Icon }) => (
            <DropdownMenuItem key={href} asChild>
              <Link href={href} className="flex items-center gap-2">
                <Icon className="h-4 w-4" /> {label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex flex-col">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Admin</span>
        <h1 className="-mt-0.5 text-[17px] font-bold tracking-tight text-slate-900">{current.label}</h1>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-2.5 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-500/40">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[13px] font-bold text-white">
              {initial}
            </span>
            <span className="hidden max-w-[160px] truncate text-sm font-medium text-slate-700 sm:block">
              {email}
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="truncate">{email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form action={logoutAction}>
              <button type="submit" className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-rose-600 hover:bg-rose-50">
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
