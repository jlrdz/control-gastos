import { useCallback, useState } from "react"
import { supabase } from "../../database/supabaseClient"

export const useSupabaseUpdate = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateData = useCallback(async (table, id, updatedData) => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from(table)
                .update(updatedData)
                .eq("id", id)
            if (error) throw error
            setLoading(false)
            return data
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }, [])

    return { loading, error, updateData }
}
