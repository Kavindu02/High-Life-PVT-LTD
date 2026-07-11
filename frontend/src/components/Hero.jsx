import React from 'react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen pt-20 flex items-center overflow-hidden bg-[#1a1a1a] bg-cover bg-[25%_center] md:bg-center bg-no-repeat" 
      style={{ backgroundImage: 'url(/Spice_pouches_on_textured_surface_202607101331.webp)' }}
    >
      {/* Site theme color overlay */}
      <div className="absolute inset-0 bg-[#B79C6F]/40 mix-blend-multiply"></div>
      {/* Gradient to make text readable (darker on the right where text is) */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#2A2A2A]/90 via-[#2A2A2A]/60 to-[#B79C6F]/20"></div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row items-center relative z-10">

        {/* Left Side: Empty Spacer to maintain layout */}
        <div className="w-full md:w-1/2 h-full hidden md:block"></div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 text-center pb-20 md:pb-0 z-20 md:translate-x-8 lg:translate-x-16">
          <h2 className="text-xs md:text-xl lg:text-3xl font-bold tracking-[0.2em] uppercase drop-shadow-md text-[#B79C6F] mb-2 md:mb-4">
            WORLD'S BEST
          </h2>
          <div className="relative pb-4 md:pb-6 mb-4 md:mb-6 inline-block text-left w-full sm:w-auto">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] leading-[1.1] tracking-tight drop-shadow-lg text-[#FBF5EB] font-black flex flex-row md:flex-col justify-center md:justify-start gap-2 md:gap-0">
              <span>Ceylon</span>
              <span className="md:text-right md:pl-24">Spices</span>
            </h1>
            
            {/* Premium Divider Line */}
            <div className="absolute bottom-0 left-0 w-full flex items-center justify-center pointer-events-none">
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#B79C6F] to-transparent opacity-80"></div>
              <div className="absolute w-2 h-2 rotate-45 bg-[#E6B754] shadow-[0_0_12px_rgba(230,183,84,1)]"></div>
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg font-medium drop-shadow-md text-white/90 max-w-[450px] mx-auto leading-relaxed mt-2 md:mt-4">
            Premium handpicked Ceylon spices bringing authentic flavor and rich aroma to your kitchen.
          </p>

          <div className="relative mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <a
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#B79C6F] text-white hover:bg-[#a0875c] px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-lg cursor-pointer text-center relative z-10 w-full max-w-[260px] sm:w-auto sm:max-w-none sm:px-10 btn-shine"
            >
              Shop Now
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border-2 border-white/70 text-white hover:bg-[#FBF5EB] hover:border-[#FBF5EB] hover:text-[#1a1a1a] px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-lg cursor-pointer text-center relative z-10 w-full max-w-[260px] sm:w-auto sm:max-w-none sm:px-10 btn-shine"
            >
              Contact Us
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
