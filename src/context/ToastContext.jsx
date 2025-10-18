import { createContext, useState, useCallback, useContext } from "react";
import clsx from "clsx";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Container */}
      <div className="fixed top-4 right-4 flex flex-col gap-3 z-[9999]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              // Base style
              "min-w-[240px] max-w-[360px] px-5 py-4 rounded-xl font-medium text-sm",
              "text-[var(--foreground)] dark:text-[var(--primary)]",
              "bg-[var(--card)] border border-[var(--muted)]",
              "shadow-[0_6px_20px_rgba(0,0,0,0.35)] backdrop-blur-md",
              "animate-toast-fade pointer-events-auto transition-colors duration-300",
              // Variants
              {
                "border-l-[6px] border-l-[#4caf50]": toast.type === "success",
                "border-l-[6px] border-l-[#f44336]": toast.type === "error",
                "border-l-[6px] border-l-[#2196f3]": toast.type === "info",
                "border-l-[6px] border-l-[#ff9800]": toast.type === "warning",
              }
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
