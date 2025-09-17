import { useForm } from "./useForm";
import { useState, useMemo } from "react";
import { supabase } from "../database/supabaseClient";
import { useCrudNotifications } from "../utils/notifications";

/**
 * Hook for handling expense form logic (state, submit, reset, notifications).
 */
export const useExpenseForm = (
  initialValues = {},
  { onSuccess, closeModal } = {}
) => {
  const { state, changeValue, handleReset } = useForm({
    values: {
      fecha: "",
      descripcion: "",
      monto: "",
      moneda: "",
      forma_pago: "",
      categoria_id: "",
      ...initialValues, // override defaults if editing
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { notifySuccess, notifyError } = useCrudNotifications();

  // Ensure safe access to values
  const safeValues = useMemo(
    () => ({
      fecha: state.values?.fecha ?? "",
      descripcion: state.values?.descripcion ?? "",
      monto: state.values?.monto ?? "",
      moneda: state.values?.moneda ?? "",
      forma_pago: state.values?.forma_pago ?? "",
      categoria_id: state.values?.categoria_id ?? "",
    }),
    [state.values]
  );

  /**
   * Handle form submission (insert expense into Supabase).
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("expenses").insert([
        {
          fecha: safeValues.fecha,
          descripcion: safeValues.descripcion,
          monto: parseFloat(safeValues.monto),
          moneda: safeValues.moneda,
          forma_pago: safeValues.forma_pago,
          categoria_id: safeValues.categoria_id || null,
        },
      ]);

      if (error) throw error;

      if (onSuccess) onSuccess(); // refresh parent table
      handleReset(); // reset form

      notifySuccess("create", "Expense"); // ✅ toast success with entity

      if (closeModal) {
        setTimeout(() => closeModal(), 1000); // auto-close modal after 1s
      }
    } catch (err) {
      setError(err.message);
      notifyError("create", "Expense"); // ❌ toast error with entity
    } finally {
      setLoading(false);
    }
  };

  return {
    state: safeValues,   // safe form values
    changeValue,         // update a field
    reset: handleReset,  // reset form
    handleSubmit,        // submit logic
    loading,             // loading state
    error,               // error message
  };
};
