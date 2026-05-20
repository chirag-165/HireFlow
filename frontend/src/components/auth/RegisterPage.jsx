import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { register as registerAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((k) => formData.append(k, form[k]));
      const response = await registerAPI(formData);
      login({ name: form.name, email: form.email }, response?.token || "fake_token");
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[55%_45%]">
      <aside className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1e40af33] to-[#0a0a0f]" />
        <div className="relative p-10">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold"><BriefcaseBusiness className="h-5 w-5" />HireFlow</div>
          <h1 className="max-w-sm text-3xl font-semibold">Track every application with clarity.</h1>
          <div className="mt-6 flex gap-2 text-xs">
            <span className="glass-card px-2 py-1">Pipeline Insights</span>
            <span className="glass-card px-2 py-1">Fast Updates</span>
            <span className="glass-card px-2 py-1">Team-ready</span>
          </div>
        </div>
      </aside>
      <main className="flex items-center justify-center p-6">
        <form className="w-full max-w-md space-y-3" onSubmit={onSubmit}>
          <h2 className="text-2xl font-semibold">Create account</h2>
          <Input label="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          <label className="block">
            <span className="mb-2 block text-sm">Password</span>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} required className="w-full rounded-lg border bg-[#1A1A2E] px-3 py-2.5 pr-10" style={{ borderColor: "var(--color-border)" }} />
              <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-2 top-2.5 cursor-pointer">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>
          <Input label="Education" value={form.education} onChange={(e) => update("education", e.target.value)} required />
          <Input label="Experience" value={form.experience} onChange={(e) => update("experience", e.target.value)} required />
          <Input label="Current Role" value={form.currentRole} onChange={(e) => update("currentRole", e.target.value)} required />
          <Input label="Target Role" value={form.targetRole} onChange={(e) => update("targetRole", e.target.value)} required />
          <Input label="Domain" value={form.domain} onChange={(e) => update("domain", e.target.value)} required />
          {error ? <p className="text-xs text-[var(--color-status-rejected)]">{error}</p> : null}
          <Button className="w-full" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
          <p className="text-sm text-[var(--color-text-muted)]">Already have an account? <Link to="/login" className="cursor-pointer underline">Sign in</Link></p>
        </form>
      </main>
    </div>
  );
}
