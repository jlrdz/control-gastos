import { constants } from "../../utils/constants";

function CurrencySelect({ value, onChange }) {
    const currencies = [...constants.currencies].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    return (
        <select id="currency" value={value} onChange={onChange}>
            <option value="">All</option>
            {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.nombre}
                </option>
            ))}
        </select>
    );
}

export default CurrencySelect;
