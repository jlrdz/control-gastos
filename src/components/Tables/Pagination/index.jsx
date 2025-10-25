import CustomSelect from "../../Selects/CustomSelect";
import { APP_CONFIG } from "../../../config/appConfig";
import clsx from "clsx";

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

  const pageSizeOptions = APP_CONFIG.pagination.pageSizeOptions.map((size) => ({
    value: size,
    label: `${size} / page`,
  }));

  const baseButton =
    "px-3 py-2 rounded-md text-sm font-medium cursor-pointer " +
    "bg-[var(--card)]  border border-transparent " +
    "shadow-[2px_2px_4px_rgba(0,0,0,0.45),_-2px_-2px_4px_rgba(255,255,255,0.04)] " +
    "hover:bg-[var(--hover-surface)] hover:text-[var(--primary)] focus:outline-none dark:text-[var(--primary)]";

  const activeButton =
    "bg-[var(--selected-surface)] text-[var(--foreground)] " +
    "font-semibold scale-[0.98]";

  const disabledButton = "opacity-40 cursor-not-allowed hover:bg-[var(--card)]";

  return (
    <div
      className="
        flex flex-wrap items-center justify-center gap-3 px-4 py-3 mt-4
        rounded-xl bg-[var(--card)] text-[var(--foreground)]
        border border-[var(--muted-foreground)]/10 text-sm
      "
    >
      {/* Prev button */}
      <button
        disabled={!hasRecords || currentPage === 1}
        onClick={prevPage}
        className={clsx(baseButton, {
          [disabledButton]: !hasRecords || currentPage === 1,
        })}
        aria-label="Previous page"
      >
        Prev
      </button>

      {/* Page numbers */}
      {hasRecords &&
        pageNumbers.map((page, index) =>
          page === "…" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 opacity-70 select-none"
            >
              …
            </span>
          ) : (
            <button
              key={`page-${page}-${index}`}
              onClick={() => goToPage(page)}
              className={clsx(
                baseButton,
                page === currentPage ? activeButton : "",
                page !== currentPage &&
                  "hover:bg-[var(--hover-surface)] hover:text-[var(--foreground)]"
              )}
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
        className={clsx(baseButton, {
          [disabledButton]: !hasRecords || currentPage === totalPages,
        })}
        aria-label="Next page"
      >
        Next
      </button>

      {/* Page size selector */}
      <div className="ml-3 min-w-[120px]">
        <CustomSelect
          value={pageSize}
          options={pageSizeOptions}
          onChange={(value) => {
            setPageSize(Number(value));
            goToPage(1);
          }}
          disabled={!hasRecords}
          aria-label="Select page size"
        />
      </div>

      {/* Records info */}
      <span className="ml-3 text-[var(--primary)] whitespace-nowrap">
        {hasRecords ? (
          <>
            Showing{" "}
            <strong className="text-[var(--foreground)] dark:text-[var(--primary)]">
              {startRecord}
            </strong>
            –
            <strong className="text-[var(--foreground)] dark:text-[var(--primary)]">
              {endRecord}
            </strong>{" "}
            of{" "}
            <strong className="text-[var(--foreground)] dark:text-[var(--primary)]">
              {totalCount}
            </strong>{" "}
            {totalCount === 1 ? "record" : "records"}
          </>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}
