import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2A2A2A] text-[#fcf5e5] pt-12 pb-6 px-6 border-t-[4px] border-[#E6B754]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">

          {/* Brand & About */}
          <div className="lg:col-span-1">
            <img src="/logo.webp" alt="High Life Logo" className="-ml-14 h-20 w-auto mb-4 object-contain transform scale-[2.5] origin-left" />
            <p className="text-[#fcf5e5]/60 text-sm leading-relaxed mb-6">
              Providing you with the most authentic, rich, and vibrant spices straight from the finest gardens. Elevate your culinary journey with our expertly curated blends.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="https://www.fb.com/l/6lp1kJRRR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3a3a3a] flex items-center justify-center hover:bg-[#E6B754] text-[#fcf5e5] transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/94755393000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3a3a3a] flex items-center justify-center hover:bg-[#E6B754] text-[#fcf5e5] transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">Explore</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Collection', 'Story', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-[#fcf5e5]/60 hover:text-[#E6B754] hover:translate-x-1 inline-block transition-all duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">Contact Info</h4>
            <ul className="space-y-3 text-[#fcf5e5]/60 text-sm">
              <li className="flex items-start gap-3 group">
                <svg className="w-5 h-5 text-[#E6B754] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">Wataraka, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 group">
                <svg className="w-5 h-5 text-[#E6B754] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">0755393000</span>
              </li>
              <li className="flex items-center gap-3 group">
                <svg className="w-5 h-5 text-[#E6B754] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">highlifepvtltd@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">Newsletter</h4>
            <p className="text-[#fcf5e5]/60 text-sm mb-4">Subscribe for exclusive offers and updates from our gardens.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-[#E6B754] focus:outline-none transition-colors pr-12"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 w-9 bg-[#E6B754] rounded-lg flex items-center justify-center text-white hover:bg-[#E6B754] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-center pt-4 border-t border-white/10 text-xs text-[#fcf5e5]/40 font-medium gap-2">
          <p>© {new Date().getFullYear()} High Life (PVT) LTD. All Rights Reserved.</p>
          <p>
            Developed by <a href="https://www.syntechcraft.com/" target="_blank" rel="noopener noreferrer" className="text-[#E6B754] hover:text-white transition-colors">Syntechcraft</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
