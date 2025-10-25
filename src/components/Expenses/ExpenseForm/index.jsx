import { useEffect, useRef } from "react";
import { useExpenseForm } from "../../../hooks/useExpenseForm";
import Input from "../../Input";
import CategorySelect from "../../Selects/CategorySelect";
import CurrencySelect from "../../Selects/CurrencySelect";
import PaymentMethodSelect from "../../Selects/PaymentMethodSelect";
import clsx from "clsx";

export default function ExpenseForm({
  triggerSubmit,
  onSubmitted,
  onResetTrigger,
  onLoadingChange,
  ...initialValues
}) {
  const { state, changeValue, handleSubmit, loading, error } = useExpenseForm(
    initialValues,
    { onSuccess: onSubmitted }
  );

  const formRef = useRef(null);

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading]);

  useEffect(() => {
    if (triggerSubmit) {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
      onResetTrigger?.();
    }
  }, [triggerSubmit]);

  const handleSelectChange = (field) => (newValue) => {
    changeValue({ target: { name: field, value: newValue } });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      {/* Date */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="fecha"
          className="text-sm font-medium text-foreground/80 dark:text-primary"
        >
          Date
        </label>
        <Input
          type="date"
          id="fecha"
          name="fecha"
          value={state.fecha}
          onChange={changeValue}
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 relative">
        <label
          htmlFor="descripcion"
          className="text-sm font-medium text-foreground/80 dark:text-primary"
        >
          Description
        </label>
        <Input
          type="text"
          id="descripcion"
          name="descripcion"
          value={state.descripcion}
          onChange={changeValue}
          maxLength={60}
          required
        />
        <span
          className={clsx(
            "absolute right-3 bottom-[7px] text-[10px] select-none",
            state.descripcion.length >= 60
              ? "text-red-500"
              : "text-[color-mix(in_oklch,var(--primary),transparent_60%)]"
          )}
        >
          {state.descripcion.length}/60
        </span>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="monto"
          className="text-sm font-medium text-foreground/80 dark:text-primary"
        >
          Amount
        </label>
        <Input
          type="number"
          id="monto"
          name="monto"
          value={state.monto}
          onChange={changeValue}
          min="0"
          step="0.01"
          required
        />
      </div>

      {/* Currency */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="moneda"
          className="text-sm font-medium text-foreground/80 dark:text-primary"
        >
          Currency
        </label>
        <CurrencySelect
          id="moneda"
          value={state.moneda}
          onChange={handleSelectChange("moneda")}
          showAll={false}
          required
        />
      </div>

      {/* Payment Method */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="forma_pago"
          className="text-sm font-medium text-foreground/80 dark:text-primary"
        >
          Payment Method
        </label>
        <PaymentMethodSelect
          id="forma_pago"
          value={state.forma_pago}
          onChange={handleSelectChange("forma_pago")}
          showAll={false}
          required
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="categoria_id"
          className="text-sm font-medium text-foreground/80 dark:text-primary"
        >
          Category
        </label>
        <CategorySelect
          id="categoria_id"
          value={state.categoria_id}
          onChange={handleSelectChange("categoria_id")}
          showAll={false}
          required
        />
      </div>

      {/* Error feedback */}
      {error && (
        <p className="text-sm text-red-500 font-medium mt-2 text-center">
          {error}
        </p>
      )}
    </form>
  );
}
