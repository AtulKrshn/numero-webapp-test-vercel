import React from 'react';

const features = [
    {
        icon: '🔢',
        title: 'Core Numbers',
        desc: 'Mulank, Bhagyank, Naamank — aapki personality, strengths aur life direction ka detailed breakdown'
    },
    {
        icon: '📊',
        title: 'Active Planes Analysis',
        desc: 'Mental, Will, Stability, Creative — sirf aapke chart ke active planes, with Loshu Grid visualization'
    },
    {
        icon: '💼',
        title: 'Career & Money Guidance',
        desc: '2026 mein kaun si roles suit karengi, business kaise build karein, aur income path kaise strengthen karein'
    },
    {
        icon: '❤️',
        title: 'Relationships',
        desc: 'Mature communication, emotional balance, aur boundary setting — relationships ko healthier banana ke liye'
    },
    {
        icon: '🏥',
        title: 'Health & Well-being',
        desc: 'Stress management, digestion, routine — aapke numbers ke hisaab se personalized health guidance'
    },
    {
        icon: '🎯',
        title: 'Your Personal Question',
        desc: 'Form mein apna ek sawaal poochiye — career, relationship, ya kuch bhi — report mein detailed jawab milega'
    },
    {
        icon: '🔮',
        title: 'Lucky Elements',
        desc: 'Aapke lucky numbers, lucky colors, aur sabse achhe months for 2026 — calculated from your chart'
    },
    {
        icon: '💎',
        title: 'Remedies & Stones',
        desc: 'Missing numbers ke liye maha-mantra, semi-precious stone recommendations, aur daily alignment tips'
    }
];

const WhatsInsideV2 = () => {
    return (
        <section className="v2-section v2-bg-white">
            <h2 className="v2-section-title">Report Mein Kya Milega?</h2>
            <p className="v2-section-subtitle">
                Har section aapki birth date se calculated — generic nahi, sirf aapke liye
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
