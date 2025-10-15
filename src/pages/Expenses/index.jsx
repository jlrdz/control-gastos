import { useState } from "react";
import ExpensesFilters from "../../components/Expenses/ExpensesFilters";
import ExpensesTable from "../../components/Expenses/ExpensesTable";
import Card from "../../components/Card";

export default function Expenses() {
  const [filters, setFilters] = useState({});

  return (
    <section
      className="
        w-full
        min-h-[calc(100vh-6rem)]
        px-6
        py-4
        flex
        flex-col
        gap-4
        bg-[oklch(var(--background))]
        text-[oklch(var(--foreground))]
        transition-colors
        duration-300
      "
    >
      <Card>
        <ExpensesFilters onApply={setFilters} />
      </Card>

      <Card>
        <ExpensesTable filters={filters} />
      </Card>
    </section>
  );
}
