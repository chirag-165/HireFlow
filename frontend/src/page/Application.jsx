// src/pages/Application.jsx
import { useEffect, useState } from "react";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/api";

const columns = ["Applied", "Interview", "Offer", "Rejected"];

const styles = {
  container: {
    padding: "20px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  addBtn: {
    background: "#22c55e",
    border: "none",
    padding: "10px",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },

  board: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },

  column: {
    background: "#1e293b",
    padding: "10px",
    borderRadius: "8px",
    minHeight: "400px",
  },

  card: {
    background: "#334155",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
  },

  select: {
    marginTop: "10px",
    width: "100%",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "5px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
};

const Application = () => {
  const [apps, setApps] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    notes: "",
  });

  useEffect(() => {
    fetchApps();
  }, []);

const fetchApps = async () => {
  try {
    const data = await getApplications();
    setApps(data);
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
};

const handleCreate = async () => {
  try {
    await createApplication(form);
    setShowModal(false);
    setForm({ company: "", role: "", status: "Applied", notes: "" });
    fetchApps();
  } catch (err) {
    console.error("Create error:", err.message);
  }
};

  const handleDelete = async (id) => {
    await deleteApplication(id);
    fetchApps();
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateApplication(id, { status: newStatus });
    fetchApps();
  };

  const handleChange = async (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const groupedApps = columns.reduce((acc, col) => {
    acc[col] = apps.filter((a) => a.status === col);
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Applications</h2>
        <button onClick={() => setShowModal(true)} style={styles.addBtn}>
          + Add Application
        </button>
      </div>

      <div style={styles.board}>
        {columns.map((col) => (
          <div key={col} style={styles.column}>
            <h3>{col}</h3>

            {groupedApps[col]?.map((app) => (
              <div key={app._id} style={styles.card}>
                <h4>{app.company}</h4>
                <p>{app.role}</p>
                <small>{app.notes}</small>

                <select
                  value={app.status}
                  onChange={(e) =>
                    handleStatusChange(app._id, e.target.value)
                  }
                  style={styles.select}
                >
                  {columns.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <button
                  onClick={() => handleDelete(app._id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Add Application</h3>

            <input
              placeholder="Company"
              name="company"
              value={form.company}
              onChange={handleChange}
            />

            <input
              placeholder="Role"
              name='role'
              value={form.role}
              onChange={handleChange}
            />

            <textarea
              placeholder="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />

            <button onClick={handleCreate}>Create</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;