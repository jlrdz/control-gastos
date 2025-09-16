import { formatNumber, formatDate } from "../../utils/format";

function ExpensesTable({ expenses, loading, error }) {
    if (loading) {
        return <p>Loading expenses...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    if (!expenses || expenses.length === 0) {
        return <p>No expenses found</p>
    }

    return (
        <table border="1" cellPadding="5" style={{ marginTop: "1rem", width: "100%" }}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Payment method</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((exp) => (
                    <tr key={exp.id}>
                        <td>{formatDate(exp.fecha, "es-cr")}</td>
                        <td>{exp.descripcion}</td>
                        <td>{formatNumber(exp.monto)}</td>
                        <td>{exp.moneda}</td>
                        <td>{exp.forma_pago}</td>
                        <td>{exp.categories ? exp.categories.nombre : "—"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ExpensesTable
