/**
 * Helper to retrieve cookie value by name.
 * @param {string} name - Name of the cookie (e.g. '_fbp')
 * @returns {string|null} - Value of the cookie or null if not found
 */
export const getCookie = (name) => {
    try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    } catch (e) {
        console.warn('Error reading cookie:', e);
    }
    return null;
};
