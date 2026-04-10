import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import GlassCard from "../ui/GlassCard";

const colors = ["var(--color-status-applied)", "var(--color-status-interviewing)", "var(--color-status-offer)", "var(--color-status-rejected)", "var(--color-status-saved)"];

export default function StatusDonut({ data }) {
  return (
    <GlassCard className="p-4">
      <h3 className="mb-3 text-sm font-semibold">Pipeline Breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2} dataKey="value">
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
