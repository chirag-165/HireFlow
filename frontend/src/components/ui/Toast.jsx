import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const iconByType = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function Toast({ type = "info", message }) {
  const Icon = iconByType[type] || Info;
  return (
    <div className="glass-card flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text)]">
      <Icon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
