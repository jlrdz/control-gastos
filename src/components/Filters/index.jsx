import CategorySelect from "../CategorySelect";
import CurrencySelect from "../CurrencySelect";
import PaymentMethodSelect from "../PaymentMethodSelect";
import { useFilters } from "../../hooks/useFilters";

function Filters({ onApply }) {
    const { state, changeValue, reset } = useFilters(
        { startDate: "", endDate: "", category: "", paymentMethod: "", currency: "", search: "" },
        onApply
    );

    return (
        <form onReset={reset} style={{ marginBottom: "1rem" }}>
            <div>
                <label>From: </label>
                <input
                    type="date"
                    id="startDate"
                    value={state.startDate}
                    onChange={changeValue}
                />

                <label style={{ marginLeft: "1rem" }}>To: </label>
                <input
                    type="date"
                    id="endDate"
                    value={state.endDate}
                    onChange={changeValue}
                />
            </div>

            <div style={{ marginTop: "0.5rem" }}>
                <label>Category: </label>
                <CategorySelect
                    value={state.category}
                    onChange={changeValue}
                />

                <label style={{ marginLeft: "1rem" }}>Payment method: </label>
                <PaymentMethodSelect
                    value={state.paymentMethod}
                    onChange={changeValue}
                />

                <label style={{ marginLeft: "1rem" }}>Currency: </label>
                <CurrencySelect
                    value={state.currency}
                    onChange={changeValue}
                />
            </div>

            <div style={{ marginTop: "0.5rem" }}>
                <label>Search: </label>
                <input
                    type="text"
                    id="search"
                    placeholder="Description or reference..."
                    value={state.search}
                    onChange={changeValue}
                />
            </div>

            <div style={{ marginTop: "0.5rem" }}>
                <button type="reset">Clear filters</button>
            </div>
        </form>
    );
}

export default Filters;
