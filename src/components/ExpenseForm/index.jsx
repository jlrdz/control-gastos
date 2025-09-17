import { useExpenseForm } from "../../hooks/useExpenseForm";
import CategorySelect from "../CategorySelect";
import CurrencySelect from "../CurrencySelect";
import PaymentMethodSelect from "../PaymentMethodSelect";
import styles from "./index.module.scss";

/**
 * ExpenseForm component
 * UI only — logic is handled by useExpenseForm.
 */
export default function ExpenseForm({ onSuccess, closeModal }) {
    const { state, changeValue, handleSubmit, loading, error } =
        useExpenseForm({}, { onSuccess, closeModal });

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
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
                    className={styles.select}
                />
            </div>

            {/* Error feedback */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
            >
                {loading ? "Saving..." : "Save Expense"}
            </button>
        </form>
    );
}
