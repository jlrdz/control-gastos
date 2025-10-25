import React, { useState } from "react";
import Pagination from "../../Tables/Pagination";
import Modal from "../../Modal";
import ExpenseForm from "../ExpenseForm";
import TableSummary from "../ExpensesSummary";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { useExpensesTable } from "../../../hooks/useExpensesTable";
import ModalPortal from "../../Modal/ModalPortal";
import { Plus } from "lucide-react";
import ExpensesTableHeaders from "../ExpensesTableHeaders";
import ExpensesTableRows from "../ExpensesTableRows";
import CustomTable from "../../Tables/CustomTable";

function ExpensesTable({ filters }) {
  const {
    expenses,
    error,
    loading,
    totalCount,
    modal,
    setModal,
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

  const [triggerInsert, setTriggerInsert] = useState(false);
  const [triggerEdit, setTriggerEdit] = useState(false);

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

        <CustomTable
          header={
            <ExpensesTableHeaders
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
            />
          }
          body={
            <ExpensesTableRows
              expenses={expenses}
              onEdit={(exp) => setModal((m) => ({ ...m, editObject: exp }))}
              onDelete={(id) => setModal((m) => ({ ...m, deleteObjectId: id }))}
              deleting={deleting}
            />
          }
          loading={loading}
          error={error}
          emptyMessage="No expenses found"
          colSpan={7}
          hasRows={expenses?.length > 0}
        />

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
          onPrimary={() => setTriggerInsert(true)}
          secondaryLabel="Cancel"
          primaryVariant="primary"
          secondaryVariant="secondary"
        >
          {modal.isInsert && (
            <ExpenseForm
              triggerSubmit={triggerInsert}
              onSubmitted={() => {
                setModal((m) => ({ ...m, isInsert: false }));
                reloadExpenses();
              }}
              onResetTrigger={() => setTriggerInsert(false)}
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
          onPrimary={() => setTriggerEdit(true)}
          secondaryLabel="Cancel"
          primaryVariant="primary"
          secondaryVariant="secondary"
        >
          {!!modal.editObject && (
            <ExpenseForm
              triggerSubmit={triggerEdit}
              onSubmitted={() => {
                setModal((m) => ({ ...m, editObject: null }));
                reloadExpenses();
              }}
              onResetTrigger={() => setTriggerEdit(false)}
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
