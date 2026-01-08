import React from 'react';

export function Footer() {
    return (
        <footer className="w-full bg-[var(--color-footer)] text-[var(--color-footer-text)] pt-16 pb-8 text-left border-t-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Col 1: Brand */}
                    <div className="flex flex-col">
                        <h3 className="text-[var(--color-gold)] font-display text-base font-semibold uppercase tracking-wider mb-6">
                            About DevSankhya
                        </h3>
                        <p className="text-sm leading-relaxed opacity-90">
                            Unlocking human potential through the ancient science of numbers.
                        </p>
                    </div>

                    {/* Col 2: Policies */}
                    <div className="flex flex-col">
                        <h3 className="text-[var(--color-gold)] font-display text-base font-semibold uppercase tracking-wider mb-6">
                            Policies
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="/privacy.html" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms.html" className="hover:text-[var(--color-gold)] transition-colors">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/refund.html" className="hover:text-[var(--color-gold)] transition-colors">Refund Policy</a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Explore */}
                    <div className="flex flex-col">
                        <h3 className="text-[var(--color-gold)] font-display text-base font-semibold uppercase tracking-wider mb-6">
                            Explore
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="/#career-numerology" className="hover:text-[var(--color-gold)] transition-colors">Career Numerology</a>
                            </li>
                            <li>
                                <a href="/#marriage-compatibility" className="hover:text-[var(--color-gold)] transition-colors">Marriage Compatibility</a>
                            </li>
                            <li>
                                <a href="/#numerology-report-sample" className="hover:text-[var(--color-gold)] transition-colors">Sample Report</a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: CTA */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-[var(--color-gold)] font-display text-base font-semibold uppercase tracking-wider mb-6">
                            Ready?
                        </h3>
                        <a
                            href="/#numerology-form"
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-[var(--color-accent)] hover:bg-[#B45309] transition-colors"
                        >
                            Get Your Report
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#4A3B32] text-center">
                    <p className="text-[#C0A080] text-sm">
                        &copy; 2025-2026 DevSankhya Vedic Numerology. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
