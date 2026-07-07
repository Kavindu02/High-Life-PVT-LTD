import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full min-h-[95vh] pt-28 pb-12 px-6 bg-[#FBF5EB] overflow-hidden flex flex-col justify-center">
      {/* Background Shapes */}
      {/* 1. Diagonal peach background - Slanting from middle-left down to bottom-right */}
      <div 
        className="absolute top-0 left-0 w-full h-[120%] bg-[#ecdac3] z-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 35%)' }}
      ></div>
      
      {/* 2. Gold curved shape top left */}
      <div 
        className="absolute top-0 left-0 w-[55%] h-[90%] bg-[#B69F73] z-0"
        style={{ borderBottomRightRadius: '50% 70%' }}
      ></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full justify-between">
        
        {/* Main Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mt-10 flex-1 relative">
          
          {/* Left Image Area */}
          <div className="w-full md:w-[60%] relative flex justify-center items-center mb-16 md:mb-0">
            {/* Lamp decoration (matching the image) */}
            <div className="absolute -top-32 left-[20%] hidden md:flex flex-col items-center">
              <div className="w-[1px] h-32 bg-[#2a2a2a]"></div>
              <div className="w-12 h-10 bg-[#2a2a2a] relative flex justify-center items-end" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}>
                 <div className="w-full h-1 bg-[#FBF5EB] absolute bottom-0"></div>
                 <div className="w-4 h-4 bg-[#fff9eb] rounded-full absolute -bottom-2 shadow-[0_0_15px_8px_rgba(255,249,235,0.6)]"></div>
              </div>
            </div>

            {/* Main Product Image */}
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop"
              alt="Premium Spices"
              className="w-full max-w-xl z-10 object-cover mt-12 md:mt-16 ml-0 md:ml-12 rounded-xl shadow-2xl"
            />
          </div>

          {/* Right Text Area */}
          <div className="w-full md:w-[40%] flex flex-col items-start md:items-start text-left pl-0 md:pl-10 mt-10 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-[#B69F73] leading-tight mb-4 tracking-normal">
              Make you feel <br className="hidden md:block" /> luxury
            </h1>
            <p className="text-[#B69F73] text-xs md:text-sm mb-6 max-w-sm font-medium leading-relaxed">
              Discover the authentic taste of premium quality spices. Sourced directly from the finest gardens to your kitchen. Experience true richness and elevate your culinary journey.
            </p>
            <div className="w-full flex justify-start md:justify-end pr-0 md:pr-10">
              <button className="bg-[#B69F73] text-white px-6 py-2.5 rounded-sm font-medium hover:bg-[#968058] transition-all duration-300 flex items-center gap-2 shadow-md">
                Shop now 
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-12 pt-6 gap-6 relative z-10">
          {/* Search Bar */}
          <div className="relative w-full md:w-[35%]">
            <input 
              type="text" 
              placeholder="What are you looking for ?" 
              className="w-full bg-transparent border border-[#B69F73] rounded-full py-2.5 px-6 pl-10 text-xs focus:outline-none focus:ring-1 focus:ring-[#B69F73] text-[#2a2a2a] placeholder:text-[#B69F73]/70 transition-colors"
            />
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#B69F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          {/* Stats */}
          <div className="flex flex-row items-center justify-start md:justify-between w-full md:w-[60%] gap-6 md:gap-8 overflow-x-auto pb-2 md:pb-0">
            {/* Customer reviews */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gray-300 border border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="user" className="w-full h-full object-cover"/></div>
                <div className="w-7 h-7 rounded-full bg-gray-300 border border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" alt="user" className="w-full h-full object-cover"/></div>
                <div className="w-7 h-7 rounded-full bg-gray-300 border border-white overflow-hidden"><img src="https://i.pravatar.cc/100?img=3" alt="user" className="w-full h-full object-cover"/></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#B69F73] leading-none">1.3 M+</span>
                <span className="text-[10px] text-[#2a2a2a]/60 font-semibold mt-0.5">Customer reviews</span>
              </div>
            </div>
            
            <div className="w-px h-6 bg-[#B69F73]/30 shrink-0 hidden md:block"></div>
            
            <div className="flex flex-col shrink-0">
              <span className="text-lg font-bold text-[#B69F73] leading-none">4.7 M+</span>
              <span className="text-[10px] text-[#2a2a2a]/60 font-semibold mt-0.5">Active members</span>
            </div>
            
            <div className="w-px h-6 bg-[#B69F73]/30 shrink-0 hidden md:block"></div>
            
            <div className="flex flex-col shrink-0">
              <span className="text-lg font-bold text-[#B69F73] leading-none">3 day</span>
              <span className="text-[10px] text-[#2a2a2a]/60 font-semibold mt-0.5">Delivery time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
