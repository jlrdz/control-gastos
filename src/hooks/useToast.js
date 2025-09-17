import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

/**
 * Hook for consuming ToastContext.
 * Ensures it's used within a ToastProvider.
 */
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
