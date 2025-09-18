import { useModal } from "../../hooks/useModal";
import styles from "./index.module.scss";

/**
 * Generic Modal component with neumorphism dark style.
 * - Controlled externally with `isOpen` and `onClose`.
 * - Footer supports:
 *    - Secondary button (always closes modal).
 *    - Primary button (optional, custom action).
 * - Supports loading state via `primaryDisabled` + spinner.
 * - Variants supported: primary | secondary | danger
 */
export default function Modal({
    title = "Modal",
    children,
    isOpen = false,
    onClose,
    primaryLabel = null,
    onPrimary = null,
    primaryDisabled = false,
    primaryVariant = "primary",   // 👈 NEW
    secondaryLabel = "Close",
    secondaryVariant = "secondary", // 👈 NEW
}) {
    const { ref } = useModal();

    // Sync external state with <dialog>
    if (ref.current) {
        if (isOpen && !ref.current.open) {
            ref.current.showModal();
        } else if (!isOpen && ref.current.open) {
            ref.current.close();
        }
    }

    const handlePrimary = () => {
        if (onPrimary) onPrimary();
    };

    const handleSecondary = () => {
        if (onClose) onClose();
    };

    // util para mapear variante a clase
    const getBtnClass = (variant) => {
        switch (variant) {
            case "danger":
                return styles.dangerBtn;
            case "secondary":
                return styles.secondaryBtn;
            case "primary":
            default:
                return styles.primaryBtn;
        }
    };

    return (
        <dialog ref={ref} className={styles.dialog} onClose={onClose}>
            <h2 className={styles.header}>{title}</h2>

            {/* Content */}
            <div className={styles.content}>{children}</div>

            {/* Footer */}
            <div className={styles.footer}>
                {/* Secondary button */}
                {secondaryLabel && (
                    <button
                        type="button"
                        onClick={handleSecondary}
                        className={getBtnClass(secondaryVariant)}
                    >
                        {secondaryLabel}
                    </button>
                )}

                {/* Primary button */}
                {primaryLabel && (
                    <button
                        type="button"
                        onClick={handlePrimary}
                        className={getBtnClass(primaryVariant)}
                        disabled={primaryDisabled}
                    >
                        {primaryDisabled ? (
                            <span className={styles.spinnerWrapper}>
                                <span className={styles.spinner}></span>
                                {primaryLabel}
                            </span>
                        ) : (
                            primaryLabel
                        )}
                    </button>
                )}
            </div>
        </dialog>
    );
}
