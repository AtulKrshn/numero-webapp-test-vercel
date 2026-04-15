import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../ui/Input';
import { DobInput } from './DobInput';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';

import { PriceDisplay } from '../ui/PriceDisplay';
import { Flag } from 'lucide-react';

export function UserDetailsForm({ onSubmit, isProcessing = false, products = [], isLoadingProducts = true, couponDiscount = 0, appliedCoupon = null }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting }
    } = useForm({
        mode: 'onBlur'
    });

    // Dynamic Pricing Logic
    const baseProduct = products.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'));

    // Prices (safety defaults if loading or API fail)
    const basePriceVal = baseProduct ? Number(baseProduct.sale_price) : 599;
    const baseMrpVal = baseProduct ? Number(baseProduct.mrp) : 999;

    const rawTotalPrice = basePriceVal;
    const originalPrice = baseMrpVal;

    const currencySymbol = baseProduct?.currency === 'USD' ? '$' : '₹';

    // Coupon discount comes from parent (OrderForm) via useCoupon hook
    const finalDisplayPrice = Math.max(0, rawTotalPrice - couponDiscount);

    const handleFormSubmit = (data) => {
        // We pass the RAW price to checkout, because checkout re-validates the coupon anyway.
        // OR we can pass the discounted one? 
        // Best practice: Pass the raw items and letting Checkout handle calculations is safer,
        // BUT Checkout expects `totalPrice` in location.state to display immediately.
        // If we send raw price, Checkout might flash raw then discount.
        // If we send discounted price, Checkout might double discount if we aren't careful?
        // Let's check `Checkout.jsx`.
        // Checkout uses `location.state.totalPrice` as `finalPrice` INITIALLY.
        // Then it runs `verifyAutoCoupon` and OVERWRITES it.
        // So passing rawTotalPrice here is CORRECT. Checkout will re-apply the discount.

        const payload = { ...data, totalPrice: rawTotalPrice, currency: baseProduct?.currency || 'INR' };
        if (onSubmit) onSubmit(payload);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full max-w-5xl mx-auto pb-24 lg:pb-0">
            {/* Left Column: Form Inputs */}
            <div className="lg:col-span-2 scroll-mt-24" id="numerology-section">
                <Card>
                    <CardHeader>
                        <CardTitle>Enter Your Birth Details</CardTitle>
                    </CardHeader>
                    <form id="numerology-form" onSubmit={handleSubmit(handleFormSubmit)}>
                        <CardContent className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="e.g. Rahul Singh"
                                autoFocus
                                error={errors.name?.message}
                                {...register('name', { required: 'Name is required' })}
                            />




                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Gender"
                                    error={errors.gender?.message}
                                    {...register('gender', { required: 'Gender is required' })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Select>

                                <Controller
                                    control={control}
                                    name="dob"
                                    rules={{
                                        required: 'Date of Birth is required',
                                        validate: (value) => {
                                            if (value === 'invalid') return 'Invalid Date of Birth';
                                            // Basic ISO regex check YYYY-MM-DD
                                            const regex = /^\d{4}-\d{2}-\d{2}$/;
                                            if (!regex.test(value)) return 'Invalid Date of Birth';
                                            return true;
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <DobInput
                                            label="Date of Birth (DD/MM/YYYY)"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            error={fieldState.error?.message}
                                            required
                                        />
                                    )}
                                />
                            </div>


                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="rahul@example.com"
                                error={errors.email?.message}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />


                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
                                    <span className="flex select-none items-center px-3 text-gray-500 sm:text-sm bg-gray-50 border-r border-gray-300 rounded-l-md">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-r-md"
                                        placeholder="9876543210"
                                        maxLength={10}
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Must be 10 digits"
                                            },
                                            onChange: (e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                                            }
                                        })}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-xs text-red-500">{errors.phone.message}</p>
                                )}
                            </div>


                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Time of Birth (Optional)"
                                    type="time"
                                    error={errors.tob?.message}
                                    {...register('tob')}
                                />

                                <Input
                                    label="Place of Birth (Optional)"
                                    placeholder="e.g. Mumbai, Maharashtra"
                                    error={errors.pob?.message}
                                    {...register('pob')}
                                />
                            </div> */}




                            {/* Personal Customization Section */}
                            <div className="space-y-4">
                                {/* <h3 className="text-sm font-medium text-gray-900">Personalize Your Report</h3> */}


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="Report Language"
                                        error={errors.reportLanguage?.message}
                                        {...register('reportLanguage', { required: 'Language is required' })}
                                        defaultValue="en"
                                    >
                                        <option value="en">English (Default)</option>
                                        <option value="hi">Hindi</option>
                                        <option value="hinglish">Hinglish</option>
                                    </Select>
                                </div>


                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Ask Your Specific Question</label>
                                    <textarea
                                        className={`
                                            flex w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 
                                            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent 
                                            disabled:cursor-not-allowed disabled:opacity-50
                                            ${errors.personalQuestion ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
                                        `}
                                        rows={3}
                                        placeholder="e.g., Will I travel abroad this year?"
                                        {...register('personalQuestion', { required: 'Personal Question is required' })}
                                    />
                                    {errors.personalQuestion && (
                                        <p className="text-xs text-red-500">{errors.personalQuestion.message}</p>
                                    )}
                                </div>
                            </div>


                        </CardContent>
                        {/* Hidden submit button to allow Enter key submission within the form */}
                        <button type="submit" className="hidden" />
                    </form>
                </Card>
            </div>

            {/* Coupon banner is now rendered by parent OrderForm */}

            {/* Right Column: Sticky Price Display (Desktop) & Fixed Bottom Bar (Mobile) */}
            <PriceDisplay
                basePrice={basePriceVal}
                totalPrice={finalDisplayPrice}
                originalPrice={originalPrice}
                currency={currencySymbol}
                formId="numerology-form"
                isSubmitting={isSubmitting || isProcessing}
            />
        </div >
    );
}
