import { useModal } from "../../hooks/useModal";
import styles from "./index.module.scss";

/**
 * Generic Modal component using <dialog>.
 * Content is passed as children, making it reusable
 * for different forms or dialogs.
 */
export default function Modal({
    title = "Modal",
    triggerText = "Open Modal",
    showTrigger = true,
    children,
    footer = true,
}) {
    const { ref, showModal, closeModal } = useModal();

    return (
        <>
            {/* Trigger button */}
            {showTrigger && (
                <button type="button" onClick={showModal}>
                    {triggerText}
                </button>
            )}

            {/* Dialog element */}
            <dialog ref={ref} className={styles.dialog}>
                <h2 className={styles.header}>{title}</h2>

                {/* Content */}
                <div className={styles.content}>{children}</div>

                {/* Footer actions */}
                {footer && (
                    <div className={styles.footer}>
                        <button
                            type="button"
                            onClick={closeModal}
                            className={styles.closeBtn}
                        >
                            Close
                        </button>
                    </div>
                )}
            </dialog>
        </>
    );
}
