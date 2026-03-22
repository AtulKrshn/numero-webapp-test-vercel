import React, { useEffect } from 'react';
import './mystic/mystic.css';
import Hero from './mystic/components/Hero';
import Benefits from './mystic/components/Benefits';
import ProblemSection from './mystic/components/ProblemSection';
import Testimonials from './mystic/components/Testimonials';
import FAQ from './mystic/components/FAQ';
import PricingCTA from './mystic/components/PricingCTA';

const MysticLanding = () => {
    // Ensure the page scrolls to top on mount like a fresh landing page
    useEffect(() => {
        window.scrollTo(0, 0);
        // Fallback for different scroll containers or router restorations
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 0);
    }, []);

    return (
        <div className="mystic-container">
            <Hero />
            <Benefits />
            <ProblemSection />
            <Testimonials />
            <FAQ />
            <PricingCTA />
        </div>
    );
};

export default MysticLanding;
