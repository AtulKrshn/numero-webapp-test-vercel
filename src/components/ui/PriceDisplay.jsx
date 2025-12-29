import React from 'react';
import { Card, CardContent } from './Card';
import { Button } from './Button';

export function PriceDisplay({
    basePrice,
    partnerPrice,
    hasPartner,
    totalPrice,
    currency = '₹',
    formId,
    isSubmitting
}) {
    return (
        <>
            {/* Desktop Sticky Sidebar */}
            <div className="hidden lg:block sticky top-6 self-start">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-display text-lg font-semibold text-gray-900 border-b pb-2">Order Summary</h3>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Base Numerology Report</span>
                                    <span>{currency}{basePrice}</span>
                                </div>
                                {hasPartner && (
                                    <div className="flex justify-between text-[var(--color-primary)] font-medium">
                                        <span>Partner Compatibility</span>
                                        <span>{currency}{partnerPrice}</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t flex justify-between items-center">
                                <span className="font-semibold text-gray-900">Total Amount</span>
                                <span className="font-display text-xl font-bold text-[var(--color-primary)]">
                                    {currency}{totalPrice}
                                </span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            form={formId}
                            className="w-full"
                            isLoading={isSubmitting}
                        >
                            Analyze Now
                        </Button>

                        <p className="text-xs text-center text-muted">
                            Complete analysis delivered instantly to your inbox.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Mobile Fixed Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden z-50">
                <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted">Total</span>
                        <span className="font-display text-lg font-bold text-[var(--color-primary)]">
                            {currency}{totalPrice}
                        </span>
                    </div>
                    <Button
                        type="submit"
                        form={formId}
                        className="flex-1"
                        isLoading={isSubmitting}
                    >
                        Analyze Now
                    </Button>
                </div>
            </div>
        </>
    );
}
