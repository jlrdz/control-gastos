import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "../ExpensesTable/index.module.scss";
import { formatNumber, formatDate } from "../../utils/format";

// const normalizeCategory = (name) => {
//     if (!name) return "uncategorized";
//     return name
//         .toLowerCase()
//         .replace(/&/g, "and")          // reemplaza &
//         .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()); // convierte a camelCase
// };


function ExpensesRows({ expenses, onEdit, onDelete, deleting }) {
    return (
        <>
            {expenses.map((exp) => (
                <tr key={exp.id}>
                    <td>{formatDate(exp.fecha, "es-cr")}</td>
                    <td className={styles.description}
                        title={exp.descripcion}>
                        {exp.descripcion}
                    </td>
                    {/* ✅ monto alineado a la derecha con badge de moneda */}
                    < td className={styles.amountCol} >
                        {formatNumber(exp.monto)}
                        <span
                            className={`${styles.currencyBadge} ${styles[exp.moneda?.toLowerCase()]}`}
                        >
                            {exp.moneda}
                        </span>
                    </td >

                    <td>
                        <span
                            className={`${styles.paymentBadge} ${styles[exp.forma_pago?.toLowerCase()]}`}
                        >
                            {exp.forma_pago}
                        </span></td>
                    {/* <td>
                        <span
                            className={`${styles.categoryBadge} ${styles[normalizeCategory(exp.categories?.nombre)]}`}
                        >
                            {exp.categories?.nombre ?? "—"}
                        </span>
                    </td> */}
                    <td className={exp.categories?.nombre.toLowerCase() === "uncategorized" ? styles.uncategorized : ""}>
                        {exp.categories?.nombre ?? "—"}
                    </td>
                    <td>
                        <button
                            onClick={() => onEdit(exp)}
                            className={`${styles.iconBtn} ${styles.edit}`}
                            title="Edit expense"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => onDelete(exp.id)}
                            className={`${styles.iconBtn} ${styles.delete}`}
                            title="Delete expense"
                            disabled={deleting}
                        >
                            <FaTrash />
                        </button>
                    </td>
                </tr >
            ))
            }
        </>
    );
}

export default ExpensesRows;
