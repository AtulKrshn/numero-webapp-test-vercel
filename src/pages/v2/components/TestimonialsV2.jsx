import React from 'react';

const testimonials = [
    {
        name: 'Priya M.',
        city: 'Mumbai',
        quote: 'Mujhe laga tha numerology generic hoti hai, but report mein career ke baare mein jo likha tha woh bilkul meri situation pe fit hua. Personal question ka jawab itna detailed tha — paisa vasool!'
    },
    {
        name: 'Rohit K.',
        city: 'Delhi',
        quote: 'Report 5 ghante mein aa gayi — I was surprised! Planes analysis se pehli baar samjha ki meri strengths kya hain. Remedies section sabse useful laga, practical hai.'
    },
    {
        name: 'Anjali S.',
        city: 'Bangalore',
        quote: 'Pehle online predictions padhti thi but sab generic lagta tha. Is report mein meri DOB se specific guidance mili — career, health, relationships sab covered. Highly recommend.'
    }
];

const TestimonialsV2 = () => {
    return (
        <section className="v2-section v2-bg-warm">
            <h2 className="v2-section-title">Log Kya Keh Rahe Hain</h2>
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
