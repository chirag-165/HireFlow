export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-medium text-[var(--color-text)]">{label}</span>}
      <input
        className={`w-full rounded-lg border bg-[#1A1A2E] px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition duration-200 focus:border-[var(--color-secondary)] ${className}`}
        style={{
          borderColor: error ? "var(--color-status-rejected)" : "var(--color-border)",
          boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
        }}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs text-[var(--color-status-rejected)]" style={{ animation: "shake 150ms ease-out" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
