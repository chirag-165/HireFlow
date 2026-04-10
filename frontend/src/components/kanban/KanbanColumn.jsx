import { Plus } from "lucide-react";
import JobCard from "./JobCard";

export default function KanbanColumn({ column, jobs, onAdd, onStatusChange, onDelete, statuses }) {
  return (
    <section className="glass-card flex min-h-[60vh] w-[300px] min-w-[300px] flex-col p-3">
      <div className="mb-3 border-t-2 pt-2" style={{ borderColor: column.color }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">{column.label}</h3>
            <span className="rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: "var(--color-border)" }}>
              {jobs.length}
            </span>
          </div>
          <button className="interactive cursor-pointer rounded-md p-1 opacity-0 transition hover:bg-white/10 group-hover:opacity-100" onClick={onAdd}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="scroll-hide flex flex-1 flex-col gap-2 overflow-y-auto">
        {jobs.length ? jobs.map((job) => <JobCard key={job._id} job={job} onStatusChange={onStatusChange} onDelete={onDelete} statuses={statuses} />) : (
          <div className="rounded-lg border border-dashed p-4 text-center text-xs text-[var(--color-text-muted)]" style={{ borderColor: "var(--color-border)" }}>
            No jobs in this stage yet
          </div>
        )}
      </div>
    </section>
  );
}
