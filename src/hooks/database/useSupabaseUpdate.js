import { useCallback, useState } from "react";
import { supabase } from "../../database/supabaseClient";

/**
 * Hook for updating rows in Supabase.
 * - Keeps a loading state for UI.
 * - Each updateData call returns { data, error } (Supabase style).
 */
export const useSupabaseUpdate = () => {
    const [loading, setLoading] = useState(false);

    const updateData = useCallback(async (table, id, updatedData) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from(table)
                .update(updatedData)
                .eq("id", id)
                .select();

            setLoading(false);
            return { data, error };
        } catch (err) {
            setLoading(false);
            return { data: null, error: err };
        }
    }, []);

    return { loading, updateData };
};
