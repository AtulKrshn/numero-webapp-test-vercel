import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link to="/" className="font-display text-2xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity">
                    DevSankhya
                </Link>
                <nav>
                    <Link to="/reports" className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                        Reports
                    </Link>
                </nav>
            </div>
        </header>
    );
}
