import { useState, useCallback } from "react";
import { supabase } from "../../database/supabaseClient";

/**
 * Custom hook to fetch data from Supabase with optional
 * ordering, filters, and pagination.
 */
export function useSupabaseFetch() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0); // 🔹 track total rows for pagination

    /**
     * Fetch data from a Supabase table.
    */
    const fetchData = useCallback(
        async (table, select = "*", options = {}, filters = [], range = null) => {
            setLoading(true);
            setError(null);

            try {
                // Base query with exact count (needed for pagination)
                let query = supabase.from(table).select(select, { count: "exact" });

                // Apply ordering if provided
                if (options.orderBy) {
                    const { column, ascending = true } = options.orderBy;
                    query = query.order(column, { ascending });
                }

                // Apply dynamic filters
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

                // Apply pagination range if provided
                if (range) {
                    query = query.range(range.from, range.to);
                }

                // Execute query
                const { data, error, count } = await query;

                if (error) throw error;

                setData(data);
                setTotalCount(count ?? 0); // store total rows (needed for totalPages)
            } catch (err) {
                setError(err);
                setData(null);
                setTotalCount(0);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { loading, data, error, totalCount, fetchData };
}
