import { useSupabaseDelete } from "./database/useSupabaseDelete";
import { useCrudNotifications } from "./useCrudNotifications";

/**
 * Hook for handling expenses table interactions (delete action + notifications).
 */
export function useExpensesTable({ onDeleteSuccess } = {}) {
    const { deleteData, loading } = useSupabaseDelete();
    const { notifySuccess, notifyError } = useCrudNotifications();

    const handleDelete = async (id) => {
        if (!id) {
            notifyError("delete", "Expense");
            return;
        }

        // Call deleteData → destructure Supabase-like response
        const { error } = await deleteData("expenses", id);

        if (error) {
            notifyError("delete", error.message || "Expense");
            return;
        }

        notifySuccess("delete", "Expense");

        setTimeout(() => {
            if (typeof onDeleteSuccess === "function") {
                onDeleteSuccess();
            }
        }, 1000);
    };

    return {
        handleDelete,
        deleting: loading,
    };
}
