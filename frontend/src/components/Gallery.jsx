import React from 'react';

const Gallery = () => {
  return (
    <section className="py-12 px-6 md:px-12 bg-brand-cream pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Item 1 */}
        <div className="group relative overflow-hidden rounded-md shadow-lg border border-brand-sand bg-white flex items-center justify-center p-4">
          <img 
            src="/jar_chili.png" 
            alt="Chili Powder" 
            className="w-full h-80 object-cover object-center rounded-sm transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-brown/20 opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center pb-8">
             <span className="bg-white/90 text-brand-brown px-6 py-2 rounded-full font-serif text-lg shadow-sm">Rich Red Chili</span>
          </div>
        </div>

        {/* Item 2 */}
        <div className="group relative overflow-hidden rounded-md shadow-lg border border-brand-sand bg-white flex items-center justify-center p-4">
          <img 
            src="/jar_turmeric.png" 
            alt="Turmeric Powder" 
            className="w-full h-80 object-cover object-center rounded-sm transition duration-700 group-hover:scale-105"
          />
           <div className="absolute inset-0 bg-brand-brown/20 opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center pb-8">
             <span className="bg-white/90 text-brand-brown px-6 py-2 rounded-full font-serif text-lg shadow-sm">Golden Turmeric</span>
          </div>
        </div>

        {/* Item 3 */}
        <div className="group relative overflow-hidden rounded-md shadow-lg border border-brand-sand bg-white flex items-center justify-center p-4">
          <img 
            src="/jar_pepper.png" 
            alt="Black Peppercorns" 
            className="w-full h-80 object-cover object-center rounded-sm transition duration-700 group-hover:scale-105"
          />
           <div className="absolute inset-0 bg-brand-brown/20 opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center pb-8">
             <span className="bg-white/90 text-brand-brown px-6 py-2 rounded-full font-serif text-lg shadow-sm">Black Peppercorns</span>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Gallery;
