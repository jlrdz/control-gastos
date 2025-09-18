import { formatNumber, formatDate } from "../../utils/format";
import Pagination from "../Pagination";
import Modal from "../Modal";
import ExpenseForm from "../ExpenseForm";
import styles from "./index.module.scss";
import TableSummary from "../TableSummary";
import { useExpensesTable } from "../../hooks/useExpensesTable";

function ExpensesTable({ filters }) {
    const {
        expenses, error, loading,
        modal, setModal,
        expenseFormRef, editFormRef,
        deleting, handleDelete,
        currentPage, totalPages, pageSize, setPageSize,
        nextPage, prevPage, goToPage, startRecord, endRecord, pageNumbers,
        reloadExpenses, handleInsertLoading, handleEditLoading
    } = useExpensesTable(filters);

    return (
        <div className={styles.wrapper}>
            <div className={styles.tableHeader}>
                {!loading && expenses?.length > 0 && (
                    <div className={styles.summaryWrapper}>
                        <TableSummary expenses={expenses} />
                    </div>
                )}
                <button
                    onClick={() => setModal((m) => ({ ...m, insert: true }))}
                    className={styles.addBtn}
                >
                    <span className={styles.icon}>+</span> Add Expense
                </button>
            </div>

            {loading && <p>Loading expenses...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && (!expenses || expenses.length === 0) && <p>No expenses found</p>}

            {!loading && expenses?.length > 0 && (
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
                                <td className={styles.amount}>{formatNumber(exp.monto)}</td>
                                <td>{exp.moneda}</td>
                                <td>{exp.forma_pago}</td>
                                <td>{exp.categories?.nombre ?? "—"}</td>
                                <td>
                                    <button
                                        onClick={() => setModal((m) => ({ ...m, edit: exp }))}
                                        className={`${styles.actionBtn} ${styles.edit}`}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => setModal((m) => ({ ...m, deleteId: exp.id }))}
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
            )}

            {!loading && expenses?.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    goToPage={goToPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    totalCount={expenses.length}
                    startRecord={startRecord}
                    endRecord={endRecord}
                    pageNumbers={pageNumbers}
                />
            )}

            {/* Add Modal */}
            <Modal
                title="Add Expense"
                isOpen={modal.insert}
                onClose={() => setModal((m) => ({ ...m, insert: false }))}
                primaryLabel={modal.insertLoading ? "Saving..." : "Save"}
                primaryDisabled={modal.insertLoading}
                onPrimary={() => expenseFormRef.current?.submit()}
                secondaryLabel="Cancel"
                primaryVariant="primary"
                secondaryVariant="secondary"
            >
                <ExpenseForm
                    ref={expenseFormRef}
                    onSuccess={() => {
                        setModal((m) => ({ ...m, insert: false }));
                        reloadExpenses();
                    }}
                    closeModal={() => setModal((m) => ({ ...m, insert: false }))}
                    onLoadingChange={handleInsertLoading}
                />
            </Modal>

            {/* Edit Modal */}
            <Modal
                title="Edit Expense"
                isOpen={!!modal.edit}
                onClose={() => setModal((m) => ({ ...m, edit: null }))}
                primaryLabel={modal.editLoading ? "Updating..." : "Update"}
                primaryDisabled={modal.editLoading}
                onPrimary={() => editFormRef.current?.submit()}
                secondaryLabel="Cancel"
                primaryVariant="primary"
                secondaryVariant="secondary"
            >
                {modal.edit && (
                    <ExpenseForm
                        ref={editFormRef}
                        onSuccess={() => {
                            setModal((m) => ({ ...m, edit: null }));
                            reloadExpenses();
                        }}
                        closeModal={() => setModal((m) => ({ ...m, edit: null }))}
                        onLoadingChange={handleEditLoading}
                        {...modal.edit}
                    />
                )}
            </Modal>

            {/* Delete Modal */}
            <Modal
                title="Delete Expense"
                isOpen={!!modal.deleteId}
                onClose={() => setModal((m) => ({ ...m, deleteId: null }))}
                primaryLabel={deleting ? "Deleting..." : "Delete"}
                primaryDisabled={deleting}
                onPrimary={async () => {
                    if (modal.deleteId) {
                        await handleDelete(modal.deleteId);
                        setModal((m) => ({ ...m, deleteId: null }));
                        reloadExpenses();
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
