import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { login as loginAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginAPI(email, password);
      setSuccess(true);
      login({ name: email.split("@")[0], email }, response?.token || "fake_token");
      setTimeout(() => navigate("/dashboard"), 350);
    } catch (err) {
      setError(err?.message || "Invalid credentials");
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
        <form className="w-full max-w-md space-y-4" onSubmit={onSubmit}>
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error ? " " : ""} required />
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Password</span>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full rounded-lg border bg-[#1A1A2E] px-3 py-2.5 pr-10"
                style={{ borderColor: error ? "var(--color-status-rejected)" : "var(--color-border)" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-2 top-2.5 cursor-pointer">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>
          {error ? <p className="text-xs text-[var(--color-status-rejected)]">{error}</p> : null}
          {success ? <p className="flex items-center gap-1 text-xs text-[var(--color-status-offer)]"><CheckCircle2 className="h-4 w-4" />Login successful</p> : null}
          <div className="text-right text-xs text-[var(--color-text-muted)]">Forgot password</div>
          <Button className="w-full">{loading ? "Signing in..." : "Sign in"}</Button>
          <p className="text-sm text-[var(--color-text-muted)]">No account? <Link to="/register" className="cursor-pointer underline">Create one</Link></p>
        </form>
      </main>
    </div>
  );
}
