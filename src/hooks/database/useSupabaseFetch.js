import { useState, useCallback } from "react";
import { supabase } from "../../database/supabaseClient";

export function useSupabaseFetch() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (table, select = "*", options = {}, filters = []) => {
            setLoading(true);
            setError(null);

            try {
                let query = supabase.from(table).select(select);

                // 🔹 Aplicar orden si viene en options
                if (options.orderBy) {
                    const { column, ascending = true } = options.orderBy;
                    query = query.order(column, { ascending });
                }

                // 🔹 Aplicar filtros dinámicos
                filters.forEach((f) => {
                    switch (f.operator) {
                        case "eq":
                            query = query.eq(f.column, f.value);
                            break;
                        case "gte":
                            query = query.gte(f.column, f.value);
                            break;
                        case "lte":
                            query = query.lte(f.column, f.value);
                            break;
                        case "ilike":
                            query = query.ilike(f.column, f.value);
                            break;
                        default:
                            break;
                    }
                });

                const { data, error } = await query;

                if (error) throw error;
                setData(data);
            } catch (err) {
                setError(err);
                setData(null);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { loading, data, error, fetchData };
}
