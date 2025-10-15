import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout() {
  return (
    <div className="flex h-dvh bg-[var(--background)] text-[var(--foreground)] antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main
          className="
            flex-1
            px-6 py-10 
            md:px-10 md:py-12
            overflow-x-hidden overflow-y-visible
            bg-[var(--background)]
          "
        >
          <div className="max-w-7xl mx-auto w-full space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
