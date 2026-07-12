import { NavLink } from "react-router-dom";

const NavItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
        ${
          isActive
            ? "bg-violet-600 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon size={20} strokeWidth={2} />

      <span className="font-medium">{item.title}</span>
    </NavLink>
  );
};

export default NavItem;
