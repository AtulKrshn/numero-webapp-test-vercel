const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

// Helper: SHA-256 Hashing for Privacy (Async)
async function sha256(message) {
    if (!message) return null;
    const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const initAdvancedMatching = async (userData) => {
    try {
        if (typeof window.fbq === 'function') {

            // Robust Name Splitting if not explicitly provided
            let fname = userData.firstName;
            let lname = userData.lastName;

            if (!fname && userData.name) {
                const parts = userData.name.trim().split(/\s+/);
                fname = parts[0];
                lname = parts.length > 1 ? parts.slice(1).join(' ') : '';
            }

            const hashedData = {
                em: await sha256(userData.email),
                phone: await sha256(userData.phone),
                ph: await sha256(userData.phone),
                fn: await sha256(fname), // First Name
                ln: await sha256(lname), // Last Name
                db: await sha256(userData.dob ? userData.dob.replace(/-/g, '') : null), // YYYYMMDD
                ge: await sha256(userData.gender === 'male' ? 'm' : (userData.gender === 'female' ? 'f' : null))
            };

            // Re-init with matching parameters
            // Note: This adds user data to the pixel state for future events
            window.fbq('init', PIXEL_ID, hashedData);

            if (import.meta.env.DEV) {
                console.log(`[Meta Pixel] Advanced Matching Init`, hashedData);
            }
        }
    } catch (error) {
        console.warn('[Meta Pixel] Error initializing advanced matching:', error);
    }
};

export const trackEvent = (eventName, data = {}, options = {}) => {
    try {
        if (typeof window.fbq === 'function') {
            window.fbq('track', eventName, data, options);

            // Log in development for visibility
            if (import.meta.env.DEV) {
                console.log(`[Meta Pixel] Tracked: ${eventName}`, { data, options });
            }
        } else {
            if (import.meta.env.DEV) {
                console.warn('[Meta Pixel] Not initialized (window.fbq missing)');
            }
        }
    } catch (error) {
        console.error('[Meta Pixel] Error tracking event:', error);
    }
};
