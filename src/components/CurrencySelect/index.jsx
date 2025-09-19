import { constants } from "../../config/constants";

function CurrencySelect({ value, onChange, showAll = true, className, placeholder }) {
    const currencies = [...constants.currencies].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    return (
        <select
            id="moneda"
            value={value}
            onChange={onChange}
            required
            className={className}
        >
            {/* Optional placeholder */}
            {placeholder && <option value="">{placeholder}</option>}

            {/* "All" option */}
            {showAll && <option value="">All</option>}

            {/* Currency options */}
            {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.nombre}
                </option>
            ))}
        </select>
    );
}

export default CurrencySelect;
