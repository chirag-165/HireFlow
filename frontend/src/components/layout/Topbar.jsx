import { useEffect, useRef } from "react";
import { Bell, Plus, Moon, Sun } from "lucide-react";
import Button from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

export default function Topbar({ onAdd, sidebarWidth = 220 }) {
  const { theme, toggleTheme } = useTheme();
  const searchRef = useRef(null);

  useEffect(() => {
    const onKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  return (
    <header
      className="fixed right-0 top-0 z-20 flex h-14 items-center justify-end gap-3 border-b px-4 md:px-6"
      style={{ left: sidebarWidth, borderColor: "var(--color-border)", background: "var(--color-topbar-bg)" }}
    >
      <input
        ref={searchRef}
        placeholder="Search jobs, companies, notes...  (Ctrl/Cmd + K)"
        className="w-full max-w-md rounded-lg border px-3 py-2 text-sm outline-none"
        style={{
          borderColor: "var(--color-border)",
          background: theme === "dark" ? "#1A1A2E" : "#ffffff",
          color: "var(--color-text)",
        }}
      />
      <button
        type="button"
        className="interactive cursor-pointer rounded-lg p-2"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
      <button type="button" className="interactive relative cursor-pointer rounded-lg p-2">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-status-rejected)" }} />
      </button>
      <Button onClick={onAdd}>
        <span className="inline-flex items-center gap-1"><Plus className="h-4 w-4" />Add Application</span>
      </Button>
    </header>
  );
}
