import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (enabled) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [enabled]);

  return [enabled, setEnabled];
}
