import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '../utils/motionVariants';
import { Plus, MoreVertical, Trash2, X, Briefcase, ExternalLink, Calendar } from 'lucide-react';
import { getApplications, createApplication, deleteApplication, updateApplication } from '../services/api';
import { useApps } from '../context/ApplicationContext';

const initialColumns = [
  { id: 'Applied', title: 'Applied' },
  { id: 'Interview', title: 'Interview' },
  { id: 'Offer', title: 'Offer' },
  { id: 'Rejected', title: 'Rejected' }
];


export default function Application() {
  const { applications: jobs, setApplications: setJobs, updateApplicationStatus } = useApps();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    notes: ''
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newApp = await createApplication(form);
      setJobs(prev => [...prev, newApp]);
      setShowModal(false);
      setForm({ company: '', role: '', status: 'Applied', notes: '' });
    } catch (err) {
      console.error('Create error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      console.log("Current jobs:", jobs);
      console.log("Deleting ID:", id);
      await deleteApplication(id);
      
      // Update global state
      setJobs(prev => prev.filter(job => job._id !== id));
      
      console.log("Deletion successful");
    } catch (err) {
      console.error('Delete error:', err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      updateApplicationStatus(id, newStatus);
    } catch (err) {
      console.error('Update error:', err.message);
    }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="h-full flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Tracker</h1>
          <p className="text-sm text-text-muted">Drag & drop to update your application status.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-primary-500/20 font-medium text-sm flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </header>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scroll-hide">
        {initialColumns.map((col) => {
          const columnJobs = jobs.filter(j => j.status === col.id);
          return (
            <div key={col.id} className="w-80 min-w-[20rem] flex flex-col">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted">{col.title}</h3>
                  <span className="text-xs bg-surface-dark border border-border-subtle text-text-muted px-2 py-0.5 rounded-full font-medium">
                    {columnJobs.length}
                  </span>
                </div>
                <button onClick={() => setShowModal(true)} className="p-1 hover:bg-surface-dark rounded transition-colors text-text-muted">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Column Body */}
              <div className="flex-1 bg-surface-dark/30 dark:bg-surface-dark/50 rounded-2xl p-3 border border-border-subtle border-dashed shadow-inner flex flex-col gap-3 overflow-y-auto min-h-[500px]">
                {columnJobs.map(job => (
                  <motion.div
                    layoutId={`job-${job._id}`}
                    key={job._id}
                    className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-subtle shadow-sm hover:shadow-md hover:border-primary-500/50 cursor-grab active:cursor-grabbing group transition-all relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${job.color}`} />
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <h4 className="font-bold text-text-main text-base">{job.company}</h4>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-text-muted hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-text-muted pl-2">{job.role}</p>

                    <div className="mt-4 flex flex-col gap-3 pl-2">
                      <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(job._id, e.target.value)}
                        className="w-full bg-surface-dark border border-border-subtle rounded-lg py-1 px-2 text-xs text-text-muted focus:border-primary-500 focus:outline-none transition-all cursor-pointer"
                      >
                        {initialColumns.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-text-muted flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                        {job.status === 'Offer' && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Offer Received</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Add Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-background-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-surface-dark rounded-full text-text-muted transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-2xl font-bold mb-6">Add Application</h2>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-muted">Company Name</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 px-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                    placeholder="e.g. Google, Stripe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-muted">Job Role</label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 px-4 focus:outline-none focus:border-primary-500 text-sm transition-all"
                    placeholder="e.g. Frontend Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-muted">Current Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 px-4 focus:outline-none focus:border-primary-500 text-sm transition-all cursor-pointer"
                  >
                    {initialColumns.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-muted">Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-2.5 px-4 focus:outline-none focus:border-primary-500 text-sm transition-all resize-none"
                    placeholder="Any specific details..."
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 px-4 border border-border-subtle rounded-xl text-sm font-medium hover:bg-surface-dark transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleCreate}
                    className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 active:scale-95 transition-all disabled:opacity-70"
                  >
                    {loading ? 'Adding...' : 'Create Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}