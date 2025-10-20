import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="relative w-24 h-24" aria-label="Loading..." role="status">
            {/* Background Pulsing Glow */}
            <div className="absolute inset-0 rounded-full bg-gold/20 animate-pulse"></div>
            
            {/* Spinning Arc */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold animate-spin"></div>
            
            {/* Inner Static Circle */}
            <div className="absolute inset-4 rounded-full border-2 border-gold/30"></div>

            {/* Center Dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold"></div>
        </div>
    );
};

export default LoadingSpinner;
