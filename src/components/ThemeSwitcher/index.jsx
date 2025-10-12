import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Tooltip from "../../components/Tooltip";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={toggleTheme}
        className="
          w-9 h-9 rounded-full flex items-center justify-center
          bg-[var(--surface)] hover:scale-[1.05] active:scale-[0.95]
          transition-all duration-200 cursor-pointer
        "
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-[var(--text)]/80" />
        ) : (
          <Moon size={18} className="text-[var(--text)]/80" />
        )}
      </button>

      <Tooltip
        label={theme === "dark" ? "Light Mode" : "Dark Mode"}
        visible={hovered}
        position="bottom"
      />
    </div>
  );
}
