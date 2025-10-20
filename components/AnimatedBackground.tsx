import React from 'react';

const AnimatedBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            {/* Base radial gradient from original design */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(198,166,100,0.1)_0%,_rgba(17,17,17,0)_60%)]"></div>
            
            {/* Parallax Star Layers */}
            {/* These layers will be moved by CSS variables updated via mouse move in App.tsx */}
            <div 
                id="stars1"
                className="absolute inset-0 bg-[url('https://assets.codepen.io/128313/stars.svg')] bg-repeat"
                style={{ backgroundSize: '400px', transform: 'translate(var(--mouse-x-sm, 0), var(--mouse-y-sm, 0))', transition: 'transform 0.3s ease-out' }}
            ></div>
            <div
                id="stars2"
                className="absolute inset-0 bg-[url('https://assets.codepen.io/128313/stars.svg')] bg-repeat opacity-60"
                style={{ backgroundSize: '600px', transform: 'translate(var(--mouse-x-md, 0), var(--mouse-y-md, 0))', transition: 'transform 0.3s ease-out' }}
            ></div>
            <div
                id="stars3"
                className="absolute inset-0 bg-[url('https://assets.codepen.io/128313/stars.svg')] bg-repeat opacity-30"
                style={{ backgroundSize: '800px', transform: 'translate(var(--mouse-x-lg, 0), var(--mouse-y-lg, 0))', transition: 'transform 0.3s ease-out' }}
            ></div>

            {/* Twinkling effect layer */}
            <div className="absolute inset-0 bg-[url('https://assets.codepen.io/128313/twinkling.svg')] bg-repeat animate-twinkle"></div>
        </div>
    );
};

export default AnimatedBackground;
