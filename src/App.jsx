import { useEffect, useState, useRef } from "react";
import { useSupabaseFetch } from "./hooks/database/useSupabaseFetch";
import { usePagination } from "./hooks/usePagination";
import Filters from "./components/Filters";
import ExpensesTable from "./components/ExpensesTable";
import Modal from "./components/Modal";
import ExpenseForm from "./components/ExpenseForm";
import Card from "./components/Card";

function App() {
  const { loading, data: expenses, error, totalCount, fetchData } = useSupabaseFetch();
  const [filters, setFilters] = useState([]);

  const {
    pageSize,
    setPageSize,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(totalCount);

  // State for Add Expense modal
  const [insertingExpense, setInsertingExpense] = useState(false);

  // State for Edit Expense modal
  const [editingExpense, setEditingExpense] = useState(null);

  // Ref for form methods
  const expenseFormRef = useRef(null);
  const editFormRef = useRef(null);

  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const reloadExpenses = () => {
    fetchData(
      "expenses",
      "id, fecha, descripcion, monto, moneda, forma_pago, categoria_id, categories(nombre)",
      { orderBy: { column: "fecha", ascending: true } },
      filters,
      { from, to }
    );
  };

  useEffect(() => {
    reloadExpenses();
  }, [filters, currentPage, pageSize]);

  return (
    <div className="app-container">
      <h1>Expenses</h1>

      {/* Filters section */}
      <Card>
        <Filters onApply={setFilters} expenses={expenses || []} />
      </Card>

      {/* Add Expense Modal */}
      <Modal
        title="Add Expense"
        isOpen={insertingExpense}
        onClose={() => setInsertingExpense(false)}
        primaryLabel={expenseFormRef.current?.loading ? "Saving..." : "Save"}
        primaryDisabled={expenseFormRef.current?.loading}
        onPrimary={() => expenseFormRef.current?.submit()}
        secondaryLabel="Cancel"
        primaryVariant="primary"
        secondaryVariant="secondary"
      >
        <ExpenseForm
          ref={expenseFormRef}
          onSuccess={reloadExpenses}
          closeModal={() => setInsertingExpense(false)}
        />
      </Modal>

      {/* Edit Expense Modal */}
      <Modal
        title="Edit Expense"
        isOpen={!!editingExpense}
        onClose={() => setEditingExpense(null)}
        primaryLabel={editFormRef.current?.loading ? "Updating..." : "Update"}
        primaryDisabled={editFormRef.current?.loading}
        onPrimary={() => editFormRef.current?.submit()}
        secondaryLabel="Cancel"
        primaryVariant="primary"
        secondaryVariant="secondary"
      >
        {editingExpense && (
          <ExpenseForm
            ref={editFormRef}
            onSuccess={reloadExpenses}
            closeModal={() => setEditingExpense(null)}
            {...editingExpense}
          />
        )}
      </Modal>

      {/* Expenses table */}
      <Card>
        <ExpensesTable
          expenses={expenses || []}
          loading={loading}
          error={error}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          goToPage={goToPage}
          nextPage={nextPage}
          prevPage={prevPage}
          onDeleteSuccess={reloadExpenses}
          onEdit={(expense) => setEditingExpense(expense)}
          onAdd={() => setInsertingExpense(true)}
        />
      </Card>
    </div>
  );
}

export default App;
