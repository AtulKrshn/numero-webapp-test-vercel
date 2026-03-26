import React from 'react';

const reasons = [
    'Aapke numbers ke hisaab se — har section sirf aapke liye likha jaata hai',
    'Career, relationships, health — sab ek jagah, ek comprehensive report mein',
    'Aapka personal sawaal — directly answered with numerological analysis',
    'Practical remedies jo aap daily life mein use kar sakte hain — mantras, stones, aur alignment tips',
    'Generic horoscopes nahi — har insight aapki exact birth date se calculated hai'
];

const WhyThisReportV2 = () => {
    return (
        <section className="v2-section v2-bg-warm">
            <h2 className="v2-section-title">Yeh Report Aapke Liye Kyun Zaroori Hai</h2>
            <p className="v2-section-subtitle">
                Aapka 2026 plan, aapke numbers ke hisaab se
            </p>

            <div className="v2-why-list">
                {reasons.map((reason, i) => (
                    <div key={i} className="v2-why-item">
                        <div className="v2-why-check">✓</div>
                        <p>{reason}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyThisReportV2;
