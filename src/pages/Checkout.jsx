import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { createOrder, verifyPayment, checkCoupon } from '../services/api';

export function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    // Initial State Check
    useEffect(() => {
        if (!location.state || !location.state.formData || !location.state.selectedProduct) {
            navigate('/', { replace: true });
        } else {
            // Initialize Final Price
            setFinalPrice(location.state.totalPrice);
        }
    }, [location, navigate]);

    if (!location.state || !location.state.formData || !location.state.selectedProduct) {
        return null;
    }

    const { formData, selectedProduct, totalPrice, currency } = location.state;

    // Coupon Handler
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsProcessing(true);
        setCouponMessage('');
        try {
            const result = await checkCoupon(couponCode, [selectedProduct.sku]);
            if (result.valid) {
                setDiscountAmount(result.discount_amount);
                setFinalPrice(result.final_amount);
                setIsCouponApplied(true);
                setCouponMessage(`Success! Coupon applied: ${result.message}`);
            } else {
                setCouponMessage(`Invalid Coupon: ${result.message}`);
                setIsCouponApplied(false);
                setFinalPrice(totalPrice); // Reset
                setDiscountAmount(0);
            }
        } catch (error) {
            console.error("Coupon Error:", error);
            setCouponMessage(error.message || "Failed to validate coupon");
            setIsCouponApplied(false);
            setFinalPrice(totalPrice);
            setDiscountAmount(0);
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // 1. Prepare Payload matching OrderCreate schema
            const payload = {
                email: formData.email,
                product_skus: [selectedProduct.sku],
                coupon_code: isCouponApplied ? couponCode : null, // Include Coupon
                primary_name: formData.name,
                primary_gender: formData.gender,
                primary_dob: formData.dob,
                primary_tob: formData.tob ? (formData.tob.length === 5 ? `${formData.tob}:00` : formData.tob) : null,
                primary_pob: formData.pob,
                partner_name: formData.partnerName || null,
                partner_gender: null,
                partner_dob: formData.partnerDob || null,
                partner_tob: formData.partnerTob ? (formData.partnerTob.length === 5 ? `${formData.partnerTob}:00` : formData.partnerTob) : null,
                partner_pob: formData.partnerPob || null,
                additional_metadata: {
                    amount_at_checkout: finalPrice,
                    currency_at_checkout: currency,
                    original_price: totalPrice,
                    discount_applied: discountAmount
                }
            };

            // 2. Create Order
            const order = await createOrder(payload);
            console.log("Order Created:", order);

            // 2.5 Check if 100% Discount (Immediate Success)
            if (order.amount === 0 && order.gateway_order_id.startsWith('coupon_')) {
                navigate('/success', {
                    state: {
                        orderData: formData,
                        payment: { razorpay_payment_id: 'COUPON_FREE' },
                        status: 'confirmed'
                    }
                });
                return;
            }

            // 3. Open Razorpay
            const options = {
                key: order.key_id,
                amount: order.amount * 100, // Amount is from Backend Response (already discounted)
                currency: order.currency,
                name: "DevSankhya Numerology",
                description: selectedProduct.name || "Vedic Numerology Report 2026",
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
                        navigate('/success', {
                            state: {
                                orderData: formData,
                                payment: response,
                                status: 'confirmed'
                            }
                        });
                    } catch (err) {
                        const status = err.response ? err.response.status : 0;
                        if (status === 400 || status === 401 || status === 403) {
                            console.error("Critical Verification Failure:", err.response.data);
                            navigate('/payment-failed', {
                                state: {
                                    error: err.response.data.detail || "Invalid Signature",
                                    orderData: formData
                                }
                            });
                        } else {
                            console.warn("Network/Server glitch, relying on webhook sync:", err);
                            navigate('/success', {
                                state: {
                                    orderData: formData,
                                    payment: response,
                                    status: 'pending_sync'
                                }
                            });
                        }
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-display font-bold text-gray-900">Checkout</h2>
                    <p className="mt-2 text-sm text-gray-600">Review your details before proceeding to payment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Customer Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <label className="block text-gray-500">Name</label>
                                <div className="font-medium text-gray-900">{formData.name}</div>
                            </div>
                            <div>
                                <label className="block text-gray-500">Email</label>
                                <div className="font-medium text-gray-900">{formData.email}</div>
                            </div>
                            <div>
                                <label className="block text-gray-500">Date of Birth</label>
                                <div className="font-medium text-gray-900">{formData.dob}</div>
                            </div>

                            {formData.hasPartner && (
                                <div className="pt-2 border-t mt-2">
                                    <label className="block text-gray-500">Partner Details</label>
                                    <div className="font-medium text-gray-900">
                                        {formData.partnerName} ({formData.partnerDob})
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Order Summary Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-start border-b pb-4">
                                <div>
                                    <h3 className="font-medium text-gray-900">{selectedProduct.name}</h3>
                                </div>
                                <span className="font-semibold text-gray-900">{currency === 'INR' ? '₹' : currency} {totalPrice}</span>
                            </div>

                            {/* Coupon Input Section */}
                            <div className="py-2 space-y-2">
                                <label className="text-sm font-medium text-gray-700">Have a Coupon?</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm p-2 border"
                                        disabled={isCouponApplied}
                                    />
                                    {!isCouponApplied ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleApplyCoupon}
                                            disabled={isProcessing || !couponCode}
                                        >
                                            Apply
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => { setIsCouponApplied(false); setDiscountAmount(0); setFinalPrice(totalPrice); setCouponCode(''); setCouponMessage(''); }}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                                {couponMessage && (
                                    <p className={`text-xs ${isCouponApplied ? 'text-green-600' : 'text-red-600'}`}>
                                        {couponMessage}
                                    </p>
                                )}
                            </div>

                            {/* Discount Logic */}
                            {isCouponApplied && discountAmount > 0 && (
                                <div className="flex justify-between items-center text-green-700 font-medium">
                                    <span>Discount Applied</span>
                                    <span>- {currency === 'INR' ? '₹' : currency} {discountAmount}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center text-lg font-bold text-[var(--color-primary)] pt-2 border-t">
                                <span>Total to Pay</span>
                                <span>{currency === 'INR' ? '₹' : currency} {finalPrice}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Action Action */}
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={handlePayment}
                        isLoading={isProcessing}
                        className="w-full md:w-auto md:px-12 py-3 text-lg"
                    >
                        {finalPrice > 0
                            ? `Pay ${currency === 'INR' ? '₹' : currency} ${finalPrice} Securely`
                            : `Get Report Now (Free)`
                        }
                    </Button>
                </div>

                <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                    <span>Secured by Razorpay</span>
                </div>

            </div>
        </div>
    );
}
