import React from 'react';

const Testimonials = () => {
    return (
        <section className="mystic-section" style={{ backgroundColor: '#f9f9f9', textAlign: 'center' }}>
            <h2>Testimonials</h2>
            <p style={{ marginBottom: '24px' }}>
                Some Happy Customers After Bought <strong>2026 Yearly Prediction Report</strong>
            </p>

            <div className="mystic-testimonials-wrapper">
                <img
                    className="mystic-testimonial-img"
                    src="https://mysticreports.in/wp-content/uploads/2025/11/whatsapp_chat-2.png"
                    alt="whatsapp_chat (2)"
                />
                <img
                    className="mystic-testimonial-img"
                    src="https://mysticreports.in/wp-content/uploads/2025/11/whatsapp_chat-3.png"
                    alt="whatsapp_chat (3)"
                />
                {/* Placeholder for more if needed, original had a carousel duplicate */}
            </div>
        </section>
    );
};

export default Testimonials;
