import React from "react";
import clsx from "clsx";

export default function Input({
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
  className,
  ...props
}) {
  const baseClasses = `
    w-full
    px-3 py-2
    rounded-md text-sm
    bg-[oklch(var(--muted))]
    text-[var(--primary)]
    border border-transparent
    shadow-[2px_2px_4px_rgba(0,0,0,0.45),_-2px_-2px_4px_rgba(255,255,255,0.04)]
    focus:outline-none
    focus:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.05),0_0_4px_oklch(var(--primary)/0.4)]
    focus:border-[oklch(var(--primary)/0.4)]
    transition-all duration-200
    placeholder:text-[oklch(var(--muted-foreground)/0.8)]
  `;

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(baseClasses, className)}
      {...props}
    />
  );
}
