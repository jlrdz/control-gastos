import { useState, useEffect } from "react"
import { supabase } from "../database/supabaseClient"

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from("categories")
                    .select("id, nombre")

                if (error) throw error
                setCategories(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return { categories, loading, error }
}
