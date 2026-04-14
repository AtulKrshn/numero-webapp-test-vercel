import React, { useState } from 'react';

const faqs = [
    {
        q: 'How long does it take to receive the report?',
        a: 'Your personalized report will be delivered to your email as a PDF within 5–6 hours.'
    },
    {
        q: 'Where will I receive the report?',
        a: 'You\'ll receive the report in your email inbox as a beautifully designed PDF — you can read it on your phone, tablet, or laptop.'
    },
    {
        q: 'Which date of birth should I use?',
        a: 'Use your original date of birth. Numerology is entirely based on your exact birth date.'
    },
    {
        q: 'What can I ask in the personal question?',
        a: 'You can ask anything — career direction, starting a business, relationship guidance, or any specific question on your mind.'
    },
    {
        q: 'What language is the report in?',
        a: 'You can choose your preferred language — English, Hindi, or Hinglish — during checkout. The report is written in easy-to-read, practical language without any complicated jargon.'
    }
];

const FAQV2 = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="v2-section v2-bg-white">
            <h2 className="v2-section-title">Frequently Asked Questions</h2>

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
