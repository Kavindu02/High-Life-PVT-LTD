import React from 'react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen pt-20 flex items-center overflow-hidden bg-[#1a1a1a] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/hero_background.webp)' }}
    >
      {/* Site theme color overlay */}
      <div className="absolute inset-0 bg-[#B79C6F]/40 mix-blend-multiply"></div>
      {/* Gradient to make text readable (darker on the left where text is) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A]/90 via-[#2A2A2A]/60 to-[#B79C6F]/20"></div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row items-center relative z-10">

        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 md:px-8 lg:px-12 text-center lg:text-left pb-20 lg:pb-0 z-20 lg:-translate-x-8 xl:-translate-x-16">
          <div className="relative pb-4 md:pb-6 mb-4 md:mb-6 inline-block text-left w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-script drop-shadow-md text-[#B79C6F] mb-0 md:mb-1 text-center lg:text-left w-full pl-1 relative z-10">
              World's Best
            </h2>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-[110px] leading-[1.05] drop-shadow-xl flex flex-col items-center lg:items-start justify-center lg:justify-start">
              <span className="font-black text-[#FBF5EB] tracking-wide text-[0.85em]">Ceylon</span>
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B79C6F] via-[#E5D3B3] to-[#B79C6F] tracking-wider pl-1">Spices</span>
            </h1>

            {/* Premium Divider Line */}
            <div className="absolute bottom-0 left-0 w-full flex items-center justify-center pointer-events-none">
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#B79C6F] to-transparent opacity-80"></div>
              <div className="absolute w-2 h-2 rotate-45 bg-[#B79C6F]"></div>
            </div>
          </div>
          <p className="text-sm md:text-base lg:text-lg font-medium drop-shadow-md text-white/90 max-w-[450px] mx-auto lg:mx-0 leading-relaxed mt-2 md:mt-4">
            Premium handpicked Ceylon spices bringing authentic flavor and rich aroma to your kitchen.
          </p>

          <div className="relative mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full">
            <a
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#B79C6F] text-white hover:bg-[#a0875c] px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-lg cursor-pointer text-center relative z-10 w-full max-w-[260px] sm:w-auto sm:max-w-none sm:px-10 btn-shine whitespace-nowrap"
            >
              Shop Now
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border-2 border-white/70 text-white hover:bg-[#FBF5EB] hover:border-[#FBF5EB] hover:text-[#1a1a1a] px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-lg cursor-pointer text-center relative z-10 w-full max-w-[260px] sm:w-auto sm:max-w-none sm:px-10 btn-shine whitespace-nowrap"
            >
              Contact Us
            </a>
          </div>

        </div>

        {/* Right Side: Empty Spacer to maintain layout */}
        <div className="w-full lg:w-1/2 h-full hidden lg:block"></div>

      </div>
    </section>
  );
};

export default Hero;
