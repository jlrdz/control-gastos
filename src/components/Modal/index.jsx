import { X } from "lucide-react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import DangerButton from "../Buttons/DangerButton";
import clsx from "clsx";

export default function Modal({
  title = "Modal",
  children,
  isOpen = false,
  onClose,
  primaryLabel = null,
  onPrimary = null,
  primaryDisabled = false,
  primaryVariant = "primary",
  secondaryLabel = "Close",
  secondaryVariant = "secondary",
}) {
  const handlePrimary = () => {
    if (onPrimary) onPrimary();
  };

  const handleSecondary = () => {
    if (onClose) onClose();
  };

  const getButtonComponent = (variant) => {
    switch (variant) {
      case "danger":
        return DangerButton;
      case "secondary":
        return SecondaryButton;
      case "primary":
      default:
        return PrimaryButton;
    }
  };

  const Primary = getButtonComponent(primaryVariant);
  const Secondary = getButtonComponent(secondaryVariant);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        "transition-opacity duration-100 ease-out",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* fondo oscuro + blur */}
      <div
        onClick={handleSecondary}
        className={clsx(
          "absolute inset-0 bg-[oklch(var(--background)/0.75)] backdrop-blur-[6px] saturate-150",
          "transition-all duration-300"
        )}
      />

      {/* contenedor del modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "relative z-10 w-[min(90%,480px)] rounded-2xl",
          "bg-[var(--card)] text-[var(--foreground)] dark:text-[var(--primary)]",
          "shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_0_0_rgba(255,255,255,0.05)]",
          "backdrop-blur-md transition-all duration-300 ease-out",
          "overflow-hidden transform",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between relative">
          <h2 className="text-base font-semibold tracking-wide">{title}</h2>

          <button
            onClick={handleSecondary}
            className="p-1.5 rounded-full hover:bg-[oklch(var(--muted)/0.5)] transition cursor-pointer"
          >
            <X className="w-5 h-5 opacity-80 hover:opacity-100" />
          </button>

          {/* separación sutil */}
          <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[oklch(var(--muted-foreground)/0.15)] to-transparent"></span>
        </div>

        {/* Content */}
        <div className="p-6 text-sm leading-relaxed text-[oklch(var(--foreground)/0.85)]">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 relative">
          <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[oklch(var(--muted-foreground)/0.15)] to-transparent"></span>

          {secondaryLabel && (
            <Secondary onClick={handleSecondary}>{secondaryLabel}</Secondary>
          )}

          {primaryLabel && (
            <Primary onClick={handlePrimary} disabled={primaryDisabled}>
              {primaryDisabled ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[oklch(var(--foreground)/0.2)] border-t-[oklch(var(--primary))] rounded-full animate-spin"></span>
                  {primaryLabel}
                </span>
              ) : (
                primaryLabel
              )}
            </Primary>
          )}
        </div>
      </div>
    </div>
  );
}
