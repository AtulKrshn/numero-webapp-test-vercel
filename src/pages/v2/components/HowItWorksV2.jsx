import React from 'react';

const steps = [
    {
        number: 1,
        title: 'Form Bhariye',
        desc: 'Name, date of birth, time & place — aur aapka ek personal sawaal'
    },
    {
        number: 2,
        title: 'Hum Analyse Karein',
        desc: 'Aapke numbers ka deep personalized analysis — Loshu Grid, Planes, Predictions'
    },
    {
        number: 3,
        title: 'Report Inbox Mein',
        desc: '5-6 ghante mein aapke email pe — 22+ page PDF report, ready to read'
    }
];

const HowItWorksV2 = () => {
    return (
        <section className="v2-section v2-bg-white">
            <h2 className="v2-section-title">Kaise Milegi Aapki Report?</h2>
            <p className="v2-section-subtitle">
                3 simple steps — bas itna karna hai
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
