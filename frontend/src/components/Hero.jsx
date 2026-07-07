import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full pb-16 bg-[#FBF5EB] overflow-hidden font-sans pt-16">

      {/* Main Yellow Hero Area with Wavy Edges */}
      <div className="relative w-full bg-[#B69F73] pt-24 pb-28 px-6 sm:px-12 mt-4 md:mt-8">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">

          {/* Left Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start mt-8 md:mt-0">
            <p className="text-xs md:text-sm font-bold tracking-widest mb-3 uppercase text-shine">
              100% Authentic Ceylon Spices
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-sans text-[#2a2a2a] mb-6 leading-[1.05] drop-shadow-sm">
              Discover <br /> True Flavor
            </h1>
            <p className="text-[#3e2f1d] text-base md:text-lg mb-8 max-w-md font-medium leading-relaxed">
              Experience the authentic taste of Sri Lankan spices. Sourced directly from the finest gardens, bringing natural richness and aroma to your culinary journey.
            </p>
            <a href="#collection" onClick={(e) => {
              e.preventDefault();
              document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
            }} className="bg-[#2a2a2a] btn-shine hover:bg-[#E6B754] text-white px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-500 shadow-xl border-2 border-white/20 flex items-center gap-3 cursor-pointer w-fit">
              Shop Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>

          {/* Right Image Area */}
          <div className="w-full md:w-1/2 mt-16 md:mt-0 relative flex justify-center items-center">
            {/* Background circular glow */}
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full w-3/4 h-3/4 m-auto"></div>

            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop"
              alt="Premium Spices Bowl"
              className="w-[95%] md:w-[90%] max-w-xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:scale-105 hover:rotate-2 transition-all duration-700 relative z-10 rounded-2xl"
            />

            {/* Floating modern leaf elements */}
            <div className="absolute -top-4 -right-2 w-12 h-12 bg-green-500 rounded-tl-[30px] rounded-br-[30px] opacity-60 blur-[1px] transform rotate-45 z-0 shadow-lg animate-pulse"></div>
            <div className="absolute bottom-6 -left-4 w-10 h-10 bg-green-700 rounded-tl-[30px] rounded-br-[30px] opacity-50 blur-[1px] transform -rotate-12 z-20 shadow-lg hover:scale-110 transition-transform"></div>
          </div>
        </div>

        {/* Bottom Torn/Wavy Edge */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none text-[#FBF5EB]">
          <svg className="relative block w-full h-[25px] md:h-[45px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 120 0 60 21 68 45 55 67 63 85 51 115 72 133 60 160 75 185 55 210 67 245 45 270 58 295 42 325 68 350 52 375 75 400 50 425 63 455 45 480 72 505 58 535 77 560 48 585 64 610 50 635 72 665 55 695 68 720 45 745 62 775 48 805 75 830 52 860 69 890 55 915 72 940 48 970 65 990 52 1020 70 1045 55 1075 67 1105 48 1135 68 1160 55 1185 65 1200 52Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>


    </section>
  );
};

export default Hero;
