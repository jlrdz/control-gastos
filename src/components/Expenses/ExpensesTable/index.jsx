import React from "react";
import Pagination from "../../Pagination";
import Modal from "../../Modal";
import ExpenseForm from "../ExpenseForm";
import TableSummary from "../ExpensesSummary";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { useExpensesTable } from "../../../hooks/useExpensesTable";
import ExpensesRows from "../ExpensesRows";
import Sorting from "../../Sorting";
import Loader from "../../Loader";
import ModalPortal from "../../Modal/ModalPortal";
import { Plus } from "lucide-react";

function ExpensesTable({ filters }) {
  const {
    expenses,
    error,
    loading,
    totalCount,
    modal,
    setModal,
    expenseFormRef,
    editFormRef,
    deleting,
    handleDelete,
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
    nextPage,
    prevPage,
    goToPage,
    startRecord,
    endRecord,
    pageNumbers,
    reloadExpenses,
    handleInsertLoading,
    handleEditLoading,
    sortConfig,
    setSortConfig,
  } = useExpensesTable(filters);

  return (
    <>
      <div className="w-full min-h-[500px] flex flex-col min-w-[700px] relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex text-sm text-[oklch(var(--foreground)/0.8)]">
            <TableSummary expenses={expenses} />
          </div>

          <PrimaryButton
            onClick={() => setModal((m) => ({ ...m, isInsert: true }))}
            className="z-10 translate-y-[-1px]"
          >
            <Plus size={16} className="mr-2" />
            Add Expense
          </PrimaryButton>
        </div>
        <div className="relative">
          <div
            className="
              max-h-[28rem] overflow-y-auto rounded-xl relative
              bg-[oklch(var(--card))]
              shadow-[0_1px_2px_oklch(0_0_0_/_0.12)]
              dark:shadow-[0_1px_3px_oklch(0_0_0_/_0.3)]
              border-l border-[var(--muted)]
              dark:border-[var(--muted)]
              transition-all duration-300
            "
          >
            <table className="w-full border-collapse table-fixed min-w-[700px]">
              <thead
                className="bg-[var(--card)] dark:bg-[var(--card)] sticky top-0 z-[2] backdrop-blur-[1px]
              shadow-[0_1px_2px_oklch(0_0_0_/_0.1)]
              dark:shadow-[0_1px_2px_oklch(0_0_0_/_0.25)]"
              >
                <tr className="text-left text-[var(--primary)] text-sm font-semibold">
                  <th className="px-4 py-3">
                    <Sorting
                      columnKey="fecha"
                      sortConfig={sortConfig}
                      setSortConfig={setSortConfig}
                    >
                      Date
                    </Sorting>
                  </th>
                  <th className="px-4 py-3">
                    <Sorting
                      columnKey="descripcion"
                      sortConfig={sortConfig}
                      setSortConfig={setSortConfig}
                    >
                      Description
                    </Sorting>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <Sorting
                      columnKey="monto"
                      sortConfig={sortConfig}
                      setSortConfig={setSortConfig}
                    >
                      Amount
                    </Sorting>
                  </th>
                  <th className="px-4 py-3">
                    <Sorting
                      columnKey="forma_pago"
                      sortConfig={sortConfig}
                      setSortConfig={setSortConfig}
                    >
                      Payment method
                    </Sorting>
                  </th>
                  <th className="px-4 py-3">
                    <Sorting
                      columnKey="categories(nombre)"
                      sortConfig={sortConfig}
                      setSortConfig={setSortConfig}
                    >
                      Category
                    </Sorting>
                  </th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-[var(--danger)] py-4 text-sm"
                    >
                      Error: {error.message}
                    </td>
                  </tr>
                ) : expenses?.length > 0 ? (
                  <ExpensesRows
                    expenses={expenses}
                    onEdit={(exp) =>
                      setModal((m) => ({ ...m, editObject: exp }))
                    }
                    onDelete={(id) =>
                      setModal((m) => ({ ...m, deleteObjectId: id }))
                    }
                    deleting={deleting}
                  />
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-4 text-[oklch(var(--foreground)/0.6)] text-sm italic"
                    >
                      No expenses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Loader loading={loading} />
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
      </div>

      <ModalPortal>
        <Modal
          title="Add Expense"
          isOpen={modal.isInsert}
          onClose={() => setModal((m) => ({ ...m, isInsert: false }))}
          primaryLabel={modal.insertLoading ? "Saving..." : "Save"}
          primaryDisabled={modal.insertLoading}
          onPrimary={() => expenseFormRef.current?.submit()}
          secondaryLabel="Cancel"
          primaryVariant="primary"
          secondaryVariant="secondary"
        >
          {modal.isInsert && (
            <ExpenseForm
              ref={expenseFormRef}
              onSuccess={() => {
                setModal((m) => ({ ...m, isInsert: false }));
                reloadExpenses();
              }}
              closeModal={() => setModal((m) => ({ ...m, isInsert: false }))}
              onLoadingChange={handleInsertLoading}
            />
          )}
        </Modal>

        <Modal
          title="Edit Expense"
          isOpen={!!modal.editObject}
          onClose={() => setModal((m) => ({ ...m, editObject: null }))}
          primaryLabel={modal.editLoading ? "Updating..." : "Update"}
          primaryDisabled={modal.editLoading}
          onPrimary={() => editFormRef.current?.submit()}
          secondaryLabel="Cancel"
          primaryVariant="primary"
          secondaryVariant="secondary"
        >
          {!!modal.editObject && (
            <ExpenseForm
              ref={editFormRef}
              onSuccess={() => {
                setModal((m) => ({ ...m, editObject: null }));
                reloadExpenses();
              }}
              closeModal={() => setModal((m) => ({ ...m, editObject: null }))}
              onLoadingChange={handleEditLoading}
              {...modal.editObject}
            />
          )}
        </Modal>

        <Modal
          title="Delete Expense"
          isOpen={!!modal.deleteObjectId}
          onClose={() => setModal((m) => ({ ...m, deleteObjectId: null }))}
          primaryLabel={deleting ? "Deleting..." : "Delete"}
          primaryDisabled={deleting}
          onPrimary={async () => {
            if (modal.deleteObjectId) {
              await handleDelete(modal.deleteObjectId);
              setModal((m) => ({ ...m, deleteObjectId: null }));
              reloadExpenses();
            }
          }}
          secondaryLabel="Cancel"
          primaryVariant="danger"
          secondaryVariant="secondary"
        >
          <p>Are you sure you want to delete this expense?</p>
        </Modal>
      </ModalPortal>
    </>
  );
}

export default ExpensesTable;
