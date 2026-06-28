import { getCurrentUser } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

// Premium SaaS dashboard frame: fixed dark sidebar + light (slate-50) viewport.
export default async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const email = user?.email ?? "";
  const initial = (user?.name || email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <AdminSidebar />
      <div className="lg:pl-[260px]">
        <AdminTopbar initial={initial} email={email} />
        <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
