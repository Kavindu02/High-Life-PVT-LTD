import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] pt-20 flex items-center overflow-hidden bg-[#1a1a1a]" style={{ backgroundImage: 'url(/Spice_pouches_on_textured_surface_202607101331.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Site theme color overlay */}
      <div className="absolute inset-0 bg-[#B79C6F]/40 mix-blend-multiply"></div>
      {/* Gradient to make text readable (darker on the right where text is) */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#2A2A2A]/90 via-[#2A2A2A]/60 to-[#B79C6F]/20"></div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row items-center relative z-10">

        {/* Left Side: Empty Spacer to maintain layout */}
        <div className="w-full md:w-1/2 h-full hidden md:block"></div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 text-center pb-20 md:pb-0 z-20">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold tracking-[0.2em] uppercase drop-shadow-md text-[#B79C6F] mb-2 md:mb-4">
            WORLD'S BEST
          </h2>
          <div className="border-b-2 border-[#B79C6F]/50 pb-4 md:pb-6 mb-6 inline-block text-left">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] leading-[1.1] tracking-tight drop-shadow-lg text-white font-black">
              <span className="block">Ceylon</span>
              <span className="block text-right pl-12 md:pl-24">Spices</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl lg:text-3xl font-medium drop-shadow-md text-white/90">
            100% Authentic <span className="text-[#B79C6F] mx-2">|</span> Premium Quality
          </p>

          <div className="relative mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#B79C6F] text-white hover:bg-[#a0875c] px-10 py-4 rounded font-bold text-lg transition-colors shadow-lg cursor-pointer inline-block relative z-10 w-full sm:w-auto"
            >
              Shop Now
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-[#1a1a1a] px-10 py-4 rounded font-bold text-lg transition-colors shadow-lg cursor-pointer inline-block relative z-10 w-full sm:w-auto"
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
