import { constants } from "../../../config/constants";
import CustomSelect from "../CustomSelect";

function CurrencySelect({
  value,
  onChange,
  showAll = true,
  className,
  placeholder = "Select currency",
  required,
}) {
  const currencies = [...constants.currencies].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
  );

  const options = [];

  if (showAll) {
    options.push({ value: "", label: "All" });
  }

  currencies.forEach((c) => {
    options.push({ value: c.id, label: c.nombre });
  });

  return (
    <CustomSelect
      id="moneda"
      name="moneda"
      value={value}
      onChange={onChange}
      required={required}
      options={options}
      placeholder={placeholder}
      className={className}
    />
  );
}

export default CurrencySelect;
