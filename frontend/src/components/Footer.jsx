import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2a1a17] text-brand-beige py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-3xl font-serif text-white mb-4">High Life</h3>
          <p className="text-brand-sand max-w-sm mb-6">
            Bringing the most authentic, rich, and vibrant spices straight from the finest gardens to your kitchen. Experience the true essence of premium Kulu Badu.
          </p>
          <div className="flex space-x-4">
             {/* Social placeholders */}
             <div className="w-10 h-10 rounded-full border border-brand-beige flex items-center justify-center hover:bg-brand-beige hover:text-[#2a1a17] cursor-pointer transition">
               f
             </div>
             <div className="w-10 h-10 rounded-full border border-brand-beige flex items-center justify-center hover:bg-brand-beige hover:text-[#2a1a17] cursor-pointer transition">
               t
             </div>
             <div className="w-10 h-10 rounded-full border border-brand-beige flex items-center justify-center hover:bg-brand-beige hover:text-[#2a1a17] cursor-pointer transition">
               in
             </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-serif text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#shop" className="hover:text-white transition">Shop</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-serif text-white mb-4">Contact Info</h4>
          <ul className="space-y-2 text-brand-sand">
            <li>123 Spice Route, Colombo, Sri Lanka</li>
            <li>+94 11 234 5678</li>
            <li>info@highlife.lk</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-brown/50 text-center text-sm tracking-widest uppercase">
        © 2026 High Life (PVT) LTD. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
