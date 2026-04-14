import React from 'react';

const reasons = [
    'Tailored to your numbers — every section is written exclusively for you',
    'Career, relationships, health — all in one place, in one comprehensive report',
    'Your personal question — directly answered with numerological analysis',
    'Practical remedies you can use in daily life — mantras, stones, and alignment tips',
    'No generic horoscopes — every insight is calculated from your exact birth date'
];

const WhyThisReportV2 = () => {
    return (
        <section className="v2-section v2-bg-warm">
            <h2 className="v2-section-title">Why This Report Is Essential for You</h2>
            <p className="v2-section-subtitle">
                Your 2026 plan, based on your numbers
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
