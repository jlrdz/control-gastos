import { useState } from "react";
import Filters from "./components/Filters";
import ExpensesTable from "./components/ExpensesTable";
import Card from "./components/Card";
import styles from "./styles/App.module.scss";

function App() {
  // State for filters
  const [filters, setFilters] = useState({});

  return (
    <div className="app-container">
      <h1 className={styles.title}>Personal Expense Tracker</h1>

      {/* Filters */}
      <Card>
        <Filters onApply={setFilters} />
      </Card>

      {/* Expenses table */}
      <Card>
        <ExpensesTable filters={filters} />
      </Card>
    </div>
  );
}

export default App;
