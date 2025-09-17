import { useEffect } from "react";
import { useSupabaseFetch } from "../../hooks/database/useSupabaseFetch";

function CategorySelect({ value, onChange, showAll = true, className }) {
    const { loading, data: categories, error, fetchData } = useSupabaseFetch();

    useEffect(() => {
        fetchData("categories", "id, nombre", {
            orderBy: { column: "nombre", ascending: true },
        });
    }, [fetchData]);

    return (
        <select
            id="categoria_id"
            value={value}
            onChange={onChange}
            required
            className={className}
        >
            {showAll && <option value="all">All</option>}
            {loading && <option disabled>Loading...</option>}
            {error && <option disabled>Error loading</option>}
            {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                </option>
            ))}
        </select>
    );
}

export default CategorySelect;
