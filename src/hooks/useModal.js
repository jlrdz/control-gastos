import { useEffect, useRef } from "react";

export const useModal = () => {
    const ref = useRef(null);

    function showModal() {
        ref.current?.showModal();
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        ref.current?.close();
        document.body.classList.remove("modal-open");
    }

    useEffect(() => {
        const closeEvent = () => {
            document.body.classList.remove("modal-open");
        };

        const refEl = ref.current;
        if (refEl) {
            refEl.addEventListener("close", closeEvent);
        }

        return () => {
            if (refEl) {
                document.body.classList.remove("modal-open");
                refEl.removeEventListener("close", closeEvent);
            }
        };
    }, []);

    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            closeModal();
        };

        document.addEventListener("pointerdown", listener);
        return () => {
            document.removeEventListener("pointerdown", listener);
        };
    }, []);

    return {
        ref,
        showModal,
        closeModal,
    };
};
