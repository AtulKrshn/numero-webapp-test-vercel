import React from 'react';
import { ChevronRight } from 'lucide-react';
import reportMockup from '../../../assets/v2/report-mockup.png';

const HeroV2 = ({ salePrice, mrp, currency, onCTA, isLoading }) => {
    return (
        <section className="v2-section v2-hero">
            <p className="v2-hero-blessing">॥ श्री गणेशाय नमः ॥</p>

            <div className="v2-hero-badge">
                <span>⭐</span> 10,000+ reports delivered
            </div>

            <h1>Aapka 2026 — Poora Saal, Ek Report Mein</h1>

            <img
                src={reportMockup}
                alt="Numerology Report 2026 — displayed on tablet and phone"
                className="v2-hero-mockup"
            />

            <div className="v2-hero-pills">
                <div className="v2-hero-pill">📄 22+ Pages</div>
                <div className="v2-hero-pill">📊 Personalized Planes</div>
                <div className="v2-hero-pill">💼 Career & Health</div>
                <div className="v2-hero-pill">🎯 Your Question Answered</div>
            </div>

            <div className="v2-price-row">
                {isLoading ? (
                    <div style={{ height: 32, width: 80, background: '#f0e6da', borderRadius: 8 }} />
                ) : (
                    <>
                        <span className="v2-price-sale">{currency}{salePrice}</span>
                        {mrp > salePrice && (
                            <span className="v2-price-mrp">{currency}{mrp}</span>
                        )}
                    </>
                )}
            </div>

            <button className="v2-btn" onClick={onCTA}>
                Apni Report Paaiye
                <ChevronRight />
            </button>

            <p style={{ fontSize: 13, color: '#b0a090', marginTop: 12 }}>
                Secure payment via Razorpay &bull; 5-6 ghante mein email pe
            </p>
        </section>
    );
};

export default HeroV2;
