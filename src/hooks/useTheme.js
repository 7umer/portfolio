import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "umer-theme";

/**
 * Reads the theme the visitor should see: their saved choice if they have
 * made one, otherwise whatever their OS is set to.
 */
function resolveInitialTheme() {
  if (typeof window === "undefined") return "light";

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Private browsing / blocked storage — fall through to the OS setting.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#080808" : "#ffffff";

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Nothing to do — the theme still applies for this visit.
    }
  }, [theme]);

  // Follow the OS if the visitor has never picked a theme themselves.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (e) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* fall through and follow the OS */
      }
      setTheme(e.matches ? "dark" : "light");
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return { theme, toggle };
}
