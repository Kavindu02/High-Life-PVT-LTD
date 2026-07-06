import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-cream text-brand-dark py-12 px-6 border-t border-brand-orange/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-4">@HighLife</h3>
          <p className="text-brand-dark/80 max-w-sm mb-6">
            Providing you with the most authentic, rich, and vibrant spices straight from the finest gardens. Experience the true essence of premium Kulu Badu.
          </p>
          <div className="flex space-x-4">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-brand-orange hover:text-white cursor-pointer transition shadow-sm">
               f
             </div>
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-brand-orange hover:text-white cursor-pointer transition shadow-sm">
               t
             </div>
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-brand-orange hover:text-white cursor-pointer transition shadow-sm">
               in
             </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-serif font-bold text-brand-dark mb-4">Quick Links</h4>
          <ul className="space-y-2 text-brand-dark/80">
            <li><a href="#home" className="hover:text-brand-orange transition">Home</a></li>
            <li><a href="#about" className="hover:text-brand-orange transition">About Us</a></li>
            <li><a href="#collection" className="hover:text-brand-orange transition">Collection</a></li>
            <li><a href="#contact" className="hover:text-brand-orange transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-serif font-bold text-brand-dark mb-4">Contact Info</h4>
          <ul className="space-y-2 text-brand-dark/80">
            <li>123 Spice Route, Colombo, Sri Lanka</li>
            <li>+94 11 234 5678</li>
            <li>hello@highlife.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-dark/10 text-center text-sm font-medium text-brand-dark/60">
        © 2026 High Life (PVT) LTD. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
