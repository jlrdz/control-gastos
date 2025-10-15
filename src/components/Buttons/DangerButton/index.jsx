import clsx from "clsx";

export default function DangerButton({
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
        bg-[oklch(0.45_0.18_25)] text-[oklch(0.97_0.02_25)]
        border border-[oklch(0.45_0.18_25/0.3)]
        shadow-[2px_2px_4px_rgba(0,0,0,0.45),_-2px_-2px_4px_rgba(255,255,255,0.04)]
        transition-all duration-200 ease-out
        hover:bg-[oklch(0.5_0.2_25)]
        hover:shadow-[0_0_10px_oklch(0.55_0.2_25/0.45)]
        hover:scale-[1.03]
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
