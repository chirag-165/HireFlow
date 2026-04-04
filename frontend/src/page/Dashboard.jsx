import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api.js";
import StatCard from '../component/StatCard.jsx';
import SectionCard from "../component/SectionCard.jsx";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAnalytics();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white space-y-6">
      
      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Applications" value={data.total} color="text-blue-400" />
        <StatCard title="Interviews" value={data.interviews} color="text-yellow-400" />
        <StatCard title="Offers" value={data.offers} color="text-green-400" />
        <StatCard title="Rejected" value={data.rejected} color="text-red-400" />
      </div>

      {/* 🔥 CONVERSION */}
      <SectionCard title="Conversion Rate">
        <p className="text-3xl font-bold text-blue-400">
          {data.conversionRate}%
        </p>
      </SectionCard>

      {/* 🔥 WEEKLY */}
      <SectionCard title="Weekly Insights">
        <p>Applications: {data.weekly.applications}</p>
        <p>Interviews: {data.weekly.interviews}</p>
      </SectionCard>

      {/* 🔥 TOP COMPANIES */}
      <SectionCard title="Top Companies">
        {data.topCompanies.map((c, i) => (
          <div key={i} className="flex justify-between border-b border-gray-700 py-2">
            <span>{c.company}</span> 
            -
            <span>{c.count}</span>
          </div>
        ))}
      </SectionCard>

      {/* 🔥 RECENT */}
      <SectionCard title="Recent Applications">
        {data.recent.map((app) => (
          <div key={app._id} className="border-b border-gray-700 py-2">
            <p className="font-semibold">{app.company}</p>
            <p className="text-sm text-gray-400">{app.role}</p>
            <p className="text-xs text-gray-500">{app.status}</p>
          </div>
        ))}
      </SectionCard>

    </div>
  );
};

export default Dashboard;