import React, { useState } from 'react';
import { UserDetailsForm } from '../components/form/UserDetailsForm';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFormSubmit = async (data) => {
        setIsProcessing(true);
        // Simulate network/API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        navigate('/success', { state: { orderData: data } });
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-display font-bold text-gray-900">
                    Sankhya Vedic Numerology
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Unlock the secrets of your life path with our detailed numerology analysis.
                </p>
            </div>

            <UserDetailsForm onSubmit={handleFormSubmit} isProcessing={isProcessing} />
        </div>
    );
}
