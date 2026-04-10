import { motion } from 'framer-motion';
import { pageVariants } from '../utils/motionVariants';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="max-w-3xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-main">Profile</h1>
        <p className="text-sm text-text-muted mt-1">Manage your account settings and preferences.</p>
      </header>

      <div className="bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-2xl shadow-premium dark:shadow-premium-dark overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-900 border-b border-border-subtle">
        </div>
        <div className="p-6 relative">
          <div className="absolute -top-12 left-6 w-24 h-24 rounded-2xl bg-surface-light dark:bg-surface-dark border-4 border-background-light dark:border-background-dark flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          
          <div className="mt-14 mb-6">
            <h2 className="text-2xl font-bold text-text-main">{user?.name || 'User'}</h2>
            <p className="text-sm text-text-muted flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" /> {user?.email || 'user@example.com'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border-subtle rounded-xl hover:border-primary-500/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <User className="w-5 h-5 text-text-main" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-text-main">Personal Information</h4>
                  <p className="text-xs text-text-muted">Update your name and phone</p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary-500 hover:text-primary-600">Edit</button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border-subtle rounded-xl hover:border-primary-500/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-text-main" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-text-main">Security</h4>
                  <p className="text-xs text-text-muted">Update password and 2FA</p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary-500 hover:text-primary-600">Manage</button>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-border-subtle">
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
