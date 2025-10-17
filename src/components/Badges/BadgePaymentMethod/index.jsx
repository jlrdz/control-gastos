export default function PaymentMethodBadge({ method }) {
  if (!method) return null;
  const key = method.toLowerCase();

  const styles = {
    amex: "bg-[oklch(0.7_0.1_190_/0.15)] text-[oklch(0.72_0.1_190)]",
    visa: "bg-[oklch(0.7_0.12_250_/0.15)] text-[oklch(0.75_0.15_250)]",
    mastercard: "bg-[oklch(0.65_0.2_30_/0.15)] text-[oklch(0.7_0.25_30)]",
    cash: "bg-[oklch(0.75_0.12_150_/0.15)] text-[oklch(0.7_0.15_150)]",
    transfer: "bg-[oklch(0.72_0.1_200_/0.15)] text-[oklch(0.7_0.15_200)]",
    default:
      "bg-[oklch(var(--muted-foreground)/0.1)] text-[oklch(var(--foreground)/0.75)]",
  };

  const colorClass = styles[key] || styles.default;

  return (
    <span
      className={`px-2 py-[2px] text-xs font-semibold rounded-md ${colorClass}`}
    >
      {method}
    </span>
  );
}
