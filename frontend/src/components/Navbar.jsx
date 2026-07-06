import React from 'react';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-yellow/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="cursor-pointer flex items-center" onClick={() => scrollToSection('home')}>
          <img src="/images/logo.png" alt="High Life Logo" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
        </div>
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-brand-dark">
          <li className="cursor-pointer hover:text-brand-orange transition" onClick={() => scrollToSection('home')}>Home</li>
          <li className="cursor-pointer hover:text-brand-orange transition" onClick={() => scrollToSection('about')}>About</li>
          <li className="cursor-pointer hover:text-brand-orange transition" onClick={() => scrollToSection('collection')}>Collection</li>
          <li className="cursor-pointer hover:text-brand-orange transition" onClick={() => scrollToSection('blog')}>Blog</li>
          <li className="cursor-pointer hover:text-brand-orange transition" onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
        <div className="flex items-center space-x-4">
          <button className="text-brand-dark hover:text-brand-orange">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="bg-brand-orange text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition">
            Order
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
