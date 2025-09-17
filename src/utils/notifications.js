import { useToast } from "../hooks/useToast";

/**
 * Custom hook to centralize CRUD notifications.
 * Works for any entity (Expense, Category, Budget, etc.).
 */
export const useCrudNotifications = () => {
    const { addToast } = useToast();

    const notifySuccess = (action, entity = "Item") => {
        const messages = {
            create: `${entity} created successfully ✅`,
            update: `${entity} updated successfully ✏️`,
            delete: `${entity} deleted successfully 🗑️`,
        };
        addToast(messages[action] || `${entity} action completed ✅`, "success");
    };

    const notifyError = (action, entity = "Item") => {
        const messages = {
            create: `Error creating ${entity} ❌`,
            update: `Error updating ${entity} ❌`,
            delete: `Error deleting ${entity} ❌`,
        };
        addToast(messages[action] || `Error performing ${entity} action ❌`, "error");
    };

    return { notifySuccess, notifyError };
};
