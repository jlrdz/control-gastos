import clsx from "clsx";

export default function SecondaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
        relative inline-flex items-center justify-center
        px-4 py-2 rounded-md font-medium text-sm
        bg-[var(--card)] text-[var(--foreground)]
        border border-[oklch(var(--foreground)/0.1)]
        shadow-[2px_2px_4px_rgba(0,0,0,0.45),_-2px_-2px_4px_rgba(255,255,255,0.04)]
        transition-all duration-200 ease-out
        hover:bg-[var(--hover-surface)] hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        `,
        className
      )}
    >
      {children}
    </button>
  );
}
