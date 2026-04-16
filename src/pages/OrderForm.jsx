import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserDetailsForm } from '../components/form/UserDetailsForm';
import { fetchProducts } from '../services/api';
import { trackEvent, initAdvancedMatching } from '../utils/pixel';
import { useCoupon } from '../hooks/useCoupon';
import { Clock, ShieldCheck, Sparkles, BookOpen, Gem, MessageCircleQuestion } from 'lucide-react';

export function OrderForm() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [product, setProduct] = useState(null);

    // Fetch products and resolve by slug
    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
            setIsLoadingProducts(false);

            // Resolve product by slug
            if (slug === 'numerology') {
                const solo = data.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'));
                setProduct(solo || null);
            }
        };
        loadProducts();
    }, [slug]);

    // Unknown slug → redirect to /reports
    if (slug !== 'numerology') {
        navigate('/reports', { replace: true });
        return null;
    }

    const salePrice = product ? Number(product.sale_price) : 399;
    const currency = '₹';

    // Coupon hook
    const { finalPrice, couponDiscount, appliedCoupon } = useCoupon(product?.sku, salePrice);

    const handleFormSubmit = async (data) => {
        setIsProcessing(true);
        try {
            const selectedProduct = product;

            if (!selectedProduct) {
                alert("Service is temporarily unavailable (Product Catalog not loaded). Please try again in a moment.");
                setIsProcessing(false);
                return;
            }

            const totalPrice = Number(selectedProduct.sale_price);

            // Initialize Advanced Matching (Hash & Send)
            // This links future events (Purchase) to this user
            await initAdvancedMatching({
                email: data.email,
                name: data.name,
                dob: data.dob,
                gender: data.gender,
                phone: data.phone || null
            });

            // Generate Deduplication ID for Lead
            const lead_ref_id = crypto.randomUUID ? crypto.randomUUID() : 'lead_' + Date.now() + Math.random().toString(36).substr(2, 9);

            // Track Meta Pixel Lead
            trackEvent('Lead', {
                currency: 'INR',
                content_name: selectedProduct.name
            }, {
                eventID: lead_ref_id
            });

            // Navigate to Checkout with state
            navigate('/checkout', {
                state: {
                    formData: data,
                    selectedProduct: selectedProduct,
                    totalPrice: totalPrice,
                    currency: 'INR',
                    lead_ref_id: lead_ref_id
                }
            });

            setIsProcessing(false);

        } catch (error) {
            console.error("Order Flow Error:", error);
            alert(`Error: ${error.message}`);
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">

            {/* Coupon Banner */}
            {appliedCoupon && couponDiscount > 0 && (
                <div className="coupon-banner">
                    <span className="coupon-banner-icon">✨</span>
                    <span>Coupon <strong>{appliedCoupon}</strong> applied — you save <strong>{currency}{couponDiscount}</strong></span>
                </div>
            )}

            {/* Form first */}
            <UserDetailsForm
                onSubmit={handleFormSubmit}
                isProcessing={isProcessing}
                products={products}
                isLoadingProducts={isLoadingProducts}
                couponDiscount={couponDiscount}
                appliedCoupon={appliedCoupon}
            />

            {/* Order Summary — below the form */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm">
                {/* Header */}
                <div className="px-6 py-4 bg-amber-50/60 border-b border-[var(--color-border)]">
                    <h2 className="font-display font-semibold text-lg text-[var(--color-primary)]">
                        Order Summary
                    </h2>
                </div>

                <div className="px-6 py-5 space-y-5">
                    {/* Product Name & Price */}
                    <div>
                        <h3 className="font-medium text-gray-900 text-sm">Vedic Numerology Report 2026</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            {appliedCoupon && couponDiscount > 0 ? (
                                <>
                                    <span className="text-2xl font-bold text-[var(--color-primary)] font-sans">{currency}{finalPrice}</span>
                                    <span className="text-sm text-gray-400 line-through">{currency}{salePrice}</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl font-bold text-[var(--color-primary)] font-sans">{currency}{salePrice}</span>
                                    {product && product.mrp > salePrice && (
                                        <span className="text-sm text-gray-400 line-through">{currency}{product.mrp}</span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* What's included */}
                    <div className="space-y-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What's Included</p>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2.5 text-sm text-gray-700">
                                <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                <span>2026 predictions (personal year, core numbers)</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-sm text-gray-700">
                                <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                <span>Active planes analysis</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-sm text-gray-700">
                                <Gem className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                                <span>Missing numbers + maha-mantra + stone</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-sm text-gray-700">
                                <MessageCircleQuestion className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                <span>Answer to your personal question</span>
                            </li>
                        </ul>
                    </div>

                    {/* Delivery badge */}
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                        <Clock className="w-4 h-4 text-amber-700" />
                        <span className="text-sm text-amber-800 font-medium">Delivered to your inbox in 5–6 hours</span>
                    </div>

                    {/* Trust line */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Secure payment via Razorpay</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

