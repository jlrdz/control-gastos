import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useExpenseForm } from "../../../hooks/useExpenseForm";
import CategorySelect from "../../Selects/CategorySelect";
import CurrencySelect from "../../Selects/CurrencySelect";
import PaymentMethodSelect from "../../Selects/PaymentMethodSelect";
import styles from "./index.module.scss";

/**
 * ExpenseForm component
 * Reusable for both "create" and "edit" modes.
 * If it receives an `id` in initialValues, it will update instead of insert.
 */
const ExpenseForm = forwardRef(function ExpenseForm(
    { onSuccess, closeModal, onLoadingChange, ...initialValues },
    ref
) {
    const { state, changeValue, handleSubmit, loading, error } = useExpenseForm(
        initialValues,
        { onSuccess, closeModal }
    );

    const formRef = useRef(null);

    useEffect(() => {
        if (typeof onLoadingChange === "function") {
            onLoadingChange(loading);
        }
    }, [loading]);

    useImperativeHandle(ref, () => ({
        submit: () => {
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        },
        loading, 
    }));

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            {/* Date */}
            <div>
                <label className={styles.label}>Date:</label>
                <input
                    type="date"
                    name="fecha"
                    value={state.fecha}
                    onChange={changeValue}
                    required
                    className={styles.input}
                />
            </div>

            {/* Description */}
            <div>
                <label className={styles.label}>Description:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={state.descripcion}
                    onChange={changeValue}
                    required
                    className={styles.input}
                />
            </div>

            {/* Amount */}
            <div>
                <label className={styles.label}>Amount:</label>
                <input
                    type="number"
                    name="monto"
                    value={state.monto}
                    onChange={changeValue}
                    step="0.01"
                    required
                    className={styles.input}
                />
            </div>

            {/* Currency */}
            <div>
                <label className={styles.label}>Currency:</label>
                <CurrencySelect
                    value={state.moneda}
                    onChange={changeValue}
                    showAll={false}
                    placeholder="-- Select --"
                    className={styles.select}
                />
            </div>

            {/* Payment Method */}
            <div>
                <label className={styles.label}>Payment Method:</label>
                <PaymentMethodSelect
                    value={state.forma_pago}
                    onChange={changeValue}
                    showAll={false}
                    placeholder="-- Select --"
                    className={styles.select}
                />
            </div>

            {/* Category */}
            <div>
                <label className={styles.label}>Category:</label>
                <CategorySelect
                    value={state.categoria_id}
                    onChange={changeValue}
                    showAll={false}
                    placeholder="-- Select --"
                    className={styles.select}
                />
            </div>

            {/* Error feedback */}
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
});

export default ExpenseForm;
