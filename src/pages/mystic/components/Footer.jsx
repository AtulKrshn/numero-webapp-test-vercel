import React from 'react';

const Footer = () => {
    return (
        <footer className="mystic-footer">
            <div>
                <a href="#" className="mystic-btn-outline">Privacy Policy</a>
                <a href="#" className="mystic-btn-outline">Disclaimer</a>
                <a href="#" className="mystic-btn-outline">Refund Policy</a>
            </div>

            <ul className="mystic-contact-list">
                <li>
                    <span>📧</span>
                    <span>Email - reports@mysticprashant.com</span>
                </li>
                <li>
                    <span>💬</span>
                    <span>Whatsapp No. - +91 8890750024</span>
                </li>
            </ul>

            <p style={{ marginTop: '40px', fontSize: '14px' }}>
                © {new Date().getFullYear()} Mystic Reports. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
