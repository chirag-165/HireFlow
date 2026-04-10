import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AddJobModal from "../kanban/AddJobModal";

export default function AppShell() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 220;
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <Topbar onAdd={() => setOpen(true)} sidebarWidth={sidebarWidth} />
      <main className="min-h-screen pt-14" style={{ paddingLeft: sidebarWidth }}>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      <AddJobModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
