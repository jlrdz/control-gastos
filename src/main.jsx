import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastProvider } from "./context/ToastContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LocaleProvider } from "./context/LocaleContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>
);
