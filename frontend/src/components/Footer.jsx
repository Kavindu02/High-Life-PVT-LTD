import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-[#fcf5e5] pt-20 pb-10 px-6 border-t-[4px] border-[#d6993a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight">HIGH<span className="text-[#d6993a]">LIFE</span></h3>
            <p className="text-[#fcf5e5]/60 text-sm leading-relaxed mb-8">
              Providing you with the most authentic, rich, and vibrant spices straight from the finest gardens. Experience the true essence of premium Kulu Badu.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#d6993a] text-[#fcf5e5] transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#d6993a] text-[#fcf5e5] transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#d6993a] text-[#fcf5e5] transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Collection', 'Blog', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-[#fcf5e5]/60 hover:text-[#d6993a] hover:translate-x-1 inline-block transition-all duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Contact Info</h4>
            <ul className="space-y-4 text-[#fcf5e5]/60 text-sm">
              <li className="flex items-start gap-3 group">
                <svg className="w-5 h-5 text-[#d6993a] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">123 Spice Route, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 group">
                <svg className="w-5 h-5 text-[#d6993a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3 group">
                <svg className="w-5 h-5 text-[#d6993a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">hello@highlife.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6">Newsletter</h4>
            <p className="text-[#fcf5e5]/60 text-sm mb-4">Subscribe for exclusive offers and updates from our gardens.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-[#2a2a2a] text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-[#d6993a] focus:outline-none transition-colors pr-12"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 w-9 bg-[#d6993a] rounded-lg flex items-center justify-center text-white hover:bg-[#c48731] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10 text-xs text-[#fcf5e5]/40 font-medium gap-2">
          <p>© {new Date().getFullYear()} High Life (PVT) LTD. All Rights Reserved.</p>
          <p>
            Developed by <a href="https://www.syntechcraft.com/" target="_blank" rel="noopener noreferrer" className="text-[#d6993a] hover:text-white transition-colors">Syntechcraft</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
