import React from 'react';

const Logo: React.FC = () => {
    const shadowStyle = {
        textShadow: `
            1px 1px 0px #a98e56,
            2px 2px 0px #8b7547,
            3px 3px 0px #6d5b38,
            4px 4px 0px #4f4229,
            5px 5px 8px rgba(0,0,0,0.5)
        `,
    };

    return (
        <div className="relative z-20 my-8">
            <h1 className="font-serif text-8xl text-gold" style={shadowStyle}>
                TA
            </h1>
        </div>
    );
};

export default Logo;
