import { useState } from "react";
import Tooltip from "../../Tooltip";
import clsx from "clsx";

export default function TableActionButton({
  icon,
  label,
  onClick,
  disabled = false,
  color = "primary",
  hoverColor,
  position = "bottom",
  className,
}) {
  const [hovered, setHovered] = useState(false);

  const colorMap = {
    primary: {
      text: "text-[var(--primary)]",
      hover: "hover:bg-[var(--card)] dark:hover:bg-[var(--active-bg)]",
    },
    danger: {
      text: "text-[oklch(0.6_0.25_25)]",
      hover: "hover:bg-[oklch(0.6_0.25_25_/_0.15)]",
    },
  };

  const styles = colorMap[color] || colorMap.primary;
  const hoverClass = hoverColor || styles.hover;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          "p-2 rounded-md transition-transform duration-150 hover:scale-110 cursor-pointer",
          styles.text,
          hoverClass,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {icon}
      </button>

      <Tooltip label={label} visible={hovered} position={position} />
    </div>
  );
}
