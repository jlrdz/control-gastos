import { useEffect } from "react";
import { useSupabaseFetch } from "../../hooks/database/useSupabaseFetch";

function CategorySelect({ value, onChange, showAll = true, className, placeholder }) {
    const { loading, data: categories, error, fetchData } = useSupabaseFetch();

    useEffect(() => {
        fetchData("categories", "id, nombre", {
            orderBy: { column: "nombre", ascending: true },
        });
    }, [fetchData]);

    const valueExists = categories?.some((c) => c.id === value);

    return (
        <select
            id="categoria_id"
            value={value}
            onChange={onChange}
            required
            className={className}
        >
            {/* Optional placeholder */}
            {placeholder && <option value="">{placeholder}</option>}

            {/* "All" option */}
            {showAll && <option value="">All</option>}

            {/* Opción temporal si hay un valor pero aún no está en la lista */}
            {value && !valueExists && (
                <option value={value}>Loading...</option>
            )}

            {/* Loading / Error / Data */}
            {loading && !categories?.length && <option disabled>Loading...</option>}
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
