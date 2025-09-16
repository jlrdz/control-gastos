import { formatNumber, formatDate } from "../../utils/format";
import Pagination from "../Pagination";

function ExpensesTable({
    expenses,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
    goToPage,
    nextPage,
    prevPage
}) {
    // Show loading state
    if (loading) {
        return <p>Loading expenses...</p>;
    }

    // Show error message if query fails
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Show empty state when there are no results
    if (!expenses || expenses.length === 0) {
        return <p>No expenses found</p>;
    }

    return (
        <div>
            {/* Expenses table */}
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

            {/* Pagination controls */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                goToPage={goToPage}
                nextPage={nextPage}
                prevPage={prevPage}
                totalCount={totalCount}
            />
        </div>
    );
}

export default ExpensesTable;
