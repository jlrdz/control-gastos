import React from "react";
import Pagination from "../Pagination";
import Modal from "../Modal";
import ExpenseForm from "../ExpenseForm";
import styles from "./index.module.scss";
import TableSummary from "../ExpensesSummary";
import { useExpensesTable } from "../../hooks/useExpensesTable";
import ExpensesRows from "../ExpensesRows";

function ExpensesTable({ filters }) {
    const {
        expenses, error, loading, totalCount,
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
                <div className={styles.summaryWrapper}>
                    <TableSummary expenses={expenses} />
                </div>
                <button
                    onClick={() => setModal((m) => ({ ...m, insert: true }))}
                    className={styles.addBtn}
                >
                    <span className={styles.icon}>+</span> Add Expense
                </button>
            </div>
            <div className={styles.tableWrapper}>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th className={styles.amountCol}>Amount</th>
                            <th>Payment method</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr>
                                <td colSpan={7} className={styles.errorCell}>
                                    Error: {error.message}
                                </td>
                            </tr>
                        ) : expenses?.length > 0 ? (
                            <ExpensesRows
                                expenses={expenses}
                                onEdit={(exp) => setModal((m) => ({ ...m, edit: exp }))}
                                onDelete={(id) => setModal((m) => ({ ...m, deleteId: id }))}
                                deleting={deleting}
                            />
                        ) : (
                            <tr>
                                <td colSpan={7} className={styles.emptyCell}>
                                    No expenses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading && (
                    <div className={styles.overlay}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
                goToPage={goToPage}
                nextPage={nextPage}
                prevPage={prevPage}
                totalCount={totalCount}
                startRecord={startRecord}
                endRecord={endRecord}
                pageNumbers={pageNumbers}
            />

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
