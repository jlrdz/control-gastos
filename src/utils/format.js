import { APP_CONFIG } from "../config/appConfig";

// --- Date parsing helper ---
// Converts a Supabase `date` field (YYYY-MM-DD) into a local Date object.
// This avoids the timezone shift that happens when JavaScript interprets
// plain date strings as UTC.
function parseLocalDate(dateString) {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day); // month is zero-based in JS
}

// --- Date formatting ---
// Formats a Supabase `date` (YYYY-MM-DD) according to the app's locale.
// Falls back to the default locale from APP_CONFIG if none is provided.
export function formatDate(dateString, locale = APP_CONFIG.locale) {
    if (!dateString) return "";
    const date = parseLocalDate(dateString);

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

// --- Number formatting ---
// Formats a numeric value with separators and two decimal places.
// Uses the configured locale to keep formatting consistent.
export function formatNumber(value, locale = APP_CONFIG.locale) {
    if (value == null) return "";
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

// --- Currency formatting ---
// Formats a numeric value as currency, including decimals and separators.
// Uses both locale and default currency from APP_CONFIG.
// Example: 244858.97 → "₡244,858.97" (depending on locale).
export function formatCurrency(value, locale = APP_CONFIG.locale, currency = APP_CONFIG.currency) {
    if (value == null) return "";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
