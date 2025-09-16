import { APP_CONFIG } from "../../config/appConfig";

/**
 * Pagination component with:
 * - Previous/Next buttons
 * - Page number buttons (with ellipsis if too many)
 * - Page size selector
 * - Info about the range of records being displayed
 */
export default function Pagination({
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    totalCount,
}) {
    // Helper to build an array of visible page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // max number of visible page buttons
        const half = Math.floor(maxVisible / 2);

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= half + 1) {
                for (let i = 1; i <= maxVisible; i++) pages.push(i);
                pages.push("...", totalPages);
            } else if (currentPage >= totalPages - half) {
                pages.push(1, "...");
                for (let i = totalPages - (maxVisible - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1, "...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...", totalPages);
            }
        }

        return pages;
    };

    // Calculate start and end records
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalCount);

    return (
        <div
            className="pagination"
            style={{
                marginTop: "1rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            {/* Prev button */}
            <button disabled={currentPage === 1} onClick={prevPage}>
                Prev
            </button>

            {/* Page number buttons */}
            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={index}>…</span>
                ) : (
                    <button
                        key={`page-${page}-${index}`}
                        onClick={() => goToPage(page)}
                        style={{
                            fontWeight: page === currentPage ? "bold" : "normal",
                            background: page === currentPage ? "#ddd" : "transparent",
                        }}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next button */}
            <button disabled={currentPage === totalPages} onClick={nextPage}>
                Next
            </button>

            {/* Page size selector */}
            <select value={pageSize} onChange={(e) => {
                setPageSize(Number(e.target.value));
                goToPage(1);
            }}>
                {APP_CONFIG.pagination.pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                        {size} / page
                    </option>
                ))}
            </select>

            {/* Records info */}
            <span style={{ marginLeft: "1rem" }}>
                Showing {startRecord}-{endRecord} of {totalCount} records
            </span>
        </div>
    );
}
