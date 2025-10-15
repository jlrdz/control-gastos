import { constants } from "../../../config/constants";
import CustomSelect from "../CustomSelect";

function PaymentMethodSelect({
  value,
  onChange,
  showAll = true,
  className,
  placeholder = "Select payment method",
  required,
}) {
  const paymentMethods = [...constants.paymentMethods].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
  );

  const options = [];

  if (showAll) {
    options.push({ value: "", label: "All" });
  }

  paymentMethods.forEach((pm) => {
    options.push({ value: pm.id, label: pm.nombre });
  });

  return (
    <CustomSelect
      id="forma_pago"
      name="forma_pago"
      value={value}
      onChange={onChange}
      required={required}
      options={options}
      placeholder={placeholder}
      className={className}
    />
  );
}

export default PaymentMethodSelect;
