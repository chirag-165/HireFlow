import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ArrowRight, Briefcase, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { login as loginAPI } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Using API service directly
      const response = await loginAPI(email, password);
      // Simulating a success and storing token in context
      login({ name: email.split('@')[0], email }, response?.token || 'fake_token');
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for premium aesthetic */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/30">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-text-main">HireFlow</span>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-3xl p-8 shadow-premium dark:shadow-premium-dark backdrop-blur-xl relative z-10">
          <header className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-text-main">Welcome back</h1>
            <p className="text-sm text-text-muted mt-1">Please enter your details to sign in.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">Email address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm"
                  placeholder="name@company.com"
                  required
                />
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-text-main">Password</label>
                <a href="#" className="text-xs font-semibold text-primary-500 hover:text-primary-600">Forgot?</a>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm"
                  placeholder="••••••••"
                  required
                />
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs py-2.5 px-3 rounded-lg flex items-center gap-2"
              >
               <span className="w-1 h-1 bg-rose-500 rounded-full" /> {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-primary-600"
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign in <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social login removed due to missing icon dependencies in current build */}
        </div>

        <p className="text-center text-sm text-text-muted mt-8">
          Don't have an account? <Link to="/register" className="font-bold text-primary-500 hover:text-primary-600">Start for free</Link>
        </p>
      </motion.div>
    </div>
  );
}