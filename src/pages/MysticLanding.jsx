import React, { useEffect } from 'react';
import './mystic/mystic.css';
import Hero from './mystic/components/Hero';
import Benefits from './mystic/components/Benefits';
import ProblemSection from './mystic/components/ProblemSection';
import Testimonials from './mystic/components/Testimonials';
import FAQ from './mystic/components/FAQ';
import Footer from './mystic/components/Footer';
import PricingCTA from './mystic/components/PricingCTA';

const MysticLanding = () => {
    // Ensure the page scrolls to top on mount like a fresh landing page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mystic-container">
            <Hero />
            <Benefits />
            <ProblemSection />
            <Testimonials />
            <FAQ />
            <Footer />
            <PricingCTA />
        </div>
    );
};

export default MysticLanding;
