import { formatNumber } from "../../utils/format";
import styles from "./index.module.scss";

function ExpensesSummary({ expenses }) {
    const safeExpenses = Array.isArray(expenses) ? expenses : []; // 👈 asegura un array

    const totalCount = safeExpenses.length;

    const totals = safeExpenses.reduce(
        (acc, exp) => {
            const { moneda, monto } = exp;
            acc[moneda] = (acc[moneda] || 0) + monto;
            return acc;
        },
        { CRC: 0, USD: 0 } // 👈 valores iniciales en cero
    );

    return (
        <div className={styles.summary}>
            <span>
                Records: <strong>{totalCount}</strong>
            </span>
            <span>
                Total CRC: <strong>{formatNumber(totals.CRC)}</strong>
            </span>
            <span>
                Total USD: <strong>{formatNumber(totals.USD)}</strong>
            </span>
        </div>
    );
}

export default ExpensesSummary;
