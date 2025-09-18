import { useState, useMemo } from "react";

export function usePagination(totalCount, initialPageSize = 10, maxVisible = 5) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = Math.ceil(totalCount / pageSize);

    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalCount);

    const pageNumbers = useMemo(() => {
        const pages = [];
        const half = Math.floor(maxVisible / 2);

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= half + 1) {
                for (let i = 1; i <= maxVisible; i++) pages.push(i);
                pages.push("…", totalPages);
            } else if (currentPage >= totalPages - half) {
                pages.push(1, "…");
                for (let i = totalPages - (maxVisible - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1, "…");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("…", totalPages);
            }
        }

        return pages;
    }, [currentPage, totalPages, maxVisible]);

    return {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        startRecord,
        endRecord,
        pageNumbers,
        nextPage: () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
        prevPage: () => setCurrentPage((p) => Math.max(p - 1, 1)),
        goToPage: (page) => setCurrentPage(page),
    };
}
