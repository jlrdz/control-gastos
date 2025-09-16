import { constants } from "../../config/constants";

function PaymentMethodSelect({ value, onChange }) {
    const paymentMethods = [...constants.paymentMethods].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    return (
        <select id="paymentMethod" value={value} onChange={onChange}>
            <option value="">All</option>
            {paymentMethods.map((pm) => (
                <option key={pm.id} value={pm.id}>
                    {pm.nombre}
                </option>
            ))}
        </select>
    );
}

export default PaymentMethodSelect;
