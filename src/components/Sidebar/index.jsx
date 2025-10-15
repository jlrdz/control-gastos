import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../config/routes";
import { Menu } from "lucide-react";
import Tooltip from "../../components/Tooltip";
import { useLocale } from "../../context/LocaleContext";

export default function Sidebar() {
  const { t } = useLocale();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <aside
      style={{ boxShadow: "var(--sidebar-shadow)" }}
      className={`${
        collapsed ? "w-20" : "w-64"
      } min-h-dvh bg-[var(--surface)] border-r border-[var(--border)] transition-all duration-300 flex flex-col shadow-[6px_0_10px_rgba(0,0,0,0.15)] relative z-40`}
    >
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        {!collapsed && (
          <span className="text-[var(--text)] dark:text-[var(--primary)] font-semibold  tracking-tight text-lg">
            {t["app_name"]}
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[var(--text)]/70 dark:text-[var(--primary)] hover:text-[var(--text)] transition cursor-pointer"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1 relative">
        {NAV_ITEMS.map(({ path, key, icon: Icon }) => (
          <div
            key={path}
            onMouseEnter={() => setHoveredItem(key)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative"
          >
            <NavLink
              to={path}
              end
              className={({ isActive }) =>
                `
                group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative hover:scale-[1.02] active:scale-[0.98] cursor-pointer
                ${
                  isActive
                    ? "bg-[var(--active-bg)] text-[var(--active-text)] shadow-[var(--active-shadow)] border-l-2"
                    : "text-[var(--text)]/70 dark:text-[var(--primary)] hover:bg-[var(--hover-surface)] hover:text-[var(--text)]"
                }
              `
              }
            >
              <Icon size={18} strokeWidth={2} />
              {!collapsed && <span>{t[key]}</span>}
            </NavLink>

            {collapsed && (
              <Tooltip
                label={t[key]}
                visible={hoveredItem === key}
                position="right"
              />
            )}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-[var(--border)] text-xs text-[var(--text)]/50 dark:text-[var(--primary)]">
          <span>v1.0.0</span>
        </div>
      )}
    </aside>
  );
}
