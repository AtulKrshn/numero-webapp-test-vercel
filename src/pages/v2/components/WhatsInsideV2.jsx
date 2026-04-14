import React from 'react';

const features = [
    {
        icon: '🔢',
        title: 'Core Numbers',
        desc: 'Mulank, Bhagyank, Naamank — a detailed breakdown of your personality, strengths, and life direction'
    },
    {
        icon: '📊',
        title: 'Active Planes Analysis',
        desc: 'Mental, Will, Stability, Creative — only the planes active in your chart, with Loshu Grid visualization'
    },
    {
        icon: '💼',
        title: 'Career & Money Guidance',
        desc: 'Which roles will suit you in 2026, how to build your business, and how to strengthen your income path'
    },
    {
        icon: '❤️',
        title: 'Relationships',
        desc: 'Mature communication, emotional balance, and boundary setting — to build healthier relationships'
    },
    {
        icon: '🏥',
        title: 'Health & Well-being',
        desc: 'Stress management, digestion, routine — personalized health guidance based on your numbers'
    },
    {
        icon: '🎯',
        title: 'Your Personal Question',
        desc: 'Ask your question in the form — career, relationship, or anything else — get a detailed answer in your report'
    },
    {
        icon: '🔮',
        title: 'Lucky Elements',
        desc: 'Your lucky numbers, lucky colors, and best months for 2026 — calculated from your chart'
    },
    {
        icon: '💎',
        title: 'Remedies & Stones',
        desc: 'Maha-mantra, semi-precious stone recommendations, and daily alignment tips for your missing numbers'
    }
];

const WhatsInsideV2 = () => {
    return (
        <section className="v2-section v2-bg-white">
            <h2 className="v2-section-title">What's Inside Your Report?</h2>
            <p className="v2-section-subtitle">
                Every section calculated from your birth date — not generic, exclusively for you
            </p>

            <div className="v2-inside-grid">
                {features.map((feat, i) => (
                    <div key={i} className="v2-inside-card">
                        <span className="v2-inside-icon">{feat.icon}</span>
                        <h3>{feat.title}</h3>
                        <p>{feat.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatsInsideV2;
