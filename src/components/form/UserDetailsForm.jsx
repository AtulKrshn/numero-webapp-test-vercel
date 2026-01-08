import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';

import { PriceDisplay } from '../ui/PriceDisplay';
import { Flag } from 'lucide-react';

export function UserDetailsForm({ onSubmit, isProcessing = false, products = [], isLoadingProducts = true }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitting }
    } = useForm({
        mode: 'onBlur'
    });

    // Feature Flag: Set to true when backend is ready
    const ENABLE_PARTNER_FEATURE = false;

    const hasPartner = ENABLE_PARTNER_FEATURE && watch('hasPartner');

    // Dynamic Pricing Logic
    // 1. Identify Products
    const baseProduct = products.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'));
    const partnerProduct = products.find(p => p.sku.includes('REL') || p.sku.includes('PARTNER'));

    // 2. Get Prices (Safety defaults if loading or API fail)
    const basePriceVal = baseProduct ? Number(baseProduct.sale_price) : 51;
    const baseMrpVal = baseProduct ? Number(baseProduct.mrp) : 251;

    const relPriceVal = partnerProduct ? Number(partnerProduct.sale_price) : 101;
    const relMrpVal = partnerProduct ? Number(partnerProduct.mrp) : 501;

    // 3. Calculate Display Values
    // The "Partner Price" shown on checkbox is the DIFFERENCE (Upgrade Cost)
    const partnerUpgradeCost = relPriceVal - basePriceVal;

    // Total Price based on selection
    const totalPrice = hasPartner ? relPriceVal : basePriceVal;

    // Original Price (MRP) based on selection
    const originalPrice = hasPartner ? relMrpVal : baseMrpVal;

    const currencySymbol = baseProduct?.currency === 'USD' ? '$' : '₹';

    const handleFormSubmit = (data) => {
        const payload = { ...data, totalPrice, currency: baseProduct?.currency || 'INR' };
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
                                placeholder="e.g. Rahul Sharma"
                                error={errors.name?.message}
                                {...register('name', { required: 'Name is required' })}
                            />

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

                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    error={errors.dob?.message}
                                    {...register('dob', { required: 'Date of Birth is required' })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>

                            {ENABLE_PARTNER_FEATURE && (
                                <div className="flex items-center space-x-2 pt-4 border-t">
                                    <input
                                        type="checkbox"
                                        id="hasPartner"
                                        className="h-5 w-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                        {...register('hasPartner')}
                                    />
                                    <label htmlFor="hasPartner" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                        Include Partner Compatibility Report <span className="text-[var(--color-primary)] font-bold">
                                            ({partnerUpgradeCost > 0 ? '+' : ''}{currencySymbol}{partnerUpgradeCost})
                                        </span>
                                    </label>
                                </div>
                            )}

                            <div className={`
                    grid gap-4 overflow-hidden transition-all duration-300 ease-in-out
                    ${hasPartner ? 'max-h-[500px] opacity-100 pt-2' : 'max-h-0 opacity-0'}
                  `}>
                                <div className="text-sm font-semibold text-gray-900 border-b pb-1 mb-2">Partner Details</div>

                                <Input
                                    label="Partner's Name"
                                    placeholder="e.g. Priya Sharma"
                                    error={errors.partnerName?.message}
                                    {...register('partnerName', {
                                        required: hasPartner ? 'Partner Name is required' : false
                                    })}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Partner's DOB"
                                        type="date"
                                        error={errors.partnerDob?.message}
                                        {...register('partnerDob', {
                                            required: hasPartner ? 'Partner DOB is required' : false
                                        })}
                                    />

                                    <Input
                                        label="Partner's Time"
                                        type="time"
                                        error={errors.partnerTob?.message}
                                        {...register('partnerTob', {
                                            required: hasPartner ? 'Partner Time is required' : false
                                        })}
                                    />
                                </div>

                                <Input
                                    label="Partner's Place of Birth"
                                    placeholder="e.g. Pune, Maharashtra"
                                    error={errors.partnerPob?.message}
                                    {...register('partnerPob', {
                                        required: hasPartner ? 'Partner Place is required' : false
                                    })}
                                />
                            </div>
                        </CardContent>
                        {/* Hidden submit button to allow Enter key submission within the form */}
                        <button type="submit" className="hidden" />
                    </form>
                </Card>
            </div>

            {/* Right Column: Sticky Price Display (Desktop) & Fixed Bottom Bar (Mobile) */}
            {/* Right Column: Sticky Price Display (Desktop) & Fixed Bottom Bar (Mobile) */}
            <PriceDisplay
                basePrice={basePriceVal}
                partnerPrice={partnerUpgradeCost}
                hasPartner={hasPartner}
                totalPrice={totalPrice}
                originalPrice={originalPrice} // Now using real MRP from DB
                currency={currencySymbol}
                formId="numerology-form"
                isSubmitting={isSubmitting || isProcessing}
            />
        </div>
    );
}
