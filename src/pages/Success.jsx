import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export function Success() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderData } = location.state || {};

    return (
        <div className="max-w-md mx-auto pt-10">
            <Card className="text-center p-6">
                <CardContent className="space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 font-display">
                            {location.state?.status === 'pending_sync' ? 'Payment Received!' : 'Order Confirmed!'}
                        </h2>
                        {orderData && (
                            <p className="text-sm font-medium text-gray-800">
                                Analysis for: {orderData.name}
                            </p>
                        )}
                        <p className="text-gray-600">
                            {location.state?.status === 'pending_sync'
                                ? "We have received your payment details. Our servers are syncing the transaction and you will receive a confirmation email shortly once verified."
                                : "Thank you for your request. Your detailed numerology report is being generated and will be sent to your email shortly."
                            }
                        </p>
                    </div>

                    <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                        Analyze Another Profile
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
