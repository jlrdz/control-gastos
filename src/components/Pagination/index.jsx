import styles from "./index.module.scss";
import { APP_CONFIG } from "../../config/appConfig";

export default function Pagination({
    currentPage,
    pageSize,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    totalPages,
    totalCount,
    startRecord,
    endRecord,
    pageNumbers = [],
}) {
    const hasRecords = totalCount > 0;

    return (
        <div className={styles.pagination}>
            {/* Prev button */}
            <button
                disabled={!hasRecords || currentPage === 1}
                onClick={prevPage}
                className={styles.pageBtn}
                aria-label="Previous page"
            >
                Prev
            </button>

            {/* Page number buttons */}
            {hasRecords &&
                pageNumbers.map((page, index) =>
                    page === "…" ? (
                        <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                            …
                        </span>
                    ) : (
                        <button
                            key={`page-${page}-${index}`}
                            onClick={() => goToPage(page)}
                            className={`${styles.pageBtn} ${page === currentPage ? styles.active : ""
                                }`}
                            aria-label={`Go to page ${page}`}
                        >
                            {page}
                        </button>
                    )
                )}

            {/* Next button */}
            <button
                disabled={!hasRecords || currentPage === totalPages}
                onClick={nextPage}
                className={styles.pageBtn}
                aria-label="Next page"
            >
                Next
            </button>

            {/* Page size selector */}
            <select
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    goToPage(1);
                }}
                className={styles.pageSize}
                aria-label="Select page size"
                disabled={!hasRecords}
            >
                {APP_CONFIG.pagination.pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                        {size} / page
                    </option>
                ))}
            </select>

            {/* Records info */}
            <span className={styles.info}>
                {hasRecords ? (
                    <>
                        Showing <strong>{startRecord}</strong>-<strong>{endRecord}</strong> of{" "}
                        <strong>{totalCount}</strong> {totalCount === 1 ? "record" : "records"}
                    </>
                ) : (
                    "No records found"
                )}
            </span>
        </div>
    );
}
