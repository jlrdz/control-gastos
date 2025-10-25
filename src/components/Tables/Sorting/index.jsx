export default function Sorting({
  columnKey,
  sortConfig,
  setSortConfig,
  children,
}) {
  const handleClick = () => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const arrow =
    sortConfig.key === columnKey
      ? sortConfig.direction === "asc"
        ? "▲"
        : "▼"
      : "";

  return (
    <span
      onClick={handleClick}
      className={`
          cursor-pointer select-none inline-flex items-center gap-1 
          transition-colors duration-200 
          text-[oklch(var(--foreground)/0.8)] 
          hover:text-[var(--accent)] 
          rounded-md px-1 py-0.5
        `}
    >
      {children} {arrow && <span className="text-xs">{arrow}</span>}
    </span>
  );
}
