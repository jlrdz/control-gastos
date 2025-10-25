import Sorting from "../../Tables/Sorting";


export default function ExpensesTableHeaders({ sortConfig, setSortConfig }) {
  return (
    <tr className="text-left text-[var(--primary)] text-sm font-semibold">
      <th className="px-4 py-3 w-[110px]">
        <Sorting
          columnKey="fecha"
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        >
          Date
        </Sorting>
      </th>

      <th className="px-4 py-3 w-[400px]">
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
  );
}
