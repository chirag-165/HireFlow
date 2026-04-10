import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, MessageSquare, CreditCard, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Applications', icon: Briefcase, path: '/applications' },
  { name: 'AI Assistant', icon: MessageSquare, path: '/chat' },
  { name: 'Pricing', icon: CreditCard, path: '/pricing' },
  { name: 'Profile', icon: User, path: '/profile' },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-surface-light dark:bg-surface-dark border-r border-border-subtle dark:border-border-subtle flex flex-col hidden md:flex transition-colors duration-300">
      <div className="h-16 flex items-center px-6 border-b border-border-subtle dark:border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">HireFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-500'
                  : 'text-text-muted hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-text-main dark:hover:text-text-main'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-subtle dark:border-border-subtle text-text-muted">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
