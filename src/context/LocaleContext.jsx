import { createContext, useContext, useEffect, useState } from "react";
import { TEXTS } from "../config/texts";

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) {
      setLang(saved);
    } else {
      const browserLang = navigator.language.startsWith("es") ? "es" : "en";
      setLang(browserLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LocaleContext.Provider value={{ lang, setLang, t: TEXTS[lang] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
