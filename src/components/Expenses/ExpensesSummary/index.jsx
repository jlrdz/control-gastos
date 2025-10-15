import { formatNumber } from "../../../utils/format";

function ExpensesSummary({ expenses }) {
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const totalCount = safeExpenses.length;

  const totals = safeExpenses.reduce(
    (acc, exp) => {
      const { moneda, monto } = exp;
      acc[moneda] = (acc[moneda] || 0) + monto;
      return acc;
    },
    { CRC: 0, USD: 0 }
  );

  return (
    <div
      className="
        flex flex-wrap items-center gap-6 px-5 py-3 rounded-xl
        bg-[var(--card)] text-[var(--foreground) dark:text-[var(--primary)]
        border border-[var(--muted-foreground)]/10
        text-sm
      "
    >
      <span>
        Records:{" "}
        <strong className="text-[var(--foreground)] dark:text-[var(--primary)]">
          {totalCount}
        </strong>
      </span>
      <span>
        Total CRC:{" "}
        <strong className="text-[var(--foreground)] dark:text-[var(--primary)]">
          {formatNumber(totals.CRC)}
        </strong>
      </span>
      <span>
        Total USD:{" "}
        <strong className="text-[var(--foreground)] dark:text-[var(--primary)]">
          {formatNumber(totals.USD)}
        </strong>
      </span>
    </div>
  );
}

export default ExpensesSummary;
