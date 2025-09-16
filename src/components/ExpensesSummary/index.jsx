import { formatNumber } from "../../utils/format";

function ExpensesSummary({ expenses }) {
    if (!expenses || expenses.length === 0) return null;

    const totalCount = expenses.length;

    const totals = expenses.reduce((acc, exp) => {
        const { moneda, monto } = exp;
        acc[moneda] = (acc[moneda] || 0) + monto;
        return acc;
    }, {});

    return (
        <div style={{ marginTop: "1rem" }}>
            <h2>Summary</h2>
            <p>Records found: {totalCount}</p>
            {Object.entries(totals).map(([currency, amount]) => (
                <p key={currency}>
                    Total {currency}: {formatNumber(amount)}
                </p>
            ))}
        </div>
    );
}

export default ExpensesSummary;
