import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-[#B79C6F] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row items-center relative z-10">

        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2 h-full flex items-end justify-center md:justify-start relative pb-10 md:pb-0">
          <img
            src="/hero_products_large.webp"
            alt="Premium Spices"
            className="w-[80%] md:w-[120%] lg:w-[130%] max-w-none object-contain translate-y-12 md:translate-y-24 md:-translate-x-12 z-10 drop-shadow-2xl"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-white px-6 md:px-12 text-center pb-20 md:pb-0 z-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase drop-shadow-md">
            WORLD'S BEST
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black mt-2 leading-none tracking-tight drop-shadow-lg">
            CEYLON SPICES
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-medium mt-6 drop-shadow-md">
            100% Authentic | Premium Quality
          </p>

          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-10 bg-white text-[#B79C6F] hover:bg-[#f0f0f0] px-10 py-4 rounded font-bold text-lg transition-colors shadow-lg cursor-pointer inline-block"
          >
            Shop Now
          </a>

        </div>

      </div>
    </section>
  );
};

export default Hero;
