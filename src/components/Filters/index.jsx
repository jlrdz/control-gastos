import CategorySelect from "../CategorySelect";
import CurrencySelect from "../CurrencySelect";
import PaymentMethodSelect from "../PaymentMethodSelect";
import { useFilters } from "../../hooks/useFilters";
import styles from "./index.module.scss";

function Filters({ onApply }) {
    const { state, changeValue, reset } = useFilters(
        {
            fecha_inicio: "",
            fecha_final: "",
            categoria_id: "",
            forma_pago: "",
            moneda: "",
            texto_busqueda: "",
        },
        onApply
    );

    return (
        <form onReset={reset} className={styles.filters}>
            {/* From */}
            <div className={styles.field}>
                <label htmlFor="fecha_inicio">From:</label>
                <input
                    type="date"
                    id="fecha_inicio"
                    name="fecha_inicio"
                    value={state.fecha_inicio}
                    onChange={changeValue}
                />
            </div>

            {/* To */}
            <div className={styles.field}>
                <label htmlFor="fecha_final">To:</label>
                <input
                    type="date"
                    id="fecha_final"
                    name="fecha_final"
                    value={state.fecha_final}
                    onChange={changeValue}
                />
            </div>

            {/* Category */}
            <div className={styles.field}>
                <label htmlFor="categoria_id">Category:</label>
                <CategorySelect
                    id="categoria_id"
                    value={state.categoria_id}
                    onChange={changeValue}
                    className={styles.select}
                />
            </div>

            {/* Payment Method */}
            <div className={styles.field}>
                <label htmlFor="forma_pago">Payment method:</label>
                <PaymentMethodSelect
                    id="forma_pago"
                    value={state.forma_pago}
                    onChange={changeValue}
                    className={styles.select}
                />
            </div>

            {/* Currency */}
            <div className={styles.field}>
                <label htmlFor="moneda">Currency:</label>
                <CurrencySelect
                    id="moneda"
                    value={state.moneda}
                    onChange={changeValue}
                    className={styles.select}
                />
            </div>

            {/* Search */}
            <div className={styles.field}>
                <label htmlFor="texto_busqueda">Search:</label>
                <input
                    type="text"
                    id="texto_busqueda"
                    name="texto_busqueda"
                    placeholder="Description or reference..."
                    value={state.texto_busqueda}
                    onChange={changeValue}
                />
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <button type="reset">Clear filters</button>
            </div>
        </form>
    );
}

export default Filters;
