import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import Tooltip from "../../components/Tooltip";
import { useLocale } from "../../context/LocaleContext";
import clsx from "clsx";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { lang, setLang, t } = useLocale();
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const handleSelect = (code) => {
    setLang(code);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (open) setHovered(false);
  }, [open]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => !open && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-9 h-9 rounded-full flex items-center justify-center
          bg-[var(--surface)] hover:scale-[1.05] active:scale-[0.95]
          transition-all duration-200 cursor-pointer
        "
      >
        <Globe size={18} className="text-[var(--text)]/80" />
      </button>

      <Tooltip label="Language" visible={hovered && !open} position="bottom" />

      {open && (
        <div
          className={clsx(
            "absolute right-0 mt-2 w-36 z-50 rounded-md border",
            "bg-[var(--card)]",
            "border-[var(--muted-foreground)]/20",
            "shadow-[4px_4px_8px_rgba(0,0,0,0.6),_-4px_-4px_8px_rgba(255,255,255,0.05)]",
            "overflow-y-auto max-h-[10rem]",
            "p-2 animate-fadeIn transition-all duration-200"
          )}
        >
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm capitalize 
                transition-all duration-150 cursor-pointer hover:bg-[var(--hover-surface)]
                ${
                  lang === code
                    ? "bg-[var(--selected-surface)] text-[var(--text)] font-medium"
                    : "text-[var(--text)]/70 hover:bg-[color-mix(in_oklch,var(--surface),black_10%)] hover:text-[var(--text)]"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
