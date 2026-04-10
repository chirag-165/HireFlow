import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useAuth } from '../context/AuthContext';

export default function MainLayout() {
  const { user, loading } = useAuth();

  if (loading) return null; // Avoid flashing login content

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-bg-base transition-colors duration-300 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Topbar />
        {/* Decorative subtle background elements for premium feel */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl pointer-events-none" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-8 sm:px-8 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
