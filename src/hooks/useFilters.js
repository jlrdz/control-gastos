import { useForm } from "./useForm";
import { useEffect, useMemo } from "react";

export const useFilters = (initialValues, onApply) => {
    const { state, changeValue, handleReset } = useForm({ values: initialValues });

    const safeValues = useMemo(() => {
        return {
            fecha_inicio: state.values?.fecha_inicio ?? "",
            fecha_final: state.values?.fecha_final ?? "",
            categoria_id: state.values?.categoria_id ?? "",
            forma_pago: state.values?.forma_pago ?? "",
            moneda: state.values?.moneda ?? "",
            texto_busqueda: state.values?.texto_busqueda ?? "",
        };
    }, [state.values]);

    const buildFilters = (value) => {
        const filters = [];
        if (value.fecha_inicio) filters.push({ column: "fecha", operator: "gte", value: value.fecha_inicio });
        if (value.fecha_final) filters.push({ column: "fecha", operator: "lte", value: value.fecha_final });
        if (value.categoria_id) filters.push({ column: "categoria_id", operator: "eq", value: value.categoria_id });
        if (value.forma_pago) filters.push({ column: "forma_pago", operator: "eq", value: value.forma_pago });
        if (value.moneda) filters.push({ column: "moneda", operator: "eq", value: value.moneda });
        if (value.texto_busqueda) filters.push({ column: "descripcion", operator: "ilike", value: `%${value.texto_busqueda}%` });
        return filters;
    };

    useEffect(() => {
        onApply(buildFilters(safeValues));
    }, [
        safeValues.fecha_inicio,
        safeValues.fecha_final,
        safeValues.categoria_id,
        safeValues.forma_pago,
        safeValues.moneda,
        safeValues.texto_busqueda
    ]);

    const reset = () => {
        handleReset();
        onApply([]);
    };

    return {
        state: safeValues,
        changeValue,
        reset,
    };
};
