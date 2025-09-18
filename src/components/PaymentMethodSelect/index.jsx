import { constants } from "../../config/constants";

function PaymentMethodSelect({ value, onChange, showAll = true, className, placeholder }) {
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
            {/* Optional placeholder */}
            {placeholder && <option value="">{placeholder}</option>}

            {/* "All" option */}
            {showAll && <option value="all">All</option>}

            {/* Payment method options */}
            {paymentMethods.map((pm) => (
                <option key={pm.id} value={pm.id}>
                    {pm.nombre}
                </option>
            ))}
        </select>
    );
}

export default PaymentMethodSelect;
