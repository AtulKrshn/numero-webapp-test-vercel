import React, { useState } from 'react';

const faqs = [
    {
        q: 'Report kitne time mein milegi?',
        a: 'Aapki personalized report 5-6 ghante mein aapke email pe PDF format mein aa jaayegi.'
    },
    {
        q: 'Report kahan milegi?',
        a: 'Report aapke email inbox mein milegi as a beautifully designed PDF — aap ise phone, tablet ya laptop pe padh sakte hain.'
    },
    {
        q: 'Kaunsi date of birth use karein?',
        a: 'Aapki original date of birth use karein. Numerology poori tarah se aapki exact birth date pe based hoti hai.'
    },
    {
        q: 'Personal question mein kya pooch sakte hain?',
        a: 'Aap kuch bhi pooch sakte hain — career direction, business start karna, relationship guidance, ya koi bhi specific sawaal jo aapke mann mein ho.'
    },
    {
        q: 'Kya yeh report Hindi mein hogi?',
        a: 'Report Hinglish (Hindi + English mix) mein hoti hai — easy to read, practical language mein, bina kisi complicated jargon ke.'
    }
];

const FAQV2 = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="v2-section v2-bg-white">
            <h2 className="v2-section-title">Aksar Poochhe Jaane Wale Sawaal</h2>

            <div className="v2-faq-list">
                {faqs.map((faq, index) => (
                    <div key={index} className="v2-faq-item">
                        <button
                            className="v2-faq-question"
                            onClick={() => toggle(index)}
                        >
                            <span>{faq.q}</span>
                            <span className="v2-faq-toggle">
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className="v2-faq-answer">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQV2;
