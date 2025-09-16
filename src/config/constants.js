// --- Application constants ---
// This file defines static lists and values used across the app.
// These values represent fixed business options that rarely change,
// such as currencies or payment methods.

export const constants = {
  // Supported currencies in the system.
  // Each entry has an `id` (used internally) and a display `nombre`.
  currencies: [
    { id: "CRC", nombre: "CRC" },
    { id: "USD", nombre: "USD" }
  ],

  // Available payment methods for expenses.
  // These are used in forms, filters, and dropdowns across the app.
  paymentMethods: [
    { id: "AMEX", nombre: "AMEX" },
    { id: "VISA", nombre: "VISA" },
    { id: "cash", nombre: "Cash" },
    { id: "transfer", nombre: "Transfer" }
  ]
};
