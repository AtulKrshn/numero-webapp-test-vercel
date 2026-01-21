import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/pixel';

export const PixelRouteTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Track PageView on every route change
        trackEvent('PageView');
    }, [location]);

    return null;
};
