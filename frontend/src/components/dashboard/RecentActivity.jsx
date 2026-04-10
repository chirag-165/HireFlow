import GlassCard from "../ui/GlassCard";

export default function RecentActivity({ items = [] }) {
  return (
    <GlassCard className="p-4">
      <h3 className="mb-3 text-sm font-semibold">Recent Activity</h3>
      {items.length ? (
        <div className="space-y-2">
          {items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-lg border p-2 text-sm" style={{ borderColor: "var(--color-border)" }}>
              <p>{item.text}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.company}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]">No activity yet</p>
      )}
    </GlassCard>
  );
}
