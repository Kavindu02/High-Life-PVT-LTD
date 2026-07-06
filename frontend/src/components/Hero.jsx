import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full pt-32 pb-24 px-6 bg-brand-yellow overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10">

        {/* Text Content */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 pr-0 md:pr-10 text-center md:text-left">
          <p className="text-brand-brown font-serif italic text-xl mb-4">100% Authentic</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-tight mb-6">
            Premium <br /> Spices
          </h1>
          <p className="text-brand-dark/80 text-lg mb-8 max-w-md mx-auto md:mx-0">
            Discover the authentic taste of premium quality Kulu Badu, sourced directly from the finest gardens to your kitchen.
          </p>
          <button className="bg-brand-orange text-white px-8 py-3 rounded-full font-medium hover:bg-[#E6B754] transition shadow-lg shadow-brand-orange/30">
            Shop Spices
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-full md:rounded-tl-[150px] md:rounded-br-[150px] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop"
              alt="Assorted Spices"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light-yellow rounded-full -z-10 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/20 rounded-full -z-10 blur-2xl"></div>
        </div>
      </div>

      {/* Torn paper / wave effect at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#fbf5eb"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
