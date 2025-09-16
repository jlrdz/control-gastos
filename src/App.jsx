import { useEffect, useState } from "react";
import { useSupabaseFetch } from "./hooks/database/useSupabaseFetch";
import Filters from "./components/Filters";
import ExpensesTable from "./components/ExpensesTable";
import ExpensesSummary from "./components/ExpensesSummary";

function App() {
  const { loading, data: expenses, error, fetchData } = useSupabaseFetch();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetchData(
      "expenses",
      "id, fecha, descripcion, monto, moneda, forma_pago, categories(nombre)",
      { orderBy: { column: "fecha", ascending: false } },
      filters
    );
  }, [filters, fetchData]);

  return (
    <div>
      <h1>Expenses</h1>
      <Filters onApply={setFilters} />
      <ExpensesTable expenses={expenses || []} loading={loading} error={error} />
      <ExpensesSummary expenses={expenses || []} />
    </div>
  );
}

export default App;
