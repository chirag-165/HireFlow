import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Lock, Briefcase, ArrowRight, 
  GraduationCap, Clock, Target, Layers 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { register as registerAPI } from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    education: '',
    experience: '',
    currentRole: '',
    targetRole: '',
    domain: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formDatas = new FormData();
      Object.keys(formData).forEach((key) => {
      formDatas.append(key, formData[key]);
      });
      const response = await registerAPI(formDatas);
      login({ name: formData.name, email: formData.email }, response?.token || 'fake_token');
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden py-12">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 -ml-64 -mt-64 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-64 -mb-64 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full" // Increased from max-w-md to max-w-xl to support the grid
      >
        <div className="flex justify-center mb-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-600/40 rotate-3">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-text-main block">Create Account</span>
              <p className="text-xs text-text-muted max-w-[240px]">Join 5,000+ professionals tracking their career growth.</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-3xl p-8 shadow-premium dark:shadow-premium-dark backdrop-blur-xl relative z-10 overflow-hidden">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Core Account Details (Full Width) */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Full name</label>
                <div className="relative">
                  <input 
                    name="name" type="text" value={formData.name} onChange={handleChange} required
                    placeholder="e.g., Alex Smith"
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                  />
                  <User className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Email</label>
                  <div className="relative">
                    <input 
                      name="email" type="email" value={formData.email} onChange={handleChange} required
                      placeholder="name@company.com"
                      className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm"
                    />
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Password</label>
                  <div className="relative">
                    <input 
                      name="password" type="password" value={formData.password} onChange={handleChange} required
                      placeholder="Create a strong password"
                      className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm"
                    />
                    <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border-subtle my-2"></div>

            {/* Section 2: Professional Profile (Grid Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Education</label>
                <div className="relative">
                  <input 
                    name="education" type="text" value={formData.education} onChange={handleChange} required
                    placeholder="e.g., B.Tech Computer Science"
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                  />
                  <GraduationCap className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Experience</label>
                <div className="relative">
                  <input 
                    name="experience" type="text" value={formData.experience} onChange={handleChange} required
                    placeholder="e.g., Fresher or 2 years"
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                  />
                  <Clock className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Current Role</label>
                <div className="relative">
                  <input 
                    name="currentRole" type="text" value={formData.currentRole} onChange={handleChange} required
                    placeholder="e.g., Software Engineer"
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                  />
                  <Briefcase className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1.5">Target Role</label>
                <div className="relative">
                  <input 
                    name="targetRole" type="text" value={formData.targetRole} onChange={handleChange} required
                    placeholder="e.g., DevOps Engineer"
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                  />
                  <Target className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-main mb-1.5">Domain / Industry</label>
                <div className="relative">
                  <input 
                    name="domain" type="text" value={formData.domain} onChange={handleChange} required
                    placeholder="e.g., Cloud Infrastructure, Fintech"
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                  />
                  <Layers className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            {/* Section 3: Footer Actions */}
            <div className="pt-4 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" required className="w-4 h-4 rounded border-border-subtle bg-background-light dark:bg-background-dark text-primary-600 focus:ring-primary-500" />
                <span className="text-xs text-text-muted group-hover:text-text-main transition-colors">
                  I agree to the <a href="#" className="font-bold text-primary-500">Terms of Service</a> and <a href="#" className="font-bold text-primary-500">Privacy Policy</a>
                </span>
              </label>

              {error && (
                <p className="text-rose-500 text-xs bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">{error}</p>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary-600/30 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? 'Creating account...' : (
                  <>
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-text-muted mt-8">
          Already have an account? <Link to="/login" className="font-bold text-primary-500 hover:text-primary-600">Sign in </Link>
        </p>
      </motion.div>
    </div>
  );
}