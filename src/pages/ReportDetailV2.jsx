import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { trackEvent } from '../utils/pixel';
import { useCoupon } from '../hooks/useCoupon';

// V2 components
import HeroV2 from './v2/components/HeroV2';
import WhatsInsideV2 from './v2/components/WhatsInsideV2';
import WhyThisReportV2 from './v2/components/WhyThisReportV2';
import HowItWorksV2 from './v2/components/HowItWorksV2';
import TestimonialsV2 from './v2/components/TestimonialsV2';
import FAQV2 from './v2/components/FAQV2';
import StickyCTAV2 from './v2/components/StickyCTAV2';

// V2 styles
import './v2/v2.css';

export function ReportDetailV2() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const sentViewContent = useRef(false);

    useEffect(() => {
        const loadProduct = async () => {
            const products = await fetchProducts();
            const solo = products.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'));
            if (solo) {
                setProduct(solo);
            }
            setIsLoading(false);
        };
        loadProduct();
    }, []);

    // ViewContent pixel — once when product is ready
    useEffect(() => {
        if (product && !sentViewContent.current) {
            sentViewContent.current = true;
            trackEvent('ViewContent', {
                content_name: 'Numerology Report 2026 V2',
                content_ids: [product.sku],
                content_type: 'product',
                value: product.sale_price,
                currency: 'INR'
            });
        }
    }, [product]);
    // tbd
    const salePrice = product ? Number(product.sale_price) : 399;
    const mrp = product ? Number(product.mrp) : 999;
    const currency = '₹';

    // Coupon hook — auto-reads from sessionStorage
    const { finalPrice, couponDiscount, appliedCoupon } = useCoupon(product?.sku, salePrice);

    const handleCTA = () => {
        navigate('/order/numerology');
    };

    return (
        <div className="v2-container">
            {/* Coupon Banner */}
            {appliedCoupon && couponDiscount > 0 && (
                <div className="coupon-banner">
                    <span className="coupon-banner-icon">✨</span>
                    <span>
                        Coupon <strong>{appliedCoupon}</strong> applied — you save <strong>{currency}{couponDiscount}</strong>
                    </span>
                </div>
            )}

            <HeroV2
                salePrice={salePrice}
                mrp={mrp}
                currency={currency}
                onCTA={handleCTA}
                isLoading={isLoading}
            />
            <WhatsInsideV2 />
            <WhyThisReportV2 />
            <HowItWorksV2 />
            <TestimonialsV2 />
            <FAQV2 />
            <StickyCTAV2
                salePrice={appliedCoupon ? finalPrice : salePrice}
                mrp={appliedCoupon ? salePrice : mrp}
                currency={currency}
                onCTA={handleCTA}
                isLoading={isLoading}
            />
        </div>
    );
}
