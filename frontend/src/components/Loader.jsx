import React from 'react';
import AnimatedLogo from './AnimatedLogo';

const Loader = ({ isVisible }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#2A2A2A] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* Animated SVG */}
        <div className="absolute inset-0 flex items-center justify-center animate-[fade-out_1s_ease-in-out_3.2s_forwards]">
          <AnimatedLogo />
        </div>

        {/* Real Logo fading in for perfect text quality */}
        <div className="absolute inset-0 flex items-center justify-center animate-[fade-in_1s_ease-in-out_3.2s_forwards] opacity-0">
          <img
            src="/logo.webp"
            alt="High Life Logo"
            className="h-[300px] md:h-[450px] lg:h-[600px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
