import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export const CouponCapture = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { addToast } = useToast();

    useEffect(() => {
        const couponFromUrl = searchParams.get('coupon');

        if (couponFromUrl) {
            // Normalize coupon code
            const code = couponFromUrl.toUpperCase();

            // Check if already applied to prevent double toasts (React Strict Mode / Re-renders)
            const existingCode = sessionStorage.getItem('auto_coupon');

            if (existingCode !== code) {
                // 1. Store in Session Storage
                sessionStorage.setItem('auto_coupon', code);
                console.log(`[AutoCoupon] Captured: ${code}`);

                // 2. Show Feedback
                addToast(`🎉 Coupon ${code} activated! It will be applied at checkout.`, 'success');
            }

            // 3. Optional: Clean URL (Remove query param so it doesn't look messy)
            // convert to new URLSearchParams to avoid mutation issues
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('coupon');
            setSearchParams(newParams, { replace: true });
        }
    }, [searchParams, setSearchParams, addToast]);

    return null;
};
