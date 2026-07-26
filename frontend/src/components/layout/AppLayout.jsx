import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Header />
        <main className="p-8 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
