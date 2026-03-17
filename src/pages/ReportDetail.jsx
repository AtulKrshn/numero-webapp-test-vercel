import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { trackEvent } from '../utils/pixel';
import { Star, Sparkles, BookOpen, Gem, MessageCircleQuestion, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import MysticLanding from './MysticLanding';

export function ReportDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const sentViewContent = useRef(false);

    useEffect(() => {
        const loadProduct = async () => {
            const products = await fetchProducts();
            const solo = products.find(p => p.sku.includes('FULL') || p.sku.includes('SINGLE'));
            if (solo) {
                setProduct(solo);
            }
            setIsLoading(false);
        };
        loadProduct();
    }, []);

    // ViewContent pixel — once when product is ready
    useEffect(() => {
        if (product && !sentViewContent.current) {
            sentViewContent.current = true;
            trackEvent('ViewContent', {
                content_name: 'Numerology Report 2026',
                content_ids: [product.sku],
                content_type: 'product',
                value: product.sale_price,
                currency: 'INR'
            });
        }
    }, [product]);

    if (slug !== 'numerology') {
        navigate('/reports', { replace: true });
        return null;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin h-8 w-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const salePrice = product ? product.sale_price : 399;
    const mrp = product ? product.mrp : 999;
    const currency = '₹';

    const handleCTA = () => {
        navigate('/order/numerology');
    };

    return <MysticLanding />;

    if (false) {
        return (
            <div className="space-y-0">

                {/* ===== SECTION 1: HERO ===== */}
                <section className="relative py-16 md:py-24 text-center overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 -z-10"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 rounded-full blur-3xl -z-10"></div>

                    <div className="max-w-3xl mx-auto px-4 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-amber-100/80 text-amber-800 px-4 py-1.5 rounded-full text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            5-6 ghante mein aapke inbox mein
                        </div>

                        <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-primary)] leading-tight">
                            Aapke 2026 ke numbers — predictions, remedies, aur aapka personal sawaal
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                            Apni exact birth date se jaaniye — is saal aapka career, relationships, health aur money ka kya kehta hai aapka chart
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-[var(--color-primary)] font-sans">{currency}{salePrice}</span>
                                <span className="text-xl text-gray-400 line-through decoration-2">{currency}{mrp}</span>
                            </div>
                            <button
                                onClick={handleCTA}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                            >
                                Apni Report Paaiye
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-[var(--color-muted)] pt-2">
                            10,000+ reports delivered • Secure payment via Razorpay
                        </p>
                    </div>
                </section>

                {/* ===== SECTION 2: WHAT'S INSIDE ===== */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-primary)]">
                                Report Mein Kya Milega
                            </h2>
                            <p className="text-[var(--color-muted)] mt-2">
                                Aapke numbers ke hisaab se — sirf aapke liye
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-lg hover:border-[var(--color-secondary)]/40 transition-all duration-300">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-6 h-6 text-amber-700" />
                                </div>
                                <h3 className="font-display font-semibold text-lg text-[var(--color-primary)] mb-2">2026 Predictions</h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                    Aapke personal year number ke hisaab se career, money, relationships aur health ka poora breakdown
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-lg hover:border-[var(--color-secondary)]/40 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-6 h-6 text-blue-700" />
                                </div>
                                <h3 className="font-display font-semibold text-lg text-[var(--color-primary)] mb-2">Planes Analysis</h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                    Aapke chart mein jo planes active hain unka detailed analysis — strengths aur risks dono
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-lg hover:border-[var(--color-secondary)]/40 transition-all duration-300">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Gem className="w-6 h-6 text-purple-700" />
                                </div>
                                <h3 className="font-display font-semibold text-lg text-[var(--color-primary)] mb-2">Missing Numbers + Remedies</h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                    Jo numbers missing hain unke liye maha-mantra aur semi-precious stone recommendation
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-lg hover:border-[var(--color-secondary)]/40 transition-all duration-300">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <MessageCircleQuestion className="w-6 h-6 text-green-700" />
                                </div>
                                <h3 className="font-display font-semibold text-lg text-[var(--color-primary)] mb-2">Your Personal Question</h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                    Form mein apna ek sawaal poochiye — career, business, relationship — aur report mein uska jawab milega
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 3: SAMPLE PREVIEW ===== */}
                <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-primary)]">
                                Aisi Hogi Aapki Report
                            </h2>
                            <p className="text-[var(--color-muted)] mt-2">
                                Yeh sirf ek jhalak hai — aapki report aapke exact numbers ke hisaab se poori alag hogi
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sample Card 1: Core Numbers */}
                            <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden shadow-sm">
                                <div className="px-6 py-4 border-b border-[var(--color-border)] bg-amber-50/50">
                                    <h3 className="font-display font-semibold text-[var(--color-primary)]">Core Numbers Analysis</h3>
                                    <p className="text-xs text-[var(--color-muted)] mt-0.5">Mulank · Bhagyank · Naamank</p>
                                </div>
                                <div className="px-6 py-5 space-y-3 relative">
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-700 font-medium">Mulank (Root Number): 3</p>
                                        <p className="text-sm text-gray-600 blur-[3px] select-none">Aapka Mulank 3 hai — yeh creativity aur self-expression ka number hai. Jupiter iske swami hain, jo aapko natural leadership...</p>
                                        <p className="text-sm text-gray-600 blur-[3px] select-none">2026 mein Personal Year 5 ke saath, yeh saal aapke liye transformation aur unexpected changes leke aayega...</p>
                                    </div>
                                    <div className="space-y-2 pt-2 border-t border-dashed border-gray-200">
                                        <p className="text-sm text-gray-700 font-medium blur-[2px] select-none">Bhagyank (Destiny Number): 7</p>
                                        <p className="text-sm text-gray-600 blur-[4px] select-none">Aapka Bhagyank spiritual growth aur deep research ki taraf point karta hai. Ketu ka influence aapko intuitive decisions...</p>
                                    </div>
                                    {/* Fade overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                                </div>
                            </div>

                            {/* Sample Card 2: Planes Analysis */}
                            <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden shadow-sm">
                                <div className="px-6 py-4 border-b border-[var(--color-border)] bg-blue-50/50">
                                    <h3 className="font-display font-semibold text-[var(--color-primary)]">Planes of Expression</h3>
                                    <p className="text-xs text-[var(--color-muted)] mt-0.5">Mental · Physical · Emotional · Intuitive</p>
                                </div>
                                <div className="px-6 py-5 space-y-3 relative">
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-700 font-medium">Mental Plane: Strong (4, 5, 3 present)</p>
                                        <p className="text-sm text-gray-600 blur-[3px] select-none">Aapka mental plane bahut active hai — analytical thinking aur logical decision-making mein aap exceptional hain. Lekin overthinking ka risk...</p>
                                        <p className="text-sm text-gray-600 blur-[3px] select-none">2026 mein Mercury retrograde phases mein apne decisions ko rush mat kariye — patience aapka sabse bada ally hoga...</p>
                                    </div>
                                    <div className="space-y-2 pt-2 border-t border-dashed border-gray-200">
                                        <p className="text-sm text-gray-700 font-medium blur-[2px] select-none">Emotional Plane: Needs Attention</p>
                                        <p className="text-sm text-gray-600 blur-[4px] select-none">Numbers 2 aur 6 ki absence emotional plane mein ek gap create karti hai. Relationships mein vulnerability feel ho sakti hai...</p>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 4: PERSONAL QUESTION CALLOUT ===== */}
                <section className="py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[#4a1010] p-8 md:p-12 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                            <div className="relative z-10 space-y-4">
                                <MessageCircleQuestion className="w-12 h-12 mx-auto text-amber-300" />
                                <h2 className="text-2xl md:text-3xl font-display font-bold">
                                    Aap Apna Sawaal Pooch Sakte Hain
                                </h2>
                                <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
                                    Report form mein aapko ek personal sawaal likhne ka mauka milega — jo bhi aapke mann mein hai, hum uska jawab report mein دیتے hain
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 5: TESTIMONIALS ===== */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-primary)]">
                                Log Kya Keh Rahe Hain
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* TODO: replace with real testimonials */}
                            {[
                                {
                                    name: 'Priya M.',
                                    city: 'Mumbai',
                                    quote: 'Mujhe laga tha numerology generic hoti hai, lekin report mein mere career ke baare mein jo likha tha woh bilkul sahi nikla. Very impressed!'
                                },
                                {
                                    name: 'Rohit K.',
                                    city: 'Delhi',
                                    quote: 'Personal question ka jawab itna detailed tha ki main shocked tha. Paisa vasool se zyada hai — highly recommend everyone.'
                                },
                                {
                                    name: 'Anjali S.',
                                    city: 'Bangalore',
                                    quote: 'Remedies section sabse useful laga — mantra aur stone recommendation dono practical hain. Report 5 ghante mein aa gayi!'
                                }
                            ].map((t, i) => (
                                <div key={i} className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 italic">
                                        "{t.quote}"
                                    </p>
                                    <div className="text-sm font-medium text-[var(--color-primary)]">
                                        {t.name} <span className="text-[var(--color-muted)] font-normal">• {t.city}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 6: PRICE ANCHOR + FINAL CTA ===== */}
                <section className="py-16 md:py-20 bg-gradient-to-b from-amber-50/50 to-white">
                    <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
                        <div className="space-y-3">
                            <p className="text-[var(--color-muted)] text-lg">
                                Ek personal numerologist session: <span className="line-through">₹2,000–₹5,000</span>
                            </p>
                            <p className="text-2xl md:text-3xl font-display font-bold text-[var(--color-primary)]">
                                Aapki poori 2026 report: sirf {currency}{salePrice}
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)]">
                                <Clock className="w-4 h-4" />
                                5-6 ghante mein aapke inbox mein
                            </div>
                        </div>

                        <button
                            onClick={handleCTA}
                            className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--color-primary)] text-white font-semibold text-lg rounded-lg hover:bg-[var(--color-primary-light)] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                        >
                            Abhi Apni Report Paaiye — {currency}{salePrice}
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="flex items-center justify-center gap-4 text-sm text-[var(--color-muted)]">
                            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure Payment</span>
                            <span>•</span>
                            <span>10,000+ Reports Delivered</span>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
