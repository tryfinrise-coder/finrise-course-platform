import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getStats } from "@/lib/gamification";
import { logoutAction } from "@/app/actions/auth";
import StreakFlame from "@/components/game/StreakFlame";
import SoundToggle from "@/components/game/SoundToggle";

// Session-aware top navigation (server component). For logged-in users it also
// surfaces their level + streak so the gamification is always in view.
export default async function TopNav() {
  const user = await getCurrentUser();
  const stats = user ? await getStats(user.id) : null;

  return (
    <nav className="topnav">
      <Link href={user ? "/dashboard" : "/"} className="brandmark">
        Finrise
      </Link>
      <div className="links">
        {user ? (
          <>
            {stats && (
              <>
                <span className="chip chip-level" title={`Level ${stats.level}`}>
                  Lv {stats.level}
                </span>
                <StreakFlame streak={stats.current_streak} />
              </>
            )}
            <Link href="/dashboard" className="btn btn-ghost tap">
              Dashboard
            </Link>
            <Link href="/library" className="btn btn-ghost tap">
              Library
            </Link>
            {user.role === "admin" && (
              <Link href="/admin" className="btn btn-ghost tap">
                Admin
              </Link>
            )}
            <SoundToggle />
            <form action={logoutAction}>
              <button className="btn tap" type="submit">
                Log out
              </button>
            </form>
          </>
        ) : (
          <>
            <SoundToggle />
            <Link href="/pages/candlestick-mastery" className="btn btn-ghost tap">
              The Course
            </Link>
            <Link href="/courses/login" className="btn btn-primary tap">
              Log in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
