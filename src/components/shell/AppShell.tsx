import { getCurrentUser } from "@/lib/auth";
import { getStats } from "@/lib/gamification";
import Sidebar, { type NavKey } from "./Sidebar";
import MobileTabBar from "./MobileTabBar";
import UserMenu from "./UserMenu";
import { IconMenu } from "./icons";
import StreakFlame from "@/components/game/StreakFlame";
import SoundToggle from "@/components/game/SoundToggle";

// The authenticated app shell: fixed sidebar + sticky topbar + content area.
// Used by every student and admin page so navigation and identity are
// consistent everywhere. Responsive: the sidebar becomes a no-JS drawer on
// small screens (CSS checkbox toggle).
export default async function AppShell({
  active,
  title,
  narrow = false,
  children,
}: {
  active: NavKey;
  title: string;
  narrow?: boolean;
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const stats = user ? await getStats(user.id) : null;
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="app">
      <input type="checkbox" id="navToggle" className="nav-toggle" aria-label="Toggle navigation menu" />
      <Sidebar active={active} isAdmin={user?.role === "admin"} />
      <label htmlFor="navToggle" className="scrim" aria-label="Close menu" />

      <div className="app-main">
        <header className="topbar">
          <label htmlFor="navToggle" className="hamburger" aria-label="Open menu">
            <IconMenu />
          </label>
          <div className="topbar-title">{title}</div>
          <div className="topbar-spacer" />
          <div className="topbar-tools">
            {stats && <StreakFlame streak={stats.current_streak} />}
            <SoundToggle />
            {user && (
              <UserMenu email={user.email} initial={initial} role={user.role} />
            )}
          </div>
        </header>

        <main className="content">
          {narrow ? <div className="content-narrow">{children}</div> : children}
        </main>
      </div>

      <MobileTabBar active={active} />
    </div>
  );
}
