import { GripVertical, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";

function relativeDate(dateValue) {
  const ms = Date.now() - new Date(dateValue || Date.now()).getTime();
  const days = Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)));
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function JobCard({ job, onStatusChange, onDelete, statuses }) {
  const statusColor = statuses.find((s) => s.id === job.status)?.color || "var(--color-secondary)";
  return (
    <article className="interactive glass-card group relative overflow-hidden p-3 cursor-pointer">
      <div className="absolute left-0 top-0 h-full w-1" style={{ background: statusColor }} />
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold">{job.company}</h4>
          <p className="text-xs text-[var(--color-text-muted)]">{job.role}</p>
        </div>
        <button
          type="button"
          className="cursor-pointer rounded-md p-1 opacity-0 transition hover:bg-white/10 group-hover:opacity-100"
          aria-label="Delete application"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(job._id);
          }}
        >
          <Trash2 className="h-4 w-4 text-[var(--color-status-rejected)]" />
        </button>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <Badge color={statusColor}>{job.status}</Badge>
        <span className="text-xs text-[var(--color-text-muted)]">{relativeDate(job.createdAt)}</span>
      </div>
      <div className="mb-2 flex gap-2">
        {job.location ? <span className="rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: "var(--color-border)" }}>{job.location}</span> : null}
        {job.salary ? <span className="rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: "var(--color-border)" }}>{job.salary}</span> : null}
      </div>
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 opacity-0 transition group-hover:opacity-60" />
        <select
          className="cursor-pointer rounded-md border bg-transparent px-2 py-1 text-xs"
          style={{ borderColor: "var(--color-border)" }}
          value={job.status}
          onChange={(e) => onStatusChange(job._id, e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}
