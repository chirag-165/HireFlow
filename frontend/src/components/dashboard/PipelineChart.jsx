import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import GlassCard from "../ui/GlassCard";

export default function PipelineChart({ data }) {
  return (
    <GlassCard className="p-4">
      <h3 className="mb-3 text-sm font-semibold">Applications Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="Applied" stackId="a" fill="var(--color-status-applied)" />
            <Bar dataKey="Interview" stackId="a" fill="var(--color-status-interviewing)" />
            <Bar dataKey="Offer" stackId="a" fill="var(--color-status-offer)" />
            <Bar dataKey="Rejected" stackId="a" fill="var(--color-status-rejected)" />
            <Bar dataKey="Saved" stackId="a" fill="var(--color-status-saved)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
