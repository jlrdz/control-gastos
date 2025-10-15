import { useLocation } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { useLocale } from "../../context/LocaleContext";

export default function Topbar() {
  const { pathname } = useLocation();
  const { t } = useLocale();

  const TITLES = {
    "/": t.overview,
    "/expenses": t.track,
    "/budgets": t.manage,
    "/goals": t.monitor,
    "/settings": t.customize,
  };

  const pageTitle = TITLES[pathname] || t.home;

  return (
    <header
      className="
        sticky top-0 z-30 flex items-center justify-between 
        px-6 py-4 bg-[var(--surface)] text-[var(--text) dark:text-[var(--primary)]
        shadow-[var(--sidebar-shadow)] transition-all duration-300
      "
    >
      <div className="flex items-baseline">
        <h1 className="text-lg font-semibold tracking-tight">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3 relative">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
