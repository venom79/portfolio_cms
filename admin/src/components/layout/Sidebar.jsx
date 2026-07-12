import { LogOut, Mountain } from "lucide-react";

import NavItem from "./NavItem";
import { navigation } from "./navigation";

import { logout } from "@/services/auth.service";

const Sidebar = () => {
  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-900 text-white">
      <div className="border-b border-slate-800 px-8 py-7">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-2">
            <Mountain size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Portfolio CMS</h1>

            <p className="text-xs text-slate-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {navigation.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-800 p-5">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-800 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-semibold">
            AG
          </div>

          <div>
            <h3 className="font-medium">Aditya Gaonkar</h3>
            <p className="text-sm text-slate-400">Administrator</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="
    flex
    w-full
    items-center
    gap-3
    rounded-xl
    px-4
    py-3
    text-slate-300
    transition
    hover:bg-red-500/10
    hover:text-red-400
  "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
