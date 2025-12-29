import React from 'react';
import { UserDetailsForm } from '../components/form/UserDetailsForm';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    const handleFormSubmit = (data) => {
        // In the future, this will initiate the payment order.
        // For now, we'll just log and mock redirect.
        console.log('Home Page Received Data:', data);

        // Mocking a successful "action" for now, usually we'd await API here.
        navigate('/success');
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

            <UserDetailsForm onSubmit={handleFormSubmit} />
        </div>
    );
}
