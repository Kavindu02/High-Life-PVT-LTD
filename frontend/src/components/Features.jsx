import React from 'react';

const Features = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-brand-cream text-center pt-32">
      <div className="max-w-4xl mx-auto mb-16">
        <p className="text-brand-light-brown text-lg md:text-xl font-serif leading-relaxed mb-6">
          "Our spices are carefully selected to bring the most authentic, rich, and vibrant flavors to your culinary creations. Experience the essence of true quality with every pinch."
        </p>
        <div className="w-16 h-px bg-brand-brown mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
        {/* Left Feature */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-sand shadow-lg mb-6">
             <img src="/circular_spice.png" alt="Premium Cardamom and Cinnamon" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
          </div>
          <h3 className="text-4xl font-serif text-brand-brown mb-2">100%</h3>
          <p className="text-sm uppercase tracking-widest text-brand-light-brown mb-2">Natural & Organic</p>
          <p className="text-sm text-brand-light-brown max-w-xs">
            Sourced responsibly, completely free from artificial additives or preservatives.
          </p>
        </div>

        {/* Right Feature */}
        <div className="flex flex-col items-center">
           <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-sand shadow-lg mb-6">
             <img src="/circular_spice.png" alt="Premium Spices" className="w-full h-full object-cover hover:scale-110 transition duration-500" style={{ transform: 'rotate(90deg)' }} />
          </div>
          <h3 className="text-4xl font-serif text-brand-brown mb-2">A+</h3>
          <p className="text-sm uppercase tracking-widest text-brand-light-brown mb-2">Premium Grade</p>
          <p className="text-sm text-brand-light-brown max-w-xs">
            Handpicked for the highest quality, ensuring intense aroma and robust flavor.
          </p>
        </div>
      </div>
      
      <div className="mt-20">
        <h2 className="text-4xl font-serif text-brand-brown">Our Collection</h2>
        <div className="w-16 h-px bg-brand-brown mx-auto mt-4"></div>
      </div>
    </section>
  );
};

export default Features;
