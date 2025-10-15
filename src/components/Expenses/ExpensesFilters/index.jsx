import CategorySelect from "../../Selects/CategorySelect";
import CurrencySelect from "../../Selects/CurrencySelect";
import PaymentMethodSelect from "../../Selects/PaymentMethodSelect";
import SecondaryButton from "../../Buttons/SecondaryButton";
import Input from "../../Input";
import { useFilters } from "../../../hooks/useFilters";

function ExpensesFilters({ onApply }) {
  const { state, changeValue, reset } = useFilters(
    {
      fecha_inicio: "",
      fecha_final: "",
      categoria_id: "",
      forma_pago: "",
      moneda: "",
      texto_busqueda: "",
    },
    onApply
  );

  const handleSelectChange = (field) => (newValue) => {
    changeValue({ target: { name: field, value: newValue } });
  };

  return (
    <form
      onReset={reset}
      className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
        text-[var(--foreground)]
        transition-colors duration-300
      "
    >
      {/* From */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="fecha_inicio"
          className="text-sm font-medium opacity-80 dark:text-[var(--primary)]"
        >
          From:
        </label>
        <Input
          type="date"
          id="fecha_inicio"
          name="fecha_inicio"
          value={state.fecha_inicio}
          onChange={changeValue}
        />
      </div>

      {/* To */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="fecha_final"
          className="text-sm font-medium opacity-80 dark:text-[var(--primary)]"
        >
          To:
        </label>
        <Input
          type="date"
          id="fecha_final"
          name="fecha_final"
          value={state.fecha_final}
          onChange={changeValue}
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="categoria_id"
          className="text-sm font-medium opacity-80 dark:text-[var(--primary)]"
        >
          Category:
        </label>
        <CategorySelect
          id="categoria_id"
          value={state.categoria_id}
          onChange={handleSelectChange("categoria_id")}
          placeholder="All"
        />
      </div>

      {/* Payment Method */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="forma_pago"
          className="text-sm font-medium opacity-80 dark:text-[var(--primary)]"
        >
          Payment method:
        </label>
        <PaymentMethodSelect
          id="forma_pago"
          value={state.forma_pago}
          onChange={handleSelectChange("forma_pago")}
          placeholder="All"
        />
      </div>

      {/* Currency */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="moneda"
          className="text-sm font-medium opacity-80 dark:text-[var(--primary)]"
        >
          Currency:
        </label>
        <CurrencySelect
          id="moneda"
          value={state.moneda}
          onChange={handleSelectChange("moneda")}
          placeholder="All"
        />
      </div>

      {/* Search */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="texto_busqueda"
          className="text-sm font-medium opacity-80 dark:text-[var(--primary)]"
        >
          Search:
        </label>
        <Input
          type="text"
          id="texto_busqueda"
          name="texto_busqueda"
          placeholder="Description or reference..."
          value={state.texto_busqueda}
          onChange={changeValue}
        />
      </div>

      {/* Actions */}
      <div className="lg:col-span-3 flex justify-end items-center mt-2">
        <SecondaryButton type="reset">Clear filters</SecondaryButton>
      </div>
    </form>
  );
}

export default ExpensesFilters;
