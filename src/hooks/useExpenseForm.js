import { useForm } from "./useForm";
import { useMemo, useState, useEffect } from "react";
import { useCrudNotifications } from "./useCrudNotifications";
import { useSupabaseInsert } from "./database/useSupabaseInsert";
import { useSupabaseUpdate } from "./database/useSupabaseUpdate";

/**
 * Hook for handling expense form logic (state, submit, reset, notifications).
 */
export const useExpenseForm = (
  initialValues = {},
  { onSuccess, closeModal } = {}
) => {
  const { state, changeValue, handleReset } = useForm({
    values: {
      id: null,
      fecha: "",
      descripcion: "",
      monto: "",
      moneda: "",
      forma_pago: "",
      categoria_id: "",
      ...initialValues,
    },
  });

  const [error, setError] = useState(null);
  const { notifySuccess, notifyError } = useCrudNotifications();

  const { insertData, loading: insertLoading } = useSupabaseInsert();
  const { updateData, loading: updateLoading } = useSupabaseUpdate();

  // Merge both loading states
  const loading = insertLoading || updateLoading;

  // Safe values to avoid undefined
  const safeValues = useMemo(
    () => ({
      id: state.values?.id ?? null,
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
   * Handle form submission (insert or update via Supabase).
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let resp;

      if (safeValues.id) {
        // Update
        resp = await updateData("expenses", safeValues.id, {
          fecha: safeValues.fecha,
          descripcion: safeValues.descripcion,
          monto: parseFloat(safeValues.monto),
          moneda: safeValues.moneda,
          forma_pago: safeValues.forma_pago,
          categoria_id: safeValues.categoria_id,
        });
      } else {
        // Insert
        resp = await insertData("expenses", {
          fecha: safeValues.fecha,
          descripcion: safeValues.descripcion,
          monto: parseFloat(safeValues.monto),
          moneda: safeValues.moneda,
          forma_pago: safeValues.forma_pago,
          categoria_id: safeValues.categoria_id,
          origen: "manual",
        });
      }

      if (resp.error) throw resp.error;

      if (onSuccess) onSuccess(); // refresh parent table
      handleReset();

      notifySuccess(safeValues.id ? "update" : "create", "Expense");

      if (closeModal) {
        setTimeout(() => closeModal(), 1000);
      }
    } catch (err) {
      setError(err.message);
      notifyError(safeValues.id ? "update" : "create", "Expense");
    }
  };

  useEffect(() => {
    return () => {
      handleReset();
      setError(null);
    };
  }, []);

  return {
    state: safeValues,
    changeValue,
    reset: handleReset,
    handleSubmit,
    loading,
    error,
  };
};
