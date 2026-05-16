import { useState } from "react";

import { Menu } from "lucide-react";

import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex bg-slate-950 min-h-screen">
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <div
        className={`
          fixed lg:relative z-50 lg:z-auto
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-auto w-full">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="bg-[#111827] border border-slate-800 p-3 rounded-xl text-white"
          >
            <Menu size={20} />
          </button>
        </div>

        <Topbar />

        {children}
      </main>
    </div>
  );
}
