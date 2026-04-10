import GlassCard from "../ui/GlassCard";
import Skeleton from "../ui/Skeleton";

export default function KPICard({ title, value, subtitle, loading }) {
  return (
    <GlassCard className="p-4">
      <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{title}</p>
      {loading ? <Skeleton className="mt-2 h-8 w-20" /> : <p className="mt-2 text-2xl font-semibold">{value}</p>}
      <p className="mt-1 text-xs text-[var(--color-text-muted)]">{subtitle}</p>
    </GlassCard>
  );
}
