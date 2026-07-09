import React from 'react';

const Blog = () => {
  return (
    <section id="story" className="w-full relative" style={{ background: 'linear-gradient(to bottom right, #B69F73 50%, #FBF5EB 50%)' }}>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse relative z-10 pt-24 pb-24 px-6 gap-12 md:gap-0">

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="/blog_image.webp"
            alt="Sri Lankan Spices Story"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-12">

          <div className="bg-[#FBF5EB] p-8 md:p-12 lg:p-16 shadow-2xl relative">

            {/* Decorative Corner Lines */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#b69f73]"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#b69f73]"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#b69f73]"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#b69f73]"></div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2a2a2a] mb-8 leading-[1.1] tracking-tight">
              The Story of<br />
              Sri Lankan Spices
            </h2>

            <p className="text-sm text-[#2a2a2a]/80 mb-6 leading-relaxed max-w-md">
              For over a millennia, Sri Lanka has been globally revered as the "Spice Island." Ancient merchants navigated perilous oceans just to trade for the island's legendary treasures. Nestled in the Indian Ocean, our unique tropical climate and mineral-rich soils birth an incredible terroir, producing spices with unmatched flavor profiles, intoxicating aromas, and potent medicinal properties.
            </p>

            <p className="text-sm text-[#2a2a2a]/80 mb-6 leading-relaxed max-w-md">
              The undisputed crown jewel of our harvests is Ceylon Cinnamon, widely celebrated around the world as "True Cinnamon." Unlike the common Cassia, our native cinnamon features a sweet, delicate flavor and numerous health benefits. But the magic doesn't stop there. Our vibrant Turmeric, fiery Black Pepper, and fragrant Cardamom are equally prized, cultivated organically in lush, sun-drenched gardens.
            </p>

            <p className="text-sm text-[#2a2a2a]/80 leading-relaxed max-w-md">
              We believe in preserving this ancient legacy. Every single harvest is meticulously handpicked by generations of skilled local farmers using sustainable, time-honored methods. Sun-dried and carefully sorted, we ensure that every pinch retains its natural essential oils, delivering the absolute purest essence of Sri Lanka straight to your kitchen.
            </p>

          </div>
        </div>

      </div>

    </section>
  );
};

export default Blog;
