// --- Application configuration ---
// This file defines global settings that control how the app behaves.
// Unlike `constants.js`, these values represent preferences that may change
// depending on user needs or project defaults (e.g., locale, theme, pagination).

export const APP_CONFIG = {
    // Default locale used across the app for dates and numbers.
    // Example: "en-US", "es-CR".
    locale: "EN-US",

    // Pagination configuration for tables and lists.
    // Defines the default number of items per page and the selectable options.
    pagination: {
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
    },
};
