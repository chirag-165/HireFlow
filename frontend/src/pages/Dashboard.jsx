import { useMemo } from "react";
import { useApps } from "../context/ApplicationContext";
import KPICard from "../components/dashboard/KPICard";
import PipelineChart from "../components/dashboard/PipelineChart";
import StatusDonut from "../components/dashboard/StatusDonut";
import RecentActivity from "../components/dashboard/RecentActivity";
import GlassCard from "../components/ui/GlassCard";

export default function Dashboard() {
  const { applications, activities, loading } = useApps();
  const total = applications.length;
  const active = applications.filter((a) => a.status !== "Rejected").length;
  const interviewRate = total ? Math.round((applications.filter((a) => a.status === "Interview").length / total) * 100) : 0;
  const offerRate = total ? Math.round((applications.filter((a) => a.status === "Offer").length / total) * 100) : 0;

  const donutData = useMemo(
    () => ["Applied", "Interview", "Offer", "Rejected", "Saved"].map((key) => ({ name: key, value: applications.filter((a) => a.status === key).length })),
    [applications]
  );
  const chartData = useMemo(
    () => [{ week: "W1", Applied: 4, Interview: 2, Offer: 1, Rejected: 1, Saved: 2 }, { week: "W2", Applied: 3, Interview: 3, Offer: 1, Rejected: 2, Saved: 1 }, { week: "W3", Applied: 5, Interview: 2, Offer: 2, Rejected: 2, Saved: 2 }, { week: "W4", Applied: 2, Interview: 4, Offer: 1, Rejected: 1, Saved: 3 }],
    []
  );
  const topCompanies = useMemo(() => {
    const map = {};
    applications.forEach((a) => {
      map[a.company] = (map[a.company] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [applications]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-3 md:grid-cols-4">
        <KPICard loading={loading} title="Total Applications" value={total} subtitle="All time" />
        <KPICard loading={loading} title="Active Pipeline" value={active} subtitle="Non-rejected" />
        <KPICard loading={loading} title="Interview Rate" value={`${interviewRate}%`} subtitle="Applied to Interview" />
        <KPICard loading={loading} title="Offer Rate" value={`${offerRate}%`} subtitle="Offer conversion" />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="lg:col-span-3"><PipelineChart data={chartData} /></div>
        <div className="lg:col-span-2"><StatusDonut data={donutData} /></div>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <RecentActivity items={activities} />
        <GlassCard className="p-4">
          <h3 className="mb-3 text-sm font-semibold">Top Companies</h3>
          <div className="space-y-2">
            {topCompanies.length ? topCompanies.map(([name, count], idx) => (
              <div key={name} className="flex items-center justify-between rounded-lg border p-2" style={{ borderColor: "var(--color-border)" }}>
                <span className="text-sm">{idx + 1}. {name}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{count} apps</span>
              </div>
            )) : <p className="text-sm text-[var(--color-text-muted)]">No company data yet</p>}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}