import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(
    typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return { theme, setTheme };
}
