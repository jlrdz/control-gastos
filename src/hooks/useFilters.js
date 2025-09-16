import { useForm } from "./useForm";
import { useEffect, useMemo } from "react";

export const useFilters = (initialValues, onApply) => {
    const { state, changeValue, handleReset } = useForm({ values: initialValues });

    const safeValues = useMemo(() => {
        return {
            startDate: state.values?.startDate ?? "",
            endDate: state.values?.endDate ?? "",
            category: state.values?.category ?? "",
            paymentMethod: state.values?.paymentMethod ?? "",
            currency: state.values?.currency ?? "",
            search: state.values?.search ?? "",
        };
    }, [state.values]);

    const buildFilters = (value) => {
        const filters = [];
        if (value.startDate) filters.push({ column: "fecha", operator: "gte", value: value.startDate });
        if (value.endDate) filters.push({ column: "fecha", operator: "lte", value: value.endDate });
        if (value.category) filters.push({ column: "categoria_id", operator: "eq", value: value.category });
        if (value.paymentMethod) filters.push({ column: "forma_pago", operator: "eq", value: value.paymentMethod });
        if (value.currency) filters.push({ column: "moneda", operator: "eq", value: value.currency });
        if (value.search) filters.push({ column: "descripcion", operator: "ilike", value: `%${value.search}%` });
        return filters;
    };

    useEffect(() => {
        onApply(buildFilters(safeValues));
    }, [
        safeValues.startDate,
        safeValues.endDate,
        safeValues.category,
        safeValues.paymentMethod,
        safeValues.currency,
        safeValues.search,
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
