import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';

import { PriceDisplay } from '../ui/PriceDisplay';

export function UserDetailsForm({ onSubmit, isProcessing = false }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitting }
    } = useForm({
        mode: 'onBlur'
    });

    const hasPartner = watch('hasPartner');

    // Pricing Logic
    const basePrice = 51;
    const partnerPrice = 50;
    const totalPrice = hasPartner ? basePrice + partnerPrice : basePrice;

    const handleFormSubmit = (data) => {
        const payload = { ...data, totalPrice, currency: 'INR' };
        if (onSubmit) onSubmit(payload);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full max-w-5xl mx-auto pb-24 lg:pb-0">
            {/* Left Column: Form Inputs */}
            <div className="lg:col-span-2">
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    error={errors.dob?.message}
                                    {...register('dob', { required: 'Date of Birth is required' })}
                                />

                                <Input
                                    label="Time of Birth"
                                    type="time"
                                    error={errors.tob?.message}
                                    {...register('tob', { required: 'Time of Birth is required' })}
                                />
                            </div>

                            <Input
                                label="Place of Birth"
                                placeholder="e.g. Mumbai, Maharashtra"
                                error={errors.pob?.message}
                                {...register('pob', { required: 'Place of Birth is required' })}
                            />

                            <div className="flex items-center space-x-2 pt-4 border-t">
                                <input
                                    type="checkbox"
                                    id="hasPartner"
                                    className="h-5 w-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                    {...register('hasPartner')}
                                />
                                <label htmlFor="hasPartner" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Include Partner Compatibility Report <span className="text-[var(--color-primary)] font-bold">(+₹{partnerPrice})</span>
                                </label>
                            </div>

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
            <PriceDisplay
                basePrice={basePrice}
                partnerPrice={partnerPrice}
                hasPartner={hasPartner}
                totalPrice={totalPrice}
                formId="numerology-form"
                isSubmitting={isSubmitting || isProcessing}
            />
        </div>
    );
}
