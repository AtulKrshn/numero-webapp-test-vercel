import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export function PaymentFailed() {
    const navigate = useNavigate();
    const location = useLocation();
    const { error, orderData } = location.state || {}; // Capture error details passed from Home

    return (
        <div className="max-w-md mx-auto pt-10 px-4">
            <Card className="text-center p-6 border-red-100 shadow-lg">
                <CardContent className="space-y-6">
                    {/* Failure Icon */}
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 font-display">Payment Verification Failed</h2>
                        {orderData && (
                            <p className="text-sm font-medium text-gray-800">
                                Order for: {orderData.name}
                            </p>
                        )}
                        <p className="text-gray-600">
                            We could not verify your payment signature. This could be due to a security mismatch or a network interruption.
                        </p>
                        {error && (
                            <div className="bg-red-50 p-3 rounded text-xs text-red-800 break-words mt-2 font-mono">
                                Error: {error}
                            </div>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                            If money was deducted, it will be automatically refunded within 5-7 days.
                        </p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <Button variant="outline" onClick={() => navigate('/')} className="w-full border-red-200 text-red-700 hover:bg-red-50">
                            Try Again
                        </Button>
                        <Button variant="ghost" className="w-full text-gray-500 text-sm">
                            Contact Support
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
