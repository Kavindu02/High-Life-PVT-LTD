import React from 'react';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-sand shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-brand-brown cursor-pointer" onClick={() => scrollToSection('home')}>
          High Life
        </div>
        <ul className="flex space-x-8 text-sm uppercase tracking-widest font-semibold text-brand-light-brown">
          <li className="cursor-pointer hover:text-brand-brown transition" onClick={() => scrollToSection('home')}>Home</li>
          <li className="cursor-pointer hover:text-brand-brown transition" onClick={() => scrollToSection('about')}>About</li>
          <li className="cursor-pointer hover:text-brand-brown transition" onClick={() => scrollToSection('shop')}>Shop</li>
          <li className="cursor-pointer hover:text-brand-brown transition" onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
