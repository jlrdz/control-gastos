import { useState } from "react";
import Filters from "../../components/Filters";
import ExpensesTable from "../../components/ExpensesTable";
import Card from "../../components/Card";

export default function Expenses() {
  const [filters, setFilters] = useState({});

  return (
    <section className="space-y-2">
      <Card>
        <Filters onApply={setFilters} />
      </Card>
      <Card>
        <ExpensesTable filters={filters} />
      </Card>
    </section>
  );
}
