import { useCallback, useState } from "react"
import { supabase } from "../../database/supabaseClient"

export const useSupabaseInsert = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const insertData = useCallback(async (table, newData) => {
        try {
            setLoading(true)
            const { data, error } = await supabase.from(table).insert([newData])
            if (error) throw error
            setLoading(false)
            return data
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }, [])

    return { loading, error, insertData }
}
