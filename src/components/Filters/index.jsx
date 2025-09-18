import CategorySelect from "../CategorySelect";
import CurrencySelect from "../CurrencySelect";
import PaymentMethodSelect from "../PaymentMethodSelect";
import { useFilters } from "../../hooks/useFilters";
import { formatNumber } from "../../utils/format";
import styles from "./index.module.scss";

function Filters({ onApply, expenses = [] }) {
    const { state, changeValue, reset } = useFilters(
        {
            fecha_inicio: "",
            fecha_fin: "",
            categoria_id: "",
            forma_pago: "",
            moneda: "",
            texto_busqueda: "",
        },
        onApply
    );

    // ---- Summary (inline) ----
    const totalCount = expenses?.length ?? 0;
    const totals = (expenses || []).reduce((acc, exp) => {
        const { moneda, monto } = exp;
        acc[moneda] = (acc[moneda] || 0) + monto;
        return acc;
    }, {});

    return (
        <form onReset={reset} className={styles.filters}>
            {/* From */}
            <div className={styles.field}>
                <label htmlFor="startDate">From:</label>
                <input
                    type="date"
                    id="fecha_inicio"
                    value={state.fecha_inicio}
                    onChange={changeValue}
                />
            </div>

            {/* To */}
            <div className={styles.field}>
                <label htmlFor="endDate">To:</label>
                <input
                    type="date"
                    id="fecha_fin"
                    value={state.fecha_fin}
                    onChange={changeValue}
                />
            </div>

            {/* Category */}
            <div className={styles.field}>
                <label htmlFor="category">Category:</label>
                <CategorySelect
                    value={state.categoria_id}
                    onChange={changeValue}
                    className={styles.select}
                />
            </div>

            {/* Payment Method */}
            <div className={styles.field}>
                <label htmlFor="paymentMethod">Payment method:</label>
                <PaymentMethodSelect
                    value={state.forma_pago}
                    onChange={changeValue}
                    className={styles.select}
                />
            </div>

            {/* Currency */}
            <div className={styles.field}>
                <label htmlFor="currency">Currency:</label>
                <CurrencySelect
                    value={state.moneda}
                    onChange={changeValue}
                    className={styles.select}
                />
            </div>

            {/* Search */}
            <div className={styles.field}>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="texto_busqueda"
                    placeholder="Description or reference..."
                    value={state.texto_busqueda}
                    onChange={changeValue}
                />
            </div>

            {/* Actions + Summary inline */}
            <div className={styles.actions}>
                <button type="reset">Clear filters</button>

                {totalCount > 0 && (
                    <div className={styles.summaryInline}>
                        <span>Records: <strong>{totalCount}</strong></span>
                        {totals.CRC != null && (
                            <span>Total CRC: <strong>{formatNumber(totals.CRC)}</strong></span>
                        )}
                        {totals.USD != null && (
                            <span>Total USD: <strong>{formatNumber(totals.USD)}</strong></span>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
}

export default Filters;
