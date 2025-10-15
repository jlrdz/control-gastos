import { useEffect } from "react";
import { useSupabaseFetch } from "../../../hooks/database/useSupabaseFetch";
import CustomSelect from "../CustomSelect";

function CategorySelect({
  value,
  onChange,
  showAll = true,
  className,
  placeholder = "Select category",
  required,
}) {
  const { loading, data: categories, error, fetchData } = useSupabaseFetch();

  useEffect(() => {
    fetchData("categories", "id, nombre", {
      orderBy: { column: "nombre", ascending: true },
    });
  }, [fetchData]);

  const valueExists = categories?.some((c) => c.id === value);

  const options = [];

  if (showAll) {
    options.push({ value: "", label: "All" });
  }

  if (loading && !categories?.length) {
    options.push({ value: "", label: "Loading...", disabled: true });
  }

  if (error) {
    options.push({ value: "", label: "Error loading", disabled: true });
  }

  if (categories?.length) {
    categories.forEach((cat) =>
      options.push({ value: cat.id, label: cat.nombre })
    );
  }

  if (value && !valueExists) {
    options.push({ value, label: "Loading..." });
  }

  return (
    <CustomSelect
      id="categoria_id"
      name="categoria_id"
      value={value}
      onChange={onChange}
      required={required}
      options={options}
      placeholder={placeholder}
      className={className}
    />
  );
}

export default CategorySelect;
