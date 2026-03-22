import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reset scroll position to top whenever pathname changes
        window.scrollTo(0, 0);
        // Fallbacks for different scroll roots
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
    }, [pathname]);

    return null;
}
