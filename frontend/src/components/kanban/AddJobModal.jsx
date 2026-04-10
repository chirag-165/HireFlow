import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { createApplication } from "../../services/api";
import { useApps } from "../../context/ApplicationContext";
import { KANBAN_COLUMNS } from "./kanbanConfig";

const initial = {
  company: "",
  role: "",
  url: "",
  salary: "",
  location: "",
  notes: "",
  status: "Applied",
};

export default function AddJobModal({ open, onClose }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const { setApplications } = useApps();

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await createApplication(form);
      setApplications((prev) => [...prev, created]);
      setForm(initial);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Application">
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input label="Company" value={form.company} onChange={(e) => update("company", e.target.value)} required />
        <Input label="Role" value={form.role} onChange={(e) => update("role", e.target.value)} required />
        <Input label="URL" value={form.url} onChange={(e) => update("url", e.target.value)} />
        <Input label="Salary" value={form.salary} onChange={(e) => update("salary", e.target.value)} />
        <Input label="Location" value={form.location} onChange={(e) => update("location", e.target.value)} />
        <label className="block text-sm">
          <span className="mb-2 block">Notes</span>
          <textarea
            className="min-h-24 w-full rounded-lg border bg-[#1A1A2E] p-2 text-sm"
            style={{ borderColor: "var(--color-border)" }}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block">Status</span>
          <select
            className="w-full cursor-pointer rounded-lg border bg-[#1A1A2E] p-2"
            style={{ borderColor: "var(--color-border)" }}
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            {KANBAN_COLUMNS.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 pt-2">
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={saving}>
            {saving ? "Saving..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
