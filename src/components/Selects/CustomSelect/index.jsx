import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className,
  ...props
}) {
  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={clsx("relative inline-block w-full", className)}>
      <select
        {...props}
        value={value || ""}
        onChange={handleChange}
        className={clsx(
          "w-full appearance-none px-3 py-2 rounded-md text-sm",
          "bg-[var(--card)] text-[var(--primary)] border border-transparent",
          "shadow-[2px_2px_4px_rgba(0,0,0,0.45),_-2px_-2px_4px_rgba(255,255,255,0.04)]",
          "focus:outline-none transition-all duration-200 cursor-pointer",
          "focus:border-[oklch(var(--primary)/0.4)]"
        )}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className={clsx(
          "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted-foreground)] transition-transform duration-200"
        )}
      />
    </div>
  );
}
