import { constants } from "../../config/constants";

function PaymentMethodSelect({ value, onChange, showAll = true, className }) {
    const paymentMethods = [...constants.paymentMethods].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    return (
        <select
            id="forma_pago"
            value={value}
            onChange={onChange}
            required
            className={className}
        >
            {showAll && <option value="all">All</option>}
            {paymentMethods.map((pm) => (
                <option key={pm.id} value={pm.id}>
                    {pm.nombre}
                </option>
            ))}
        </select>
    );
}

export default PaymentMethodSelect;
