import React from 'react';

const About = () => {
  return (
    <section id="about" className="w-full relative bg-brand-cream">
      
      {/* Top half (Brand Cream) and Bottom half (Navbar Brown) */}
      <div className="absolute bottom-0 left-0 w-full h-[75%] lg:h-[40%] bg-[#b69f73] z-0"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative z-10 pt-24 pb-16 px-6">
        
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-12 lg:mb-0">
          <img 
            src="/about_box.webp" 
            alt="Handpicked Spices Box" 
            className="w-full h-auto object-cover shadow-2xl rounded-sm"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div className="mb-16 lg:mb-32 lg:pl-8 flex flex-col items-center lg:items-start w-full">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2a2a2a] mb-8 leading-tight tracking-tight">
              The Journey of<br/>
              <span className="whitespace-nowrap">Our Spices</span>
            </h2>
            
            <p className="text-sm md:text-lg lg:text-base text-brand-dark/70 mb-6 leading-relaxed md:leading-loose lg:leading-relaxed max-w-lg md:max-w-2xl lg:max-w-lg mx-auto lg:mx-0">
              Established on January 11, 2025, High Life (PVT) LTD was founded on a distinct mission: to bring you the finest, authentic Ceylon spices. Driven by passion rather than mere business, we ensure every product delivers an unequalled, savory goodness to elevate your culinary journey.
            </p>
            
            <p className="text-sm md:text-lg lg:text-base text-brand-dark/70 mb-8 leading-relaxed md:leading-loose lg:leading-relaxed max-w-lg md:max-w-2xl lg:max-w-lg mx-auto lg:mx-0">
              Our premium spices are expertly handpicked and processed under strict hygienic conditions. Maintained with uncompromising quality control and guided by careful family supervision, our entirely pure spices offer a richness and quality that simply cannot be replaced.
            </p>
            
            <a href="#collection" className="mt-4 relative top-0 md:top-12 inline-block w-fit bg-[#2a2a2a] btn-shine text-white text-xs font-bold px-8 py-3 rounded-full hover:bg-[#E6B754] transition tracking-wider shadow-lg border-2 border-white/20">
              OUR COLLECTION
            </a>
          </div>

          {/* Bottom Icons Area */}
          <div className="grid grid-cols-2 sm:flex sm:flex-nowrap justify-center lg:justify-end gap-6 sm:gap-8 mt-auto w-full lg:pl-16 text-[#2A2A2A] pt-12 lg:pt-0 lg:translate-x-12">
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mb-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v4m0-4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="text-[11px] uppercase tracking-widest font-bold opacity-90">Secured Payment</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mb-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <span className="text-[11px] uppercase tracking-widest font-bold opacity-90">Fast Delivery</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mb-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <span className="text-[11px] uppercase tracking-widest font-bold opacity-90">24/7 Support</span>
            </div>

            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mb-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[11px] uppercase tracking-widest font-bold opacity-90">Premium Quality</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;
