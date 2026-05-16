import { useState } from "react";

import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
