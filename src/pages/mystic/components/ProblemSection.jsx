import React from 'react';

const ProblemSection = () => {
    return (
        <section className="mystic-section">
            <h2>Why You Need This Report</h2>

            <ul className="mystic-list" style={{ marginBottom: '40px' }}>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>Understand your life path and align with universal energy</div>
                </li>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>Plan your months with clarity</div>
                </li>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>Avoid unnecessary challenges and embrace lucky phases</div>
                </li>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>Stay balanced with monthly remedies</div>
                </li>
                <li>
                    <div className="mystic-list-icon">⏩</div>
                    <div>Attract success and positive vibrations</div>
                </li>
            </ul>

            <div className="mystic-btn-wrapper">
                <button className="mystic-btn">Order Now</button>
            </div>

            <div style={{ padding: '40px 0 20px' }}>
                <h2>Why This Isn't Just a Normal Report</h2>

                <div className="mystic-compare-list">
                    <div className="mystic-compare-item">
                        <div className="mystic-compare-bad">
                            <span>❌</span>
                            <span>No generic predictions.</span>
                        </div>
                        <div className="mystic-compare-good">
                            <span>✅</span>
                            <span>Every insight is 100% personalized based on your date of birth and Your Personal Year.</span>
                        </div>
                    </div>

                    <div className="mystic-compare-item">
                        <div className="mystic-compare-bad">
                            <span>❌</span>
                            <span>Complicated numerology terms that confuse you.</span>
                        </div>
                        <div className="mystic-compare-good">
                            <span>✅</span>
                            <span>Clean visuals, Easy to Understand, and plain English and Hindi explanations.</span>
                        </div>
                    </div>

                    <div className="mystic-compare-item">
                        <div className="mystic-compare-bad">
                            <span>❌</span>
                            <span>No copy-paste remedies.</span>
                        </div>
                        <div className="mystic-compare-good">
                            <span>✅</span>
                            <span>Monthly remedies and crystal suggestions tailored to your personal vibrations.</span>
                        </div>
                    </div>

                    <div className="mystic-compare-item">
                        <div className="mystic-compare-bad">
                            <span>❌</span>
                            <span>No vague “good or bad year” statements.</span>
                        </div>
                        <div className="mystic-compare-good">
                            <span>✅</span>
                            <span>Detailed month-by-month guidance for finance, career, relationships & health.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mystic-btn-wrapper">
                <button className="mystic-btn">Order Now</button>
            </div>
        </section>
    );
};

export default ProblemSection;
