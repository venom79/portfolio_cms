import { Bell, Menu } from "lucide-react";

import UserDropdown from "./UserDropdown";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden">
          <Menu />
        </button>

        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      </div>
    </header>
  );
};

export default Navbar;
