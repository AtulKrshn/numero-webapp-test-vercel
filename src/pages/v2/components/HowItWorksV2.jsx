import React from 'react';

const steps = [
    {
        number: 1,
        title: 'Fill the Form',
        desc: 'Name, date of birth, time & place — plus your personal question'
    },
    {
        number: 2,
        title: 'We Analyse',
        desc: 'Deep personalized analysis of your numbers — Loshu Grid, Planes, Predictions'
    },
    {
        number: 3,
        title: 'Report In Your Inbox',
        desc: 'Delivered to your email in 5–6 hours — 22+ page PDF report, ready to read'
    }
];

const HowItWorksV2 = () => {
    return (
        <section className="v2-section v2-bg-white">
            <h2 className="v2-section-title">How Will You Get Your Report?</h2>
            <p className="v2-section-subtitle">
                3 simple steps — that's all it takes
            </p>

            <div className="v2-steps">
                {steps.map((step) => (
                    <div key={step.number} className="v2-step">
                        <div className="v2-step-number">{step.number}</div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorksV2;
