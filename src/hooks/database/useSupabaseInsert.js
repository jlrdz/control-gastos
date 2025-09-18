import { useCallback, useState } from "react";
import { supabase } from "../../database/supabaseClient";

/**
 * Hook for inserting rows into Supabase.
 * - Keeps a loading state for UI.
 * - Each insertData call returns { data, error } (Supabase style).
 */
export const useSupabaseInsert = () => {
    const [loading, setLoading] = useState(false);

    const insertData = useCallback(async (table, newData) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from(table)
                .insert([newData])
                .select(); // 🔹 return inserted row(s)

            setLoading(false);
            return { data, error };
        } catch (err) {
            setLoading(false);
            return { data: null, error: err };
        }
    }, []);

    return { loading, insertData };
};
