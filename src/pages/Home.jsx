import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrustSection } from '../components/TrustSection';
import { Sparkles, Heart, ChevronRight, Hash, Layers, Gem } from 'lucide-react';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="space-y-0">

            {/* ===== SECTION 1: HERO ===== */}
            <section className="relative py-20 md:py-32 text-center overflow-hidden">
                {/* Dark atmospheric background */}
                <div className="absolute inset-0 bg-[var(--color-primary)] -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0505] via-[var(--color-primary)] to-[#2d0a0a] -z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl -z-[5]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

                <div className="max-w-3xl mx-auto px-4 space-y-8">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                        Aapka 2026 — numbers ne pehle se likh diya hai
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Vedic Numerology se jaaniye aapka saal kaisa rahega — aur use apne favour mein kaise use karein
                    </p>

                    <button
                        onClick={() => navigate('/reports')}
                        className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[var(--color-primary)] font-semibold text-lg rounded-lg hover:bg-amber-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        Apni Report Dekhiye
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* ===== SECTION 2: WHAT IS VEDIC NUMEROLOGY ===== */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-primary)]">
                            Vedic Numerology Kya Hai?
                        </h2>
                        <p className="text-[var(--color-muted)] mt-2 max-w-xl mx-auto">
                            Aapki birth date mein chhupa hai aapka poora blueprint
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Column 1 */}
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
                                <Hash className="w-7 h-7 text-amber-700" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-[var(--color-primary)]">Aapke Numbers</h3>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                Mulank (Root Number), Bhagyank (Destiny Number), aur Naamank (Name Number) — teeno milke aapki personality, strengths, aur life direction define karte hain
                            </p>
                        </div>

                        {/* Column 2 */}
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                                <Layers className="w-7 h-7 text-blue-700" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-[var(--color-primary)]">Active Planes</h3>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                Har insaan ka chart unique hota hai — Mental, Physical, Emotional aur Intuitive planes reveal karte hain aapki real strengths aur hidden risks
                            </p>
                        </div>

                        {/* Column 3 */}
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                                <Gem className="w-7 h-7 text-purple-700" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-[var(--color-primary)]">Remedies</h3>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                Jo numbers aapke chart mein missing hain, unke liye maha-mantra, semi-precious stone recommendations, aur practical guidance — sab report mein milta hai
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 3: REPORT TEASERS ===== */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-primary)]">
                            Hamare Reports
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Active Card: Numerology Report */}
                        <button
                            onClick={() => navigate('/reports')}
                            className="text-left rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
                        >
                            <div className="h-1.5 bg-gradient-to-r from-amber-500 via-[var(--color-primary)] to-amber-600"></div>
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-amber-700" />
                                    </div>
                                    <h3 className="font-display font-bold text-lg text-[var(--color-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">
                                        Vedic Numerology Report 2026
                                    </h3>
                                </div>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                                    Aapke personal year, core numbers aur planes ka poora analysis — predictions, remedies aur aapka personal sawaal
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xl font-bold text-[var(--color-primary)] font-sans">₹399</span>
                                    <span className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] font-medium group-hover:gap-2 transition-all">
                                        View Details <ChevronRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </button>

                        {/* Coming Soon Card: Partner Compatibility */}
                        <div className="text-left rounded-2xl border border-gray-200 bg-gray-50/60 overflow-hidden flex flex-col">
                            <div className="h-1.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-pink-100/60 rounded-lg flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-pink-400" />
                                        </div>
                                        <h3 className="font-display font-bold text-lg text-gray-500">
                                            Partner Compatibility Report
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                    Aap aur aapke partner ke numbers kitne compatible hain — relationship strengths, challenges aur guidance
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm text-gray-400 italic">Coming Soon</span>
                                    <span className="text-sm text-gray-400 font-medium">Jaldi Aata Hai</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 4: TRUST SECTION ===== */}
            <TrustSection />

            {/* ===== SECTION 5: CTA BANNER ===== */}
            <section className="py-14 md:py-20 bg-[var(--color-primary)] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0505] via-[var(--color-primary)] to-[#2d0a0a]"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

                <div className="relative z-10 max-w-2xl mx-auto px-4 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                        Taiyaar hain apna 2026 jaanne ke liye?
                    </h2>
                    <button
                        onClick={() => navigate('/reports')}
                        className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[var(--color-primary)] font-semibold text-lg rounded-lg hover:bg-amber-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        Apni Reports Dekhiye
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

        </div>
    );
}
