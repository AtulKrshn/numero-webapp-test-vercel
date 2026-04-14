import React from 'react';

const testimonials = [
    {
        name: 'Priya M.',
        city: 'Mumbai',
        quote: 'I thought numerology was generic, but what the report said about my career perfectly matched my situation. The answer to my personal question was so detailed — totally worth it!'
    },
    {
        name: 'Rohit K.',
        city: 'Delhi',
        quote: 'Report arrived in 5 hours — I was surprised! The planes analysis helped me understand my strengths for the first time. The remedies section was the most useful — very practical.'
    },
    {
        name: 'Anjali S.',
        city: 'Bangalore',
        quote: 'I used to read online predictions but they all felt generic. This report gave me specific guidance based on my DOB — career, health, relationships, all covered. Highly recommend.'
    }
];

const TestimonialsV2 = () => {
    return (
        <section className="v2-section v2-bg-warm">
            <h2 className="v2-section-title">What People Are Saying</h2>
            <p className="v2-section-subtitle">
                Real people, real experiences
            </p>

            <div className="v2-testimonials-grid">
                {testimonials.map((t, i) => (
                    <div key={i} className="v2-testimonial-card">
                        <div className="v2-testimonial-stars">
                            {[...Array(5)].map((_, j) => (
                                <span key={j} className="v2-testimonial-star">★</span>
                            ))}
                        </div>
                        <p className="v2-testimonial-quote">"{t.quote}"</p>
                        <p className="v2-testimonial-author">
                            {t.name} <span className="v2-testimonial-city">• {t.city}</span>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsV2;
