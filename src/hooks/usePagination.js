import { useState } from "react";
import { APP_CONFIG } from "../config/appConfig";

/**
 * Hook to handle pagination logic across the app.
 * Keeps track of current page, page size, and total pages.
 */
export function usePagination(totalCount = 0) {
    const [pageSize, setPageSize] = useState(APP_CONFIG.pagination.defaultPageSize);
    const [currentPage, setCurrentPage] = useState(1);

    // Total pages based on count and page size
    const totalPages = Math.ceil(totalCount / pageSize);

    // Navigate to next page
    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    // Navigate to previous page
    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    // Jump to specific page
    const goToPage = (page) => {
        const safePage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(safePage);
    };

    return {
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
    };
}
