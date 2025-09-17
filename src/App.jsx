import { useEffect, useState } from "react";
import { useSupabaseFetch } from "./hooks/database/useSupabaseFetch";
import { usePagination } from "./hooks/usePagination";
import Filters from "./components/Filters";
import ExpensesTable from "./components/ExpensesTable";
import ExpensesSummary from "./components/ExpensesSummary";
import Modal from "./components/Modal";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  // Custom hook to fetch data from Supabase
  const { loading, data: expenses, error, totalCount, fetchData } = useSupabaseFetch();

  // Local state to manage applied filters
  const [filters, setFilters] = useState([]);

  // Custom hook to manage pagination (current page, page size, total pages)
  const {
    pageSize,
    setPageSize,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(totalCount);

  // Calculate range for Supabase query based on current page and page size
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  // Fetch expenses whenever filters, page, or page size change
  useEffect(() => {
    fetchData(
      "expenses",
      "id, fecha, descripcion, monto, moneda, forma_pago, categories(nombre)",
      { orderBy: { column: "fecha", ascending: true } },
      filters,
      { from, to } //pagination range
    );
  }, [filters, fetchData, currentPage, pageSize]);

  return (
    <div>
      <h1>Expenses</h1>

      {/* Filters section (applies filters to the query) */}
      <Filters onApply={setFilters} />

      {/* Summary of expenses (totals, counts, etc.) */}
      <ExpensesSummary expenses={expenses || []} />

      {/* Modal wrapper for adding a new expense */}
       <Modal title="Add Expense" triggerText="+ Add Expense">
        <ExpenseForm onSuccess={fetchData} closeModal={() => {}} />
      </Modal>

      {/* Expenses table with pagination controls */}
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
      />
    </div>
  );
}

export default App;
