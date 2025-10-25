import { Edit, Trash2 } from "lucide-react";
import { formatNumber, formatDate } from "../../../utils/format";
import CurrencyBadge from "../../Badges/BadgeCurrency";
import PaymentMethodBadge from "../../Badges/BadgePaymentMethod";
import Tooltip from "../../Tooltip";
import { useState } from "react";
import TableRow from "../../Tables/TableRow";
import TableActionButton from "../../Buttons/TableActionButton";

function ExpensesTableRows({ expenses, onEdit, onDelete, deleting }) {
  const [hoveredDescriptionId, setHoveredDescriptionId] = useState(null);

  return (
    <>
      {expenses.map((exp, index) => (
        <TableRow key={exp.id} index={index} onDoubleClick={() => onEdit(exp)}>
          <td className="px-4 py-2 flex text-sm text-[var(--primary)] whitespace-nowrap">
            {formatDate(exp.fecha, "es-cr")}
          </td>

          <td className="px-5 py-2 text-sm text-[var(--primary)] max-w-[400px]">
            <div
              className="relative"
              onMouseEnter={() => setHoveredDescriptionId(exp.id)}
              onMouseLeave={() => setHoveredDescriptionId(null)}
            >
              <span className="block max-w-[400px] truncate">
                {exp.descripcion}
              </span>
              {exp.descripcion.length > 45 && (
                <Tooltip
                  label={exp.descripcion}
                  visible={hoveredDescriptionId === exp.id}
                  position="bottom"
                />
              )}
            </div>
          </td>

          <td className="px-4 py-2 text-right text-sm font-medium text-[var(--primary)] whitespace-nowrap">
            {formatNumber(exp.monto)}
            <CurrencyBadge code={exp.moneda} />
          </td>

          <td className="px-4 py-2 text-sm whitespace-nowrap">
            <PaymentMethodBadge method={exp.forma_pago} />
          </td>

          <td
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              exp.categories?.nombre?.toLowerCase() === "uncategorized"
                ? "italic font-semibold text-[oklch(0.6_0.25_25)] dark:text-[oklch(0.7_0.25_30)]"
                : "text-[var(--primary)]"
            }`}
          >
            {exp.categories?.nombre ?? "—"}
          </td>

          <td className="px-4 py-2 flex justify-center items-center gap-3">
            <TableActionButton
              icon={<Edit size={16} strokeWidth={1.75} />}
              label="Edit expense"
              onClick={() => onEdit(exp)}
              color="primary"
            />

            <TableActionButton
              icon={<Trash2 size={16} strokeWidth={1.75} />}
              label="Delete expense"
              onClick={() => onDelete(exp.id)}
              disabled={deleting}
              color="danger"
            />
          </td>
        </TableRow>
      ))}
    </>
  );
}

export default ExpensesTableRows;
