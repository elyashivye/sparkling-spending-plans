import { useEffect, useState } from "react";

const KEY = "theme";
type Theme = "light" | "dark";

function getInitial(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(KEY) as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", t === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitial());

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(KEY, theme); } catch {}
  }, [theme]);

  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

export function initTheme() {
  applyTheme(getInitial());
}
