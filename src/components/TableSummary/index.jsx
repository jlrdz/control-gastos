import { formatNumber } from "../../utils/format";
import styles from "./index.module.scss";

function TableSummary({ expenses = [] }) {
    if (!expenses || expenses.length === 0) return null;

    const totalCount = expenses.length;
    const totals = expenses.reduce((acc, exp) => {
        const { moneda, monto } = exp;
        acc[moneda] = (acc[moneda] || 0) + monto;
        return acc;
    }, {});

    return (
        <div className={styles.summary}>
            <span>
                Records: <strong>{totalCount}</strong>
            </span>
            {totals.CRC != null && (
                <span>
                    Total CRC: <strong>{formatNumber(totals.CRC)}</strong>
                </span>
            )}
            {totals.USD != null && (
                <span>
                    Total USD: <strong>{formatNumber(totals.USD)}</strong>
                </span>
            )}
        </div>
    );
}

export default TableSummary;
