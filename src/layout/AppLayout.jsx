import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text)] antialiased">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
