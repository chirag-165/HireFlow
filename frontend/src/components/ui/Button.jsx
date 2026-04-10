export default function Button({ variant = "primary", className = "", children, ...props }) {
  const base =
    "interactive cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary: "text-slate-950",
    ghost: "bg-transparent text-[var(--color-text)] border border-[var(--color-border)]",
    danger: "text-white",
  };
  const style = {
    background:
      variant === "primary" ? "var(--color-cta)" : variant === "danger" ? "var(--color-status-rejected)" : "transparent",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} style={style} {...props}>
      {children}
    </button>
  );
}
