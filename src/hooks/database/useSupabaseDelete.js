import { useCallback, useState } from "react";
import { supabase } from "../../database/supabaseClient";

/**
 * Hook to handle deletions in Supabase with loading state.
 * - Each call to deleteData returns { data, error } like Supabase.
 * - Keeps a local loading state for UI integration.
 */
export const useSupabaseDelete = () => {
    const [loading, setLoading] = useState(false);

    const deleteData = useCallback(async (table, id) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from(table)
                .delete()
                .eq("id", id); // 👈 assumes PK column is "id"

            setLoading(false);
            return { data, error }; // 🔹 always return explicit result
        } catch (err) {
            setLoading(false);
            return { data: null, error: err }; // 🔹 normalize catch into Supabase-style result
        }
    }, []);

    return { loading, deleteData };
};
