import React, { useState, useEffect } from 'react';
import { UserDetailsForm } from '../components/form/UserDetailsForm';
import { TrustSection } from '../components/TrustSection';
import { useNavigate, useLocation } from 'react-router-dom';

import { createOrder, verifyPayment } from '../services/api';

export function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isProcessing, setIsProcessing] = useState(false);

    // Deep Linking: Scroll to form and focus if hash is present
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
            // 1. Prepare Payload matching OrderCreate schema
            const payload = {
                email: data.email,
                product_skus: data.hasPartner ? ["NUM-REL-2026"] : ["NUM-FULL-2026"],
                primary_name: data.name,
                primary_gender: data.gender,
                primary_dob: data.dob,
                primary_tob: data.tob ? (data.tob.length === 5 ? `${data.tob}:00` : data.tob) : null,
                primary_pob: data.pob,
                partner_name: data.partnerName || null,
                partner_gender: null,
                partner_dob: data.partnerDob || null,
                partner_tob: data.partnerTob ? (data.partnerTob.length === 5 ? `${data.partnerTob}:00` : data.partnerTob) : null,
                partner_pob: data.partnerPob || null,
                additional_metadata: {}
            };

            // 2. Create Order
            const order = await createOrder(payload);
            console.log("Order Created:", order);

            // 3. Open Razorpay
            const options = {
                key: order.key_id,
                amount: order.amount * 100,
                currency: order.currency,
                name: "Sankhya Numerology",
                description: "Vedic Numerology Report 2026",
                order_id: order.gateway_order_id,
                handler: async function (response) {
                    try {
                        // 4. Verify Payment
                        await verifyPayment({
                            payment_id: response.razorpay_payment_id,
                            provider_order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        });
                        // 5. Navigate to Success
                        navigate('/success', { state: { orderData: data, payment: response } });
                    } catch (err) {
                        alert("Payment Verification Failed: " + err.message);
                    }
                },
                prefill: {
                    name: payload.primary_name,
                    email: payload.email,
                },
                theme: { color: "#3399cc" }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
                setIsProcessing(false);
            });
            rzp.open();

        } catch (error) {
            console.error("Order Flow Error:", error);
            const msg = error.response?.data?.detail || error.message || "Failed to initiate order.";
            alert(`Error: ${msg}`);
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4 pt-12 pb-8">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-[var(--color-primary)] leading-tight">
                    Sankhya Vedic Numerology
                </h1>
                <p className="text-[var(--color-secondary)] max-w-2xl mx-auto text-xl leading-relaxed">
                    Unlock the secrets of your life path with our detailed 2026 numerology analysis.
                </p>
            </div>

            <UserDetailsForm onSubmit={handleFormSubmit} isProcessing={isProcessing} />

            <TrustSection />
        </div>
    );
}
