export const trackEvent = (eventName, data = {}) => {
    try {
        if (typeof window.fbq === 'function') {
            window.fbq('track', eventName, data);

            // Log in development for visibility
            if (import.meta.env.DEV) {
                console.log(`[Meta Pixel] Tracked: ${eventName}`, data);
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
