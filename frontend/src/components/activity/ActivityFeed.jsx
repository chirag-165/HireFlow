import { useMemo, useState } from "react";
import { Clock3 } from "lucide-react";
import { useApps } from "../../context/ApplicationContext";

function dateGroupLabel() {
  return "Today";
}

export default function ActivityFeed() {
  const { activities } = useApps();
  const [visible, setVisible] = useState(10);

  const grouped = useMemo(() => {
    const set = {};
    activities.slice(0, visible).forEach((a) => {
      const key = dateGroupLabel(a.time);
      if (!set[key]) set[key] = [];
      set[key].push(a);
    });
    return set;
  }, [activities, visible]);

  if (!activities.length) {
    return (
      <div className="glass-card mx-auto max-w-2xl p-8 text-center">
        <Clock3 className="mx-auto mb-2 h-8 w-8 text-[var(--color-text-muted)]" />
        <p className="text-sm text-[var(--color-text-muted)]">No activity yet</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">Activity Feed</h1>
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-5">
          <h2 className="mb-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{date}</h2>
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 h-full w-px bg-white/10" />
            <div className="space-y-2">
              {items.map((item) => (
                <article key={item.id} className="glass-card relative p-3" style={{ animation: "fade-in-down 150ms ease-out" }}>
                  <span className="absolute -left-[19px] top-4 h-2 w-2 rounded-full bg-[var(--color-status-applied)]" />
                  <p className="text-sm">
                    Moved {item.company} to {item.text.replace("Moved to ", "")}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{item.time}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      ))}
      {visible < activities.length ? (
        <button className="interactive cursor-pointer rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--color-border)" }} onClick={() => setVisible((v) => v + 10)}>
          Load more
        </button>
      ) : null}
    </section>
  );
}
