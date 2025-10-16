// hooks/useExpensesTable.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useExpensesDelete } from "./useExpenseDelete";
import { useSupabaseFetch } from "./database/useSupabaseFetch";
import { usePagination } from "./usePagination";

export function useExpensesTable(filters) {
    const { handleDelete, deleting } = useExpensesDelete();

    // Estado unificado de modales + loading
    const [modal, setModal] = useState({
        isInsert: false,
        editObject: null,       // objeto expense
        deleteObjectId: null,   // id del expense
        insertLoading: false,
        editLoading: false,
    });

    const expenseFormRef = useRef(null);
    const editFormRef = useRef(null);

    const [sortConfig, setSortConfig] = useState({
        key: "fecha",
        direction: "desc",
    });

    // Fetch a supabase
    const { loading, data: expenses, error, totalCount, fetchData } =
        useSupabaseFetch();

    // Paginación
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
            { orderBy: { column: sortConfig.key, ascending: sortConfig.direction === "asc" } },
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
        // datos
        expenses,
        error,
        loading,
        totalCount,

        // modales
        modal,
        setModal,

        // refs
        expenseFormRef,
        editFormRef,

        // delete
        deleting,
        handleDelete,

        // paginación
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

        // sorting
        sortConfig,
        setSortConfig,

        // helpers
        reloadExpenses,
        handleInsertLoading,
        handleEditLoading,
    };
}
