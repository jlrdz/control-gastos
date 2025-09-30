import styles from "./index.module.scss";

export default function Sorting({ columnKey, sortConfig, setSortConfig, children }) {
    const handleClick = () => {
        let direction = "asc";
        if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key: columnKey, direction });
    };

    const arrow =
        sortConfig.key === columnKey ? (sortConfig.direction === "asc" ? "▲" : "▼") : "";

    return (
        <span onClick={handleClick} className={styles.sortable}>
            {children} {arrow}
        </span>
    );
}
