import React, { useState, useEffect } from 'react';
import { UserDetailsForm } from '../components/form/UserDetailsForm';
import { TrustSection } from '../components/TrustSection';
import { useNavigate, useLocation } from 'react-router-dom';

import { fetchProducts } from '../services/api';
import { trackEvent } from '../utils/pixel';

export function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    // Fetch Products on Mount
    const sentViewContent = React.useRef(false);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
            setIsLoadingProducts(false);

            // Track ViewContent ONCE when products are ready
            if (!sentViewContent.current && data.length > 0) {
                const mainProduct = data.find(p => p.sku.includes('FULL')) || data[0];
                trackEvent('ViewContent', {
                    content_name: mainProduct.name,
                    content_ids: [mainProduct.sku],
                    content_type: 'product',
                    value: mainProduct.sale_price,
                    currency: mainProduct.currency || 'INR'
                });
                sentViewContent.current = true;
            }
        };
        loadProducts();
    }, []);

    // Helper: Identify Product based on form choice
    const getProductByChoice = (hasPartner) => {
        if (!products || products.length === 0) return null;

        // Dynamic Logic: 
        // Partner -> Look for "REL" or "PARTNER" in SKU
        // Single -> Look for "FULL" or "SINGLE" in SKU
        // Fallback -> Default to first available if simple match fails
        if (hasPartner) {
            return products.find(p => p.sku.includes('REL') || p.sku.includes('PARTNER'));
        } else {
            return products.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'));
        }
    };

    // Deep Linking: Scroll to form and focus if hash is present
    useEffect(() => {
        if (location.hash === '#numerology-form') {
            const checkAndScroll = () => {
                const section = document.getElementById('numerology-section');
                const form = document.getElementById('numerology-form');
                const target = section || form;

                if (target) {
                    // Check if the element is already comfortably in view
                    const rect = target.getBoundingClientRect();
                    const isInView = rect.top >= 80 && rect.bottom <= window.innerHeight;

                    if (!isInView) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }

                    // Focus Logic with delay to allow scroll to start
                    const firstInput = form ? form.querySelector('input') : null;
                    if (firstInput) {
                        setTimeout(() => {
                            firstInput.focus({ preventScroll: true });
                        }, 800); // Wait for scroll to mostly finish
                    }
                    return true; // Found and handled
                }
                return false; // Not found yet
            };

            // Poll for the element in case of render delays
            let attempts = 0;
            const interval = setInterval(() => {
                if (checkAndScroll() || attempts > 10) {
                    clearInterval(interval);
                }
                attempts++;
            }, 100);

            return () => clearInterval(interval);
        }
    }, [location]);

    const handleFormSubmit = async (data) => {
        setIsProcessing(true);
        try {
            // New Dynamic SKU Logic
            const selectedProduct = getProductByChoice(data.hasPartner);

            if (!selectedProduct) {
                alert("Service is temporarily unavailable (Product Catalog not loaded). Please try again in a moment.");
                setIsProcessing(false);
                return;
            }

            // Calculate exact amount to be consistent (Frontend double-check)
            // base_price + upgrade_cost
            const basePrice = products.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'))?.sale_price || 0;
            const partnerPrice = products.find(p => p.sku.includes('REL') || p.sku.includes('PARTNER'))?.sale_price || 0;
            const totalPrice = data.hasPartner ? Number(partnerPrice) : Number(basePrice);

            // Initialize Advanced Matching (Hash & Send)
            // This links future events (Purchase) to this user
            // Initialize Advanced Matching (Hash & Send)
            // This links future events (Purchase) to this user
            await initAdvancedMatching({
                email: data.email,
                name: data.name,
                dob: data.dob,
                gender: data.gender,
                phone: data.phone || null
            });

            // Redirect to Intermediate Checkout Page
            // Track Meta Pixel Lead
            trackEvent('Lead', {
                currency: 'INR',
                content_name: selectedProduct.name
            });

            navigate('/checkout', {
                state: {
                    formData: data,
                    selectedProduct: selectedProduct,
                    totalPrice: totalPrice,
                    currency: selectedProduct.currency || 'INR'
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
        <div className="space-y-12">
            <div className="text-center space-y-4 pt-12 pb-8">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-[var(--color-primary)] leading-tight">
                    DevSankhya Vedic Numerology
                </h1>
                <p className="text-[var(--color-secondary)] max-w-2xl mx-auto text-xl leading-relaxed">
                    Unlock the secrets of your life path with our detailed 2026 numerology analysis.
                </p>
            </div>

            <UserDetailsForm
                onSubmit={handleFormSubmit}
                isProcessing={isProcessing}
                products={products}
                isLoadingProducts={isLoadingProducts}
            />

            <TrustSection />
        </div>
    );
}
