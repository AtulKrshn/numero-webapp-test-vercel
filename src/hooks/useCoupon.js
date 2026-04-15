import { useState, useEffect, useCallback } from 'react';
import { checkCoupon } from '../services/api';

/**
 * Centralized coupon hook.
 * Reads `sessionStorage.auto_coupon`, validates it against the backend,
 * and returns the discount state for any page to consume.
 *
 * @param {string|null} productSku - The product SKU to validate the coupon against
 * @param {number} salePrice - The original sale price before discount
 * @returns {{ couponCode, couponDiscount, appliedCoupon, finalPrice, isValidating }}
 */
export function useCoupon(productSku, salePrice) {
    const [couponCode, setCouponCode] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [isValidating, setIsValidating] = useState(false);

    const finalPrice = Math.max(0, salePrice - couponDiscount);

    // Validate coupon against backend
    const validateCoupon = useCallback(async (code, sku) => {
        if (!code || !sku) return;

        setIsValidating(true);
        try {
            const result = await checkCoupon(code, [sku]);
            if (result.valid) {
                setCouponDiscount(result.discount_amount);
                setAppliedCoupon(code);
            } else {
                setCouponDiscount(0);
                setAppliedCoupon(null);
            }
        } catch (error) {
            console.warn('[useCoupon] Validation failed:', error);
            setCouponDiscount(0);
            setAppliedCoupon(null);
        } finally {
            setIsValidating(false);
        }
    }, []);

    // Auto-read from sessionStorage when product is available
    useEffect(() => {
        const storedCoupon = sessionStorage.getItem('auto_coupon');
        if (storedCoupon && productSku) {
            setCouponCode(storedCoupon);
            validateCoupon(storedCoupon, productSku);
        }
    }, [productSku, validateCoupon]);

    return {
        couponCode,
        couponDiscount,
        appliedCoupon,
        finalPrice,
        isValidating
    };
}
