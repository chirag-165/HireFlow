import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants } from '../utils/motionVariants';
import StatCard from '../components/StatCard';
import { Briefcase, Send, CheckCircle, TrendingUp } from 'lucide-react';
import { getStats } from '../services/api';
import { useApps } from '../context/ApplicationContext';
import ConversionChart from '../components/ConversionChart';

export default function Dashboard() {
  const [stats, setData] = useState(null);
  const { activities } = useApps();

      const fetchData = async () => {
    try {
      const res = await getStats();
      setData(res);
    } catch (err) {
      console.error(err);
  }
};


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-main">Welcome back!</h1>
          <p className="text-sm text-text-muted mt-1">Here's what's happening with your job search.</p>
        </div>
        <button className="hidden sm:flex bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary-500/20 transition-all font-medium text-sm items-center gap-2">
          <TrendUpIcon /> Generate Report
        </button>
      </header>
      
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Applications" value={stats?.total || '-'} trend="+12 this month" icon={Send} delay={0.1} />
        <StatCard title="Active Interviews" value={stats?.interviews || '-'} trend="2 pending feedback" icon={Briefcase} delay={0.2} />
        <StatCard title="Offers Received" value={stats?.offers || '-'} trend="Highest: $140k" icon={CheckCircle} delay={0.3} />
        <StatCard title="Rejected" value={stats?.rejected || '-'} trend="Highest: $140k" icon={TrendingUp} delay={0.4} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-2xl shadow-premium dark:shadow-premium-dark p-6 h-[400px] flex flex-col relative overflow-hidden">

          <h3 className="text-lg font-bold mb-4 z-10 relative">Application Activity</h3>

          <div className="flex-1 flex items-center justify-center relative z-10 glass rounded-xl border border-dashed border-border-subtle">

            <div className='mr-25'>
              <h3 className="text-md font-medium text-text-muted mb-1">Success Rate</h3>
              <p className="text-3xl font-bold">{stats?.conversionRate}%</p>
              <span className="text-s text-emerald-500 font-medium">+2.4% from last week</span>
            </div>  
  
            {/* Chart Container */}
            <div className="w-50 h-50 ml-10">
              <ConversionChart rate={stats?.conversionRate} />
            </div>

          </div>

        </div>

        {/* Recent Activity Sidebar */}
        <div className="bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-2xl shadow-premium dark:shadow-premium-dark p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="flex-1 space-y-4">
            {activities.length === 0 ? (
        <p className="text-zinc-500 text-sm text-center py-4">No recent activity</p>
      ) : (
            activities.map((activity) =>(
              <div key={activity.id} className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <div>
                  <p className="text-sm font-medium text-text-main">{activity.text}</p>
                  <p className="text-xs text-text-muted">{activity.company}</p>
                  <p className="text-xs text-text-muted mt-0.5">{activity.time}</p>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TrendUpIcon() {
  return <TrendingUp className="w-4 h-4" />;
}