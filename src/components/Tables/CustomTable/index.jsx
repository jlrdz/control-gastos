import Loader from "../../Loader";
import clsx from "clsx";

export default function CustomTable({
  header,
  body,
  loading = false,
  error = null,
  emptyMessage = "No records found",
  colSpan = 1,
  className,
  hasRows,
}) {

  return (
    <div className="relative">
      <div
        className={clsx(
          "max-h-[28rem] overflow-y-auto rounded-xl relative",
          "bg-[oklch(var(--card))]",
          "shadow-[0_1px_2px_oklch(0_0_0_/_0.12)]",
          "dark:shadow-[0_1px_3px_oklch(0_0_0_/_0.3)]",
          "border-l border-[var(--muted)] dark:border-[var(--muted)]",
          "transition-all duration-300",
          className
        )}
      >
        <table className="w-full border-collapse table-fixed min-w-[700px]">
          <thead
            className="
              bg-[var(--card)] dark:bg-[var(--card)]
              sticky top-0 z-[2] backdrop-blur-[1px]
              shadow-[0_1px_2px_oklch(0_0_0_/_0.1)]
              dark:shadow-[0_1px_2px_oklch(0_0_0_/_0.25)]
            "
          >
            {header}
          </thead>

          <tbody>
            {error ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className="text-center text-[var(--danger)] py-4 text-sm"
                >
                  Error: {typeof error === "string" ? error : error.message}
                </td>
              </tr>
            ) : hasRows ? (
              body
            ) : (
              <tr>
                <td
                  colSpan={colSpan}
                  className="text-center py-4 text-[oklch(var(--foreground)/0.6)] text-sm italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Loader loading={loading} />
    </div>
  );
}
