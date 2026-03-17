import React, { useState } from 'react';

const faqs = [
    {
        q: "How much time it will take to get report ?",
        a: "You will get your report within 4-5 working days after ordering it."
    },
    {
        q: "Where will we get this report ?",
        a: "You’ll get your Mystic Yearly Report on your Whatsapp/ E-mail."
    },
    {
        q: "Can I change Language of report after getting it ?",
        a: "We are committed to deliver you the best of our service hence we specifically ask for the language of the report during ordering. Hence, change in language will not be possible after sending the report to you."
    },
    {
        q: "Which Date Of Birth (D.O.B) Should I Use ?",
        a: "You Need to Mention Your Original Date Of Birth (D.O.B). Numerology is totally based on Original Date Of Birth (D.O.B)."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="mystic-section" style={{ paddingBottom: '80px' }}>
            <h2>Frequently Asked Questions<br />(FAQs)</h2>

            <div className="mystic-faq-list">
                {faqs.map((faq, index) => (
                    <div key={index} className="mystic-faq-item">
                        <button
                            className="mystic-faq-question"
                            onClick={() => toggleFaq(index)}
                        >
                            <span>{faq.q}</span>
                            <span>{openIndex === index ? '−' : '+'}</span>
                        </button>
                        {openIndex === index && (
                            <div className="mystic-faq-answer">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
