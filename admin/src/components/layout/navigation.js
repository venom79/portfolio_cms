import { LayoutDashboard, User, FolderGit2, MapPinned } from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    title: "Trail Markers",
    href: "/milestones",
    icon: MapPinned,
  },
];
