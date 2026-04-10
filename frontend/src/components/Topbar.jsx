import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-border-subtle dark:border-border-subtle flex items-center justify-between px-4 sm:px-6 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-text-muted hover:text-text-main">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 rounded-full text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
        </button>

        <div onClick={() => navigate('/profile')} className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 border border-primary-200 dark:border-primary-800 flex items-center justify-center font-bold text-primary-700 dark:text-primary-400 text-sm overflow-hidden">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
    </header>
  );
}
