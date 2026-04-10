import { NavLink } from "react-router-dom";
import { LayoutDashboard, KanbanSquare, Activity, ChartColumn, MessageSquare, Settings, BriefcaseBusiness, LogOut, ChevronLeft, CreditCard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/applications", label: "Kanban Board", icon: KanbanSquare },
  { to: "/activity", label: "Activity Feed", icon: Activity },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/pricing", label: "Pricing", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const width = collapsed ? 64 : 220;

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen flex-col border-r p-2" style={{ width, borderColor: "var(--color-border)", background: "var(--color-sidebar-bg)" }}>
      <button className="interactive mb-4 flex items-center gap-2 rounded-lg p-2 text-left" onClick={onToggle}>
        <BriefcaseBusiness className="h-5 w-5" />
        {!collapsed ? <span className="font-semibold">HireFlow</span> : null}
        <ChevronLeft className={`ml-auto h-4 w-4 transition ${collapsed ? "rotate-180" : ""}`} />
      </button>
      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `interactive flex items-center gap-2 rounded-lg border-l-2 px-2 py-2 text-sm ${isActive ? "bg-white/5" : "border-transparent"}`
              }
              style={({ isActive }) => ({ borderLeftColor: isActive ? "var(--color-cta)" : "transparent" })}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed ? <span>{item.label}</span> : null}
            </NavLink>
          );
        })}
      </nav>
      <button className="interactive glass-card mt-4 flex items-center gap-2 p-2 text-left" onClick={logout}>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">{user?.name?.[0]?.toUpperCase() || "U"}</div>
        {!collapsed ? <span className="truncate text-sm">{user?.name || "User"}</span> : null}
        {!collapsed ? <LogOut className="ml-auto h-4 w-4" /> : null}
      </button>
    </aside>
  );
}
