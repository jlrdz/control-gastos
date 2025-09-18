import { useState } from "react";
import { formatNumber, formatDate } from "../../utils/format";
import Pagination from "../Pagination";
import { useExpensesTable } from "../../hooks/useExpensesTable";
import Modal from "../Modal";
import styles from "./index.module.scss";

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
    prevPage,
    onDeleteSuccess,
    onEdit,
    onAdd,
}) {
    const { handleDelete, deleting } = useExpensesTable({ onDeleteSuccess });
    const [selectedId, setSelectedId] = useState(null);

    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!expenses || expenses.length === 0) return <p>No expenses found</p>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.tableHeader}>
                <button onClick={onAdd} className={styles.addBtn}>
                    <span className={styles.icon}>+</span> Add Expense
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Payment method</th>
                        <th>Category</th>
                        <th>Actions</th>
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
                            <td>
                                <button
                                    onClick={() => onEdit && onEdit(exp)}
                                    className={`${styles.actionBtn} ${styles.edit}`}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => setSelectedId(exp.id)}
                                    disabled={deleting}
                                    className={`${styles.actionBtn} ${styles.delete}`}
                                >
                                    🗑️ Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
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

            {/* Modal de confirmación */}
            <Modal
                title="Delete Expense"
                isOpen={!!selectedId}
                onClose={() => setSelectedId(null)}
                primaryLabel={deleting ? "Deleting..." : "Delete"}
                primaryDisabled={deleting}
                onPrimary={async () => {
                    if (selectedId) {
                        await handleDelete(selectedId);
                        setSelectedId(null);
                    }
                }}
                secondaryLabel="Cancel"
                primaryVariant="danger"
                secondaryVariant="secondary"
            >
                <p>Are you sure you want to delete this expense?</p>
            </Modal>
        </div>
    );
}

export default ExpensesTable;
