export default function CurrencyBadge({ code }) {
  if (!code) return null;
  const value = code.toUpperCase();

  const styles = {
    usd: "bg-[oklch(0.65_0.15_250_/0.18)] text-[oklch(0.7_0.18_250)]",
    crc: "bg-[oklch(0.7_0.14_175_/0.18)] text-[oklch(0.68_0.18_175)]",
    eur: "bg-[oklch(0.7_0.1_250_/0.18)] text-[oklch(0.75_0.15_250)]",
    default:
      "bg-[oklch(var(--muted-foreground)/0.15)] text-[oklch(var(--foreground)/0.9)]",
  };

  const colorClass = styles[value.toLowerCase()] || styles.default;

  return (
    <span
      className={`ml-2 px-2 py-[2px] text-xs font-semibold rounded-md ${colorClass}`}
    >
      {value}
    </span>
  );
}
