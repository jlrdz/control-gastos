import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useExpenseForm } from "../../../hooks/useExpenseForm";
import Input from "../../Input";
import CategorySelect from "../../Selects/CategorySelect";
import CurrencySelect from "../../Selects/CurrencySelect";
import PaymentMethodSelect from "../../Selects/PaymentMethodSelect";

const ExpenseForm = forwardRef(function ExpenseForm(
  { onSuccess, closeModal, onLoadingChange, ...initialValues },
  ref
) {
  const {
    state,
    changeValue,
    handleSubmit,
    loading,
    error
  } = useExpenseForm(initialValues, { onSuccess, closeModal });

  const formRef = useRef(null);

  useEffect(() => {
    if (typeof onLoadingChange === "function") {
      onLoadingChange(loading);
    }
  }, [loading]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) formRef.current.requestSubmit();
    },
    loading,
  }));

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
        //   required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
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
          required
        />
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
          step="1000"
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
          onChange={changeValue}
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
          onChange={changeValue}
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
          onChange={changeValue}
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
});

export default ExpenseForm;
