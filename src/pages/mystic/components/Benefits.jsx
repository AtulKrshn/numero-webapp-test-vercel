import React from 'react';

const Benefits = () => {
    return (
        <section className="mystic-section" style={{ backgroundColor: '#f9f9f9' }}>
            <h2>What You’ll Get Inside</h2>

            <ul className="mystic-list">
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>
                        <strong>Monthly Detailed Analysis</strong> — Month-by-month energy breakdown
                    </div>
                </li>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>
                        <strong>Monthly</strong> Finance, Career, Health, Study, Relationship & Family Predictions
                    </div>
                </li>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>
                        <strong>Monthly Remedies</strong> — Practical and spiritual remedies based on your personal numbers
                    </div>
                </li>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>
                        <strong>Personalized Crystal Suggestions</strong> — Crystals aligned with your Moolank & Bhagyank
                    </div>
                </li>
            </ul>

            <div className="mystic-btn-wrapper">
                <button className="mystic-btn">Order Now</button>
            </div>
        </section>
    );
};

export default Benefits;
