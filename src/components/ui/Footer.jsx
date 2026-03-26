import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="w-full bg-[#fef8f2] text-[#5a3d2b] pt-16 pb-8 text-left border-t border-[#f0e6da]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Col 1: Brand & Contact */}
                    <div className="flex flex-col">
                        <h3 className="text-[var(--color-primary)] text-base font-bold uppercase tracking-wider mb-6">
                            About DevSankhya
                        </h3>
                        <p className="text-sm leading-relaxed opacity-90 mb-6">
                            Unlocking human potential through the ancient science of numbers.
                        </p>

                        <div className="space-y-3 pt-4 border-t border-[#f0e6da]">
                            <a href="mailto:support@devsankhya.com" className="flex items-center gap-3 text-sm hover:text-[var(--color-accent)] transition-colors opacity-90 hover:opacity-100">
                                <span>support@devsankhya.com</span>
                            </a>
                            <a href="https://wa.me/918890750024" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-[var(--color-accent)] transition-colors opacity-90 hover:opacity-100">
                                <span className="text-base text-[var(--color-primary)] opacity-80">💬</span>
                                <span>+91 82506 68150</span>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Policies */}
                    <div className="flex flex-col">
                        <h3 className="text-[var(--color-primary)] text-base font-bold uppercase tracking-wider mb-6">
                            Policies
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="/privacy.html" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms.html" className="hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/refund.html" className="hover:text-[var(--color-accent)] transition-colors">Refund Policy</a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Products */}
                    <div className="flex flex-col">
                        <h3 className="text-[var(--color-primary)] text-base font-bold uppercase tracking-wider mb-6">
                            Products
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/reports" className="hover:text-[var(--color-accent)] transition-colors">Reports</Link>
                            </li>
                            <li>
                                <Link to="/reports/numerology" className="hover:text-[var(--color-accent)] transition-colors">Vedic Numerology Report</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: CTA */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-[var(--color-primary)] text-base font-bold uppercase tracking-wider mb-6">
                            Ready?
                        </h3>
                        <Link
                            to="/reports"
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-[var(--color-accent)] hover:bg-[#B45309] shadow-md hover:shadow-lg transition-all"
                        >
                            Get Your Report
                        </Link>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#f0e6da] text-center">
                    <p className="text-[#8c7a6b] text-sm">
                        &copy; 2025-2026 DevSankhya Vedic Numerology. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

