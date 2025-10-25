import { useState, useEffect, useRef, useCallback } from "react";
import { useExpensesDelete } from "./useExpenseDelete";
import { useSupabaseFetch } from "./database/useSupabaseFetch";
import { usePagination } from "./usePagination";

export function useExpensesTable(filters) {
  const { handleDelete, deleting } = useExpensesDelete();

  const [modal, setModal] = useState({
    isInsert: false,
    editObject: null,
    deleteObjectId: null,
    insertLoading: false,
    editLoading: false,
  });

  const expenseFormRef = useRef(null);
  const editFormRef = useRef(null);

  const [sortConfig, setSortConfig] = useState({
    key: "fecha",
    direction: "desc",
  });

  const {
    loading,
    data: expenses,
    error,
    totalCount,
    fetchData,
  } = useSupabaseFetch();

  const {
    currentPage,
    pageSize,
    setPageSize,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
    startRecord,
    endRecord,
    pageNumbers,
  } = usePagination(totalCount);

  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const reloadExpenses = useCallback(() => {
    fetchData(
      "expenses",
      "id, fecha, descripcion, monto, moneda, forma_pago, categoria_id, categories(nombre)",
      {
        orderBy: {
          column: sortConfig.key,
          ascending: sortConfig.direction === "asc",
        },
      },
      filters,
      { from, to }
    );
  }, [filters, from, to, fetchData, sortConfig]);

  useEffect(() => {
    reloadExpenses();
  }, [reloadExpenses]);

  const handleInsertLoading = useCallback(
    (val) => setModal((m) => ({ ...m, insertLoading: val })),
    []
  );

  const handleEditLoading = useCallback(
    (val) => setModal((m) => ({ ...m, editLoading: val })),
    []
  );

  return {
    expenses,
    error,
    loading,
    totalCount,
    modal,
    setModal,
    expenseFormRef,
    editFormRef,
    deleting,
    handleDelete,
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
    nextPage,
    prevPage,
    goToPage,
    startRecord,
    endRecord,
    pageNumbers,
    sortConfig,
    setSortConfig,
    reloadExpenses,
    handleInsertLoading,
    handleEditLoading,
  };
}
