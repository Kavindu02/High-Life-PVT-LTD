import React, { useState, useRef, useEffect } from 'react';

const Navbar = ({ user, onNavigate, onNavigateToLogin, onNavigateToRegister, onNavigateToProfile, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    const sections = ['home', 'about', 'collection', 'blog', 'contact'];
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FBF5EB] flex flex-col font-sans">
      {/* Main Navbar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 py-3 h-20 relative z-10 bg-[#FBF5EB]">
        
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-16 lg:gap-24 mt-4 md:mt-0">
          {/* Logo */}
          <div 
            className="cursor-pointer relative w-[130px] h-10" 
            onClick={() => scrollToSection('home')}
          >
            <img src="/logo.png" alt="High Life Logo" className="absolute top-1/2 -translate-y-1/2 left-0 h-[130px] w-auto object-contain mix-blend-multiply drop-shadow-sm" />
          </div>

          {/* Links */}
          <ul className="flex items-center space-x-6 lg:space-x-10 text-[9px] lg:text-[10px] font-bold tracking-[0.2em] text-[#2a2a2a]">
            <li className="cursor-pointer hover:text-[#B69F73] transition relative" onClick={() => scrollToSection('home')}>HOME</li>
            <li className="cursor-pointer hover:text-[#B69F73] transition" onClick={() => scrollToSection('about')}>ABOUT</li>
            <li className="cursor-pointer hover:text-[#B69F73] transition relative" onClick={() => scrollToSection('collection')}>
              COLLECTION
            </li>
            <li className="cursor-pointer hover:text-[#B69F73] transition" onClick={() => scrollToSection('blog')}>BLOG</li>
            <li className="cursor-pointer hover:text-[#B69F73] transition" onClick={() => scrollToSection('contact')}>CONTACT</li>
          </ul>
        </div>

        {/* Search (Moved to Center) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center border border-[#2a2a2a]/15 bg-transparent px-3 py-1.5 w-56 hover:border-[#B69F73]/50 transition-colors">
          <button type="submit" className="focus:outline-none">
            <svg className="w-4 h-4 text-[#2a2a2a]/40 hover:text-[#B69F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-[11px] px-3 w-full placeholder:text-[#2a2a2a]/40 text-[#2a2a2a]" 
          />
          <div className="w-px h-3 bg-[#2a2a2a]/15 mx-2"></div>
          <button type="submit" className="focus:outline-none">
            <svg className="w-4 h-4 text-[#2a2a2a]/50 cursor-pointer hover:text-[#B69F73]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </button>
        </form>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-6 text-[#2a2a2a]">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="hover:text-[#B69F73] transition flex items-center justify-center w-8 h-8 rounded-full bg-[#B69F73]/10 text-[#B69F73]"
              >
                <span className="font-bold text-xs">{user.name.charAt(0).toUpperCase()}</span>
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-[#2a2a2a]/10 rounded-md shadow-lg py-1 z-50 overflow-hidden">
                  <button 
                    onClick={() => { setIsDropdownOpen(false); onNavigateToProfile(); }}
                    className="block w-full text-left px-4 py-2.5 text-[11px] font-bold tracking-widest text-[#2a2a2a] hover:bg-[#FBF5EB] hover:text-[#B69F73] transition"
                  >
                    PROFILE
                  </button>
                  <button 
                    onClick={() => { setIsDropdownOpen(false); onLogout(); }}
                    className="block w-full text-left px-4 py-2.5 text-[11px] font-bold tracking-widest text-red-600 hover:bg-red-50 transition"
                  >
                    LOG OUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button 
                onClick={onNavigateToLogin}
                className="text-[10px] font-bold tracking-wider hover:text-[#B69F73] transition px-3 py-1.5"
              >
                LOG IN
              </button>
              <button 
                onClick={onNavigateToRegister}
                className="text-[10px] font-bold tracking-wider bg-[#B69F73] text-white px-4 py-1.5 rounded hover:bg-[#a08a62] transition shadow-sm"
              >
                SIGN UP
              </button>
            </div>
          )}

          <button className="hover:text-[#B69F73] transition relative">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
