import React from 'react';
import { ChevronRight } from 'lucide-react';

const StickyCTAV2 = ({ salePrice, mrp, currency, onCTA, isLoading }) => {
    return (
        <>
            <div className="v2-sticky-cta">
                <div className="v2-sticky-price">
                    {isLoading ? (
                        <div style={{ height: 24, width: 60, background: '#f0e6da', borderRadius: 6 }} />
                    ) : (
                        <>
                            {mrp > salePrice && (
                                <span className="v2-sticky-mrp">{currency}{mrp}</span>
                            )}
                            <span className="v2-sticky-sale">{currency}{salePrice}</span>
                        </>
                    )}
                </div>
                <button className="v2-btn" onClick={onCTA}>
                    Abhi Order Karein
                    <ChevronRight />
                </button>
            </div>
        </>
    );
};

export default StickyCTAV2;
