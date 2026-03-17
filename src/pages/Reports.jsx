import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { Sparkles, Heart, ChevronRight, Clock } from 'lucide-react';

export function Reports() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            const solo = data.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'));
            if (solo) setProduct(solo);
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    const salePrice = product ? Number(product.sale_price) : null;
    const mrp = product ? Number(product.mrp) : null;
    const currency = '₹';

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-primary)]">
                    Hamare Reports
                </h1>
                <p className="text-[var(--color-muted)] mt-2 text-lg">
                    Apne liye sahi report chuniye
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                {/* Card 1 — Active: Vedic Numerology Report */}
                <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    {/* Top accent */}
                    <div className="h-1.5 bg-gradient-to-r from-amber-500 via-[var(--color-primary)] to-amber-600"></div>

                    <div className="p-6 md:p-8 flex flex-col flex-1">
                        {/* Icon + Badge row */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-amber-700" />
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
                                <Clock className="w-3 h-3" />
                                10,000+ delivered
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-display font-bold text-[var(--color-primary)] mb-2">
                            Vedic Numerology Report 2026
                        </h2>

                        {/* Description */}
                        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                            Aapke personal year, core numbers aur planes ka poora analysis — predictions, remedies aur aapka personal sawaal
                        </p>

                        {/* Price */}
                        <div className="mb-6">
                            {isLoading ? (
                                <div className="flex items-baseline gap-2">
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-5 w-12 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                            ) : (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-[var(--color-primary)] font-sans">{currency}{salePrice}</span>
                                    {mrp && mrp > salePrice && (
                                        <span className="text-sm text-gray-400 line-through">{currency}{mrp}</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* CTA — pushed to bottom */}
                        <div className="mt-auto">
                            <button
                                onClick={() => navigate('/reports/numerology')}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                            >
                                Dekhiye Report
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 2 — Coming Soon: Partner Compatibility Report */}
                <div className="relative rounded-2xl border border-gray-200 bg-gray-50/60 overflow-hidden flex flex-col">
                    {/* Top accent — muted */}
                    <div className="h-1.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>

                    <div className="p-6 md:p-8 flex flex-col flex-1">
                        {/* Icon + Badge row */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-pink-100/60 rounded-xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-pink-400" />
                            </div>
                            <span className="inline-flex items-center text-xs font-semibold text-gray-500 bg-gray-200/80 px-3 py-1 rounded-full">
                                Coming Soon
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-display font-bold text-gray-500 mb-2">
                            Partner Compatibility Report
                        </h2>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Aap aur aapke partner ke numbers kitne compatible hain — relationship strengths, challenges aur guidance
                        </p>

                        {/* No price for coming soon */}
                        <div className="mb-6">
                            <span className="text-sm text-gray-400 italic">Price coming soon</span>
                        </div>

                        {/* CTA — disabled but styled */}
                        <div className="mt-auto">
                            <button
                                disabled
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                            >
                                Jaldi Aata Hai
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
