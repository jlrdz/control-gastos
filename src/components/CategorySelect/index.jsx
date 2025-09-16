import { useEffect } from "react"
import { useSupabaseFetch } from "../../hooks/database/useSupabaseFetch"

function CategorySelect({ value, onChange }) {
    const { loading, data: categories, error, fetchData } = useSupabaseFetch()

    useEffect(() => {
        fetchData("categories", "id, nombre", { orderBy: { column: "nombre", ascending: true } })
    }, [fetchData])

    return (
        <select id="category" value={value} onChange={onChange}>
            <option value="">All</option>
            {loading && <option disabled>Loading...</option>}
            {error && <option disabled>Error loading</option>}
            {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                </option>
            ))}
        </select>
    )
}

export default CategorySelect
