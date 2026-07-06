import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-brand-brown">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: "url('/hero_spices.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-wide shadow-sm">
          Pure Spices
        </h1>
        <p className="text-xl md:text-2xl font-sans text-brand-beige mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover the authentic taste of premium quality Kulu Badu, sourced directly from the finest gardens to your kitchen.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-brand-brown px-8 py-3 rounded-full font-semibold hover:bg-brand-beige transition duration-300">
            Shop Now
          </button>
          <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-brand-brown transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
