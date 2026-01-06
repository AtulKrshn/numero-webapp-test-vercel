import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass, MapPin } from 'lucide-react';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-25"></div>
                <div className="bg-red-50 p-6 rounded-full relative">
                    <Compass className="w-16 h-16 text-red-600 animate-pulse" />
                </div>
            </div>

            <h1 className="text-6xl font-serif text-gray-900 mb-2 font-bold">404</h1>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
                Destiny Not Found
            </h2>

            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
                It seems the numerological coordinates for this page don't align.
                Sometimes getting lost is just the universe trying to redirect you.
            </p>

            <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                <Home className="w-4 h-4" />
                <span>Return to Path</span>
            </button>

            <div className="mt-12 text-sm text-gray-400 flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Lost in the digital cosmos</span>
            </div>
        </div>
    );
};
