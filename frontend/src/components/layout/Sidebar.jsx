import { NavLink } from "react-router-dom";
import { LayoutDashboard, UserRound, Swords, MapPin, LogOut } from "lucide-react";
import { NAV_ITEMS } from "../../lib/constants";
import { useAuth } from "../../hooks/useAuth";

const ICONS = {
  dashboard: LayoutDashboard,
  profile: UserRound,
  projects: Swords,
  milestones: MapPin,
};

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-canvas-dim/25 bg-ink-light/40 flex flex-col">
      <div className="px-6 py-6 border-b border-canvas-dim/25">
        <p className="font-stamp text-amber-bright text-xs tracking-wide2">EST. BASE CAMP</p>
        <h1 className="font-display tracking-wide2 uppercase text-2xl text-canvas leading-tight">
          Command<br />Center
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.key];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-display tracking-wide2 uppercase text-sm transition-colors border-l-2 ${
                  isActive
                    ? "border-amber text-amber-bright bg-amber/10"
                    : "border-transparent text-canvas-dim hover:text-canvas hover:bg-ink-lighter"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-canvas-dim/25">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2.5 font-display tracking-wide2 uppercase text-sm text-canvas-dim hover:text-rust-bright transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
