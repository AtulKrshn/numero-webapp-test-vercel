import React from 'react';

const Hero = () => {
    return (
        <section className="mystic-section mystic-hero">
            <h4>10,000 + Already Sold</h4>
            <h2>
                Mystic Yearly Prediction <br /> Report 2026
            </h2>

            <img
                src="https://mysticreports.in/wp-content/uploads/elementor/thumbs/hjhjhjjjj-re2gz5hqf9w4yuz3nlp0bq0p3gqs9nerlf7zk5q44w.png"
                alt="Report Preview"
                className="mystic-hero-img"
            />

            <div className="mystic-features-grid">
                <div className="mystic-feature-card">
                    <h3>50+ Pages</h3>
                </div>
                <div className="mystic-feature-card">
                    <h3>Detailed Analysis</h3>
                </div>
                <div className="mystic-feature-card">
                    <h3>Monthly Remedies for Luck</h3>
                </div>
                <div className="mystic-feature-card">
                    <h3>Personal Bracelet Suggestion</h3>
                </div>
            </div>

            <div className="mystic-btn-wrapper">
                <button className="mystic-btn">Order Now</button>
            </div>
        </section>
    );
};

export default Hero;
