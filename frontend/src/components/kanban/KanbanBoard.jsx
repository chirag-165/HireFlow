import { useState } from "react";
import { useApps } from "../../context/ApplicationContext";
import KanbanColumn from "./KanbanColumn";
import AddJobModal from "./AddJobModal";
import { KANBAN_COLUMNS } from "./kanbanConfig";
import { deleteApplication } from "../../services/api";

export default function KanbanBoard() {
  const { applications, updateApplicationStatus, setApplications } = useApps();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application? This cannot be undone.")) return;
    const snapshot = applications;
    setApplications((prev) => prev.filter((a) => a._id !== id));
    try {
      await deleteApplication(id);
    } catch (err) {
      console.error(err);
      setApplications(snapshot);
    }
  };

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Kanban Board</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Track every application stage with instant updates.</p>
      </div>
      <div className="scroll-hide flex gap-3 overflow-x-auto pb-2">
        {KANBAN_COLUMNS.map((column) => (
          <div key={column.id} className="group">
            <KanbanColumn
              column={column}
              jobs={applications.filter((app) => app.status === column.id)}
              statuses={KANBAN_COLUMNS}
              onStatusChange={updateApplicationStatus}
              onDelete={handleDelete}
              onAdd={() => setOpen(true)}
            />
          </div>
        ))}
      </div>
      <AddJobModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
