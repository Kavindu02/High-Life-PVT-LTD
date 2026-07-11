import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('');
          setFormData({ firstName: '', lastName: '', email: '', message: '' });
        }, 4000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="w-full py-20 px-6 bg-[#B69F73]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2a2a2a] mb-6 leading-tight tracking-tight">Get in Touch</h2>
          <p className="text-[#2a2a2a]/70 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          {/* Contact Details (Left) */}
          <div className="relative w-full md:w-5/12 bg-[#fcf5e5] rounded-3xl p-8 md:p-14 border border-[#f5e8cd] shadow-sm flex flex-col justify-start">
            {/* Corner Lines Design */}
            <div className="absolute top-3 left-3 md:top-6 md:left-6 w-5 h-5 md:w-8 md:h-8 border-t-2 border-l-2 border-[#E6B754]/40 rounded-tl-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>
            <div className="absolute top-3 right-3 md:top-6 md:right-6 w-5 h-5 md:w-8 md:h-8 border-t-2 border-r-2 border-[#E6B754]/40 rounded-tr-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 w-5 h-5 md:w-8 md:h-8 border-b-2 border-l-2 border-[#E6B754]/40 rounded-bl-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>
            <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 w-5 h-5 md:w-8 md:h-8 border-b-2 border-r-2 border-[#E6B754]/40 rounded-br-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>
            <h3 className="relative z-10 text-2xl font-bold text-[#2a2a2a] mb-8">Contact Details</h3>
            <div className="relative z-10 space-y-12 mt-10">

              <div className="flex items-center gap-6 md:gap-8 group cursor-pointer">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-0 bg-[#1a1a1a] group-hover:bg-[#E6B754] transition-colors duration-300 rotate-45 rounded-sm shadow-md"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="relative z-10 w-6 h-6 text-[#E6B754] group-hover:text-white transition-colors duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] text-[#2a2a2a]/50 uppercase tracking-[0.2em] font-bold mb-1">email</p>
                  <p className="font-bold text-[#2a2a2a] group-hover:text-[#E6B754] transition-colors duration-300 text-sm md:text-lg break-all md:break-normal">highlifepvtltd@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 md:gap-8 group cursor-pointer">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-0 bg-[#1a1a1a] group-hover:bg-[#E6B754] transition-colors duration-300 rotate-45 rounded-sm shadow-md"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="relative z-10 w-6 h-6 text-[#E6B754] group-hover:text-white transition-colors duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] text-[#2a2a2a]/50 uppercase tracking-[0.2em] font-bold mb-1">Hotline</p>
                  <p className="font-bold text-[#2a2a2a] group-hover:text-[#E6B754] transition-colors duration-300 text-sm md:text-lg">0755393000</p>
                </div>
              </div>

              <div className="flex items-center gap-6 md:gap-8 group cursor-pointer">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-0 bg-[#1a1a1a] group-hover:bg-[#E6B754] transition-colors duration-300 rotate-45 rounded-sm shadow-md"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="relative z-10 w-6 h-6 text-[#E6B754] group-hover:text-white transition-colors duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] text-[#2a2a2a]/50 uppercase tracking-[0.2em] font-bold mb-1">Address</p>
                  <p className="font-bold text-[#2a2a2a] group-hover:text-[#E6B754] transition-colors duration-300 text-sm md:text-lg">Wataraka, Sri Lanka</p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="relative w-full md:w-7/12 bg-[#fcf5e5] rounded-3xl p-8 md:p-14 border border-[#f5e8cd] shadow-sm flex flex-col justify-start">
            {/* Corner Lines Design */}
            <div className="absolute top-3 left-3 md:top-6 md:left-6 w-5 h-5 md:w-8 md:h-8 border-t-2 border-l-2 border-[#E6B754]/40 rounded-tl-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>
            <div className="absolute top-3 right-3 md:top-6 md:right-6 w-5 h-5 md:w-8 md:h-8 border-t-2 border-r-2 border-[#E6B754]/40 rounded-tr-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 w-5 h-5 md:w-8 md:h-8 border-b-2 border-l-2 border-[#E6B754]/40 rounded-bl-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>
            <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 w-5 h-5 md:w-8 md:h-8 border-b-2 border-r-2 border-[#E6B754]/40 rounded-br-xl pointer-events-none transition-all duration-500 hover:border-[#E6B754]/80"></div>

            <h3 className="relative z-10 text-2xl font-bold text-[#2a2a2a] mb-8">Send us a Message</h3>

            {status === 'success' ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-16 animate-[fadeIn_0.5s_ease-out] text-center h-full">
                <div className="w-20 h-20 bg-[#E6B754] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(230,183,84,0.4)] transform hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-3xl font-extrabold text-[#2a2a2a] mb-3">Awesome!</h4>
                <p className="text-[#2a2a2a]/70 font-medium max-w-sm text-sm leading-relaxed">
                  Your message has been sent successfully. We'll be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[10px] text-[#2a2a2a]/50 uppercase tracking-widest font-bold">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pb-2 bg-transparent text-[#2a2a2a] outline-none border-b border-[#2a2a2a]/10 focus:border-[#E6B754] transition font-medium"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[10px] text-[#2a2a2a]/50 uppercase tracking-widest font-bold">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full pb-2 bg-transparent text-[#2a2a2a] outline-none border-b border-[#2a2a2a]/10 focus:border-[#E6B754] transition font-medium"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[10px] text-[#2a2a2a]/50 uppercase tracking-widest font-bold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pb-2 bg-transparent text-[#2a2a2a] outline-none border-b border-[#2a2a2a]/10 focus:border-[#E6B754] transition font-medium"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[10px] text-[#2a2a2a]/50 uppercase tracking-widest font-bold">Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full pb-2 bg-transparent text-[#2a2a2a] outline-none border-b border-[#2a2a2a]/10 focus:border-[#E6B754] transition resize-none font-medium"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto bg-[#2a2a2a] btn-shine text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-wider hover:bg-[#E6B754] transition shadow-md border border-transparent disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                  {status === 'error' && <span className="text-red-500 text-sm font-bold">Failed to send message. Please try again.</span>}
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
