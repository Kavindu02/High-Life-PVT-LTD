import React, { useState, useRef, useEffect } from 'react';

const Navbar = ({ currentView, user, cartItems = [], isProductOverview, onNavigate, onNavigateToLogin, onNavigateToRegister, onNavigateToProfile, onOpenSideCart, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const dropdownRef = useRef(null);

  // Scroll listener for active section
  useEffect(() => {
    if (currentView !== 'home' && currentView !== undefined) {
      setActiveSection('');
      return;
    }

    if (isProductOverview) {
      setActiveSection('collection');
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'collection', 'story', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 250) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProductOverview, currentView]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Try to match section names first
    const query = searchQuery.toLowerCase();
    const sections = ['home', 'about', 'collection', 'story', 'contact'];
    const match = sections.find(s => s.includes(query) || query.includes(s));

    if (match) {
      scrollToSection(match);
    } else {
      // Fallback to browser's native find to search anywhere on the page
      if (window.find) {
        // Reset selection to top if we want to search from beginning, 
        // but window.find searches from current position. 
        // A simple window.find is usually enough for a basic frontend.
        const found = window.find(searchQuery);
        if (!found) {
          alert('No results found for: ' + searchQuery);
        }
      } else {
        alert('Search functionality is limited in this browser.');
      }
    }
  };

  const scrollToSection = (id) => {
    if (onNavigate) {
      onNavigate();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-[#2A2A2A]/95 backdrop-blur-md ${activeSection === 'home' ? 'border-b-[2px]' : 'border-b-[4px]'} border-[#E6B754] transition-all duration-300 ease-in-out font-montserrat`}>
      {/* Main Navbar */}
      <div className="w-full flex justify-between items-center px-4 md:px-6 lg:px-12 h-16 md:h-20 relative z-10">

        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-6 lg:gap-24 h-full">
          {/* Logo */}
          <div
            className="cursor-pointer relative w-[110px] md:w-[160px] h-10 flex-shrink-0 group -ml-6 md:ml-0"
            onClick={() => { scrollToSection('home'); setIsMobileMenuOpen(false); }}
          >
            <img src="/logo.webp" alt="High Life Logo" className="absolute top-1/2 -translate-y-1/2 left-0 h-[120px] md:h-[180px] w-auto object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105 origin-left" />
          </div>

          {/* Mobile Right Icons (Hamburger & Cart) - MOVED TO ABSOLUTE RIGHT ON MOBILE */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex md:hidden items-center gap-3 text-[#FBF5EB]">
            <button id="cart-icon-mobile" onClick={onOpenSideCart} className="transition-colors relative group p-2 hover:text-[#E6B754]">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 -right-1 min-w-[16px] h-[16px] flex items-center justify-center bg-[#E6B754] rounded-full text-[#2A2A2A] text-[9px] font-black px-1 border border-[#2A2A2A]">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#FBF5EB] hover:text-[#E6B754] transition-colors focus:outline-none">
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          {/* Links */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-10 text-sm text-[#FBF5EB]">
            {['Home', 'About', 'Collection', 'Story', 'Contact'].map((item) => {
              const lowerItem = item.toLowerCase();
              const isActive = activeSection === lowerItem;
              return (
                <li
                  key={item}
                  className="cursor-pointer relative overflow-hidden group py-2"
                  onClick={() => scrollToSection(lowerItem)}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-[#E6B754]' : 'group-hover:text-[#E6B754]'}`}>{item}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E6B754] transition-transform duration-300 ease-out ${isActive ? 'translate-x-0' : 'transform -translate-x-[101%] group-hover:translate-x-0'}`}></span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Search (Moved to Center) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center border border-white/10 bg-white/10 backdrop-blur-sm px-4 py-2 w-64 rounded-full hover:border-[#E6B754]/50 hover:bg-white/20 transition-all duration-300 shadow-sm">
          <button type="submit" className="focus:outline-none">
            <svg className="w-4 h-4 text-[#FBF5EB]/50 hover:text-[#E6B754] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="bg-transparent border-none outline-none text-[11px] px-3 w-full placeholder:text-[#FBF5EB]/50 text-[#FBF5EB] font-medium"
          />
          <div className="w-px h-3 bg-white/20 mx-2"></div>
          <button type="submit" className="focus:outline-none group">
            <svg className="w-4 h-4 text-[#FBF5EB]/50 cursor-pointer group-hover:text-[#E6B754] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </button>
        </form>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-6 text-[#FBF5EB]">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:shadow-[0_0_15px_rgba(230,183,84,0.4)] transition-all duration-300 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#E6B754] to-[#8a7652] text-white"
              >
                <span className="font-bold text-xs">{user.name.charAt(0).toUpperCase()}</span>
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#FAF5EC] backdrop-blur-md border-2 border-[#EADFC8] rounded-xl shadow-xl py-2 z-50 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                  <div className="px-4 py-2 border-b border-[#EADFC8] mb-1">
                    <p className="text-[10px] text-[#888] font-bold uppercase tracking-wider">Signed in as</p>
                    <p className="text-[12px] font-black text-[#2a2a2a] truncate">{user.name}</p>
                  </div>
                  <button
                    onClick={() => { setIsDropdownOpen(false); onNavigateToProfile(); }}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-[#2a2a2a] font-medium hover:bg-[#EADFC8]/40 hover:text-[#C5A880] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Profile
                  </button>
                  <button
                    onClick={() => { setIsDropdownOpen(false); onLogout(); }}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 font-medium hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <button
                onClick={onNavigateToLogin}
                className="group flex items-center gap-2 px-6 py-2 bg-[#FBF5EB] text-[#2a2a2a] rounded-full text-sm hover:bg-[#E6B754] hover:text-white transition-all duration-300 btn-shine"
              >
                <span>Login</span>
                <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          )}

          <button id="cart-icon-nav" onClick={onOpenSideCart} className={`transition-colors relative group p-2 hover:text-[#E6B754]`}>
            <svg className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {cartItemCount > 0 && (
              <span className="absolute top-0 -right-1 min-w-[14px] h-[14px] flex items-center justify-center bg-[#E6B754] rounded-full text-[#FBF5EB] text-[8px] font-bold px-1 border border-[#2A2A2A]">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#2A2A2A]/98 backdrop-blur-xl z-[60] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'} md:hidden flex flex-col px-8 pb-8 h-screen overflow-y-auto`}>
        
        {/* Overlay Close Header */}
        <div className="w-full flex justify-end items-center h-20 shrink-0">
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="p-2.5 bg-white/10 text-[#FBF5EB] hover:bg-[#E6B754] hover:text-white rounded-full transition-all duration-300 focus:outline-none shadow-lg mt-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Search */}
        <form onSubmit={(e) => { handleSearch(e); setIsMobileMenuOpen(false); }} className="flex items-center border border-white/20 bg-white/5 px-4 py-3 rounded-full mb-8 mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="bg-transparent border-none outline-none text-sm px-3 w-full placeholder:text-[#FBF5EB]/50 text-[#FBF5EB]"
          />
          <button type="submit" className="focus:outline-none">
            <svg className="w-5 h-5 text-[#FBF5EB]/50 hover:text-[#E6B754]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </form>

        {/* Links */}
        <ul className="flex flex-col space-y-6 text-xl font-bold text-[#FBF5EB] text-center">
          {['Home', 'About', 'Collection', 'Story', 'Contact'].map((item) => {
            const lowerItem = item.toLowerCase();
            const isActive = activeSection === lowerItem;
            return (
              <li
                key={item}
                className="cursor-pointer"
                onClick={() => { scrollToSection(lowerItem); setIsMobileMenuOpen(false); }}
              >
                <span className={`transition-colors duration-300 ${isActive ? 'text-[#E6B754]' : 'hover:text-[#E6B754]'}`}>{item}</span>
              </li>
            );
          })}
        </ul>

        {/* Auth / Profile */}
        <div className="mt-auto pt-10 flex flex-col items-center gap-4 pb-12">
          {user ? (
            <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6B754] to-[#8a7652] text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-[#888] font-bold uppercase tracking-wider">Signed in as</p>
                  <p className="text-sm font-black text-white truncate max-w-[120px]">{user.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setIsMobileMenuOpen(false); onNavigateToProfile(); }} className="p-2 text-white/70 hover:text-[#E6B754] transition-colors rounded-full bg-white/5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </button>
                <button onClick={() => { setIsMobileMenuOpen(false); onLogout(); }} className="p-2 text-red-400 hover:text-red-500 transition-colors rounded-full bg-white/5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setIsMobileMenuOpen(false); onNavigateToLogin(); }}
              className="w-full py-4 bg-[#FBF5EB] text-[#2a2a2a] rounded-full text-base font-bold hover:bg-[#E6B754] hover:text-white transition-all duration-300 btn-shine"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
