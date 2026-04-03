import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "20px",
  },

  card: {
    background: "#111827",
    padding: "30px",
    borderRadius: "12px",
    width: "500px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    color: "#fff",
  },

  title: {
    marginBottom: "5px",
    fontSize: "24px",
  },

  subtitle: {
    marginBottom: "20px",
    color: "#9ca3af",
    fontSize: "14px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #374151",
    background: "#1f2937",
    color: "#fff",
    outline: "none",
  },

  fileUpload: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  fileLabel: {
    fontSize: "14px",
    color: "#9ca3af",
  },

  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
  },

  footer: {
    marginTop: "15px",
    fontSize: "14px",
    textAlign: "center",
    color: "#9ca3af",
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

const Register = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    experience: "",
    currentRole: "",
    targetRole: "",
    domain: "",
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("resume", resume);

      await register(formData);

      alert("Registered successfully 🚀");
      nav("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Start tracking your job applications</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.grid}>
            <input name="name" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
            <input name="education" placeholder="Education" onChange={handleChange} style={styles.input} />
            <input name="experience" placeholder="Experience (years)" onChange={handleChange} style={styles.input} />
            <input name="currentRole" placeholder="Current Role" onChange={handleChange} style={styles.input} />
            <input name="targetRole" placeholder="Target Role" onChange={handleChange} style={styles.input} />
            <input name="domain" placeholder="Domain (Web, Data, AI...)" onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.fileUpload}>
            <label style={styles.fileLabel}>Upload Resume (PDF)</label>
            <input type="file" accept=".pdf" onChange={handleFileChange} required />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => nav("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;