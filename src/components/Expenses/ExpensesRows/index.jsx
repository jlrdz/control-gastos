import { Edit, Trash2 } from "lucide-react";
import { formatNumber, formatDate } from "../../../utils/format";
import CurrencyBadge from "../../Badges/BadgeCurrency";
import PaymentMethodBadge from "../../Badges/BadgePaymentMethod";
import Tooltip from "../../Tooltip";
import { useState } from "react";

function ExpensesRows({ expenses, onEdit, onDelete, deleting }) {
  const [hoveredEditId, setHoveredEditId] = useState(null);
  const [hoveredDeleteId, setHoveredDeleteId] = useState(null);
  const [hoveredDescriptionId, setHoveredDescriptionId] = useState(null);

  return (
    <>
      {expenses.map((exp, index) => (
        <tr
          key={exp.id}
          onDoubleClick={() => onEdit(exp)}
          className={`
            ${
              index % 2 === 0
                ? "bg-[var(--active-bg)] dark:bg-[var(--active-bg)]"
                : "bg-[var(--card)] dark:bg-[var(--card)]"
            }
            hover:bg-[var(--hover-surface)]
            dark:hover:bg-[var(--hover-surface)]
            transition-colors duration-150
            cursor-pointer
            relative
          `}
        >
          {/* Fecha */}
          <td className="px-4 py-2 flex text-sm text-[var(--primary)] whitespace-nowrap">
            {formatDate(exp.fecha, "es-cr")}
          </td>

          {/* Descripción */}
          <td className="px-4 py-2 text-sm text-[var(--primary)] max-w-[320px]">
            <div
              className="relative"
              onMouseEnter={() => setHoveredDescriptionId(exp.id)}
              onMouseLeave={() => setHoveredDescriptionId(null)}
            >
              <span className="block max-w-[300px] truncate">{exp.descripcion}</span>
              <Tooltip
                label={exp.descripcion}
                visible={hoveredDescriptionId === exp.id}
                position="right"
              />
            </div>
          </td>

          {/* Monto + Moneda */}
          <td className="px-4 py-2 text-right text-sm font-medium text-[var(--primary)] whitespace-nowrap">
            {formatNumber(exp.monto)}
            <CurrencyBadge code={exp.moneda} />
          </td>

          {/* Método de pago */}
          <td className="px-4 py-2 text-sm whitespace-nowrap">
            <PaymentMethodBadge method={exp.forma_pago} />
          </td>

          {/* Categoría */}
          <td
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              exp.categories?.nombre?.toLowerCase() === "uncategorized"
                ? "italic font-semibold text-[oklch(0.6_0.25_25)] dark:text-[(0.7_0.25_30)]"
                : "text-[var(--primary)]"
            }`}
          >
            {exp.categories?.nombre ?? "—"}
          </td>

          {/* Acciones */}
          <td className="px-4 py-2 flex justify-center items-center gap-3">
            <div
              className="relative inline-block"
              onMouseEnter={() => setHoveredEditId(exp.id)}
              onMouseLeave={() => setHoveredEditId(null)}
            >
              <button
                onClick={() => onEdit(exp)}
                className="
                  p-2 rounded-md 
                  text-[var(--primary)] 
                  hover:bg-[var(--card)] dark:hover:bg-[var(--active-bg)]
                  transition-transform duration-150 hover:scale-110
                  cursor-pointer
                "
              >
                <Edit size={16} strokeWidth={1.75} />
              </button>

              <Tooltip
                label="Edit expense"
                visible={hoveredEditId === exp.id}
                position="bottom"
              />
            </div>
            <div
              className="relative inline-block"
              onMouseEnter={() => setHoveredDeleteId(exp.id)}
              onMouseLeave={() => setHoveredDeleteId(null)}
            >
              <button
                onClick={() => onDelete(exp.id)}
                disabled={deleting}
                className="
                p-2 rounded-md 
                text-[oklch(0.6_0.25_25)] 
                hover:bg-[oklch(0.6_0.25_25_/_0.15)]
                disabled:opacity-50 
                transition-transform duration-150 hover:scale-110
                cursor-pointer
              "
              >
                <Trash2 size={16} strokeWidth={1.75} />
              </button>
              <Tooltip
                label="Delete expense"
                visible={hoveredDeleteId === exp.id}
                position="bottom"
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default ExpensesRows;
