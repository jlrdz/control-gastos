import { useCallback, useState } from "react"
import { supabase } from "../../database/supabaseClient"

export const useSupabaseDelete = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deleteData = useCallback(async (table, id) => {
        try {
            setLoading(true)
            const { data, error } = await supabase.from(table).delete().eq("id", id) // 👈 asumo PK "id"
            if (error) throw error
            setLoading(false)
            return data
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }, [])

    return { loading, error, deleteData }
}
