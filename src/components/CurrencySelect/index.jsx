import { constants } from "../../config/constants";

function CurrencySelect({ value, onChange, showAll = true, className }) {
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
            {showAll && <option value="all">All</option>}
            {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.nombre}
                </option>
            ))}
        </select>
    );
}

export default CurrencySelect;
