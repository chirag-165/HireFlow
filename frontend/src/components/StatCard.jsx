import { motion } from 'framer-motion';

export default function StatCard({ title, value, trend, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-subtle shadow-premium dark:shadow-premium-dark flex items-start justify-between group hover:border-primary-500/50 transition-colors"
    >
      <div>
        <h3 className="text-sm font-medium text-text-muted mb-1">{title}</h3>
        <p className="text-3xl font-bold tracking-tight text-text-main">{value}</p>
        <p className={`text-sm mt-3 font-medium ${trend.startsWith('+') ? 'text-primary-600 dark:text-primary-400' : 'text-text-muted'}`}>
          {trend}
        </p>
      </div>
      {Icon && (
        <div className="p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </motion.div>
  );
}