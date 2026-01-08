import React from 'react';

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="font-display text-2xl font-bold text-primary tracking-tight">
                    DevSankhya
                </span>
            </div>
        </header>
    );
}
