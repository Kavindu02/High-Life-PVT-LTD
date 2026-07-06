import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="w-full py-24 px-6 bg-brand-yellow">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Contact Details */}
        <div className="w-full md:w-5/12 bg-brand-dark text-white p-10 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-4xl font-serif mb-6 relative z-10">Get in Touch</h2>
          <p className="text-white/80 mb-10 relative z-10">
            We'd love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">📞</div>
              <div>
                <p className="text-sm text-white/60">Phone</p>
                <p className="font-medium">+1 (234) 567-890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">✉️</div>
              <div>
                <p className="text-sm text-white/60">Email</p>
                <p className="font-medium">hello@highlife.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">📍</div>
              <div>
                <p className="text-sm text-white/60">Office</p>
                <p className="font-medium">123 Organic St, NY 10012</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-7/12 p-10 flex flex-col justify-center">
          <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8">Send us a Message</h3>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <input 
                type="text" 
                placeholder="First Name" 
                className="w-full p-4 rounded-xl bg-brand-cream/50 text-brand-dark placeholder-brand-dark/40 outline-none border border-transparent focus:border-brand-orange transition" 
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="w-full p-4 rounded-xl bg-brand-cream/50 text-brand-dark placeholder-brand-dark/40 outline-none border border-transparent focus:border-brand-orange transition" 
              />
            </div>
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-4 rounded-xl bg-brand-cream/50 text-brand-dark placeholder-brand-dark/40 outline-none border border-transparent focus:border-brand-orange transition" 
            />
            <textarea 
              placeholder="How can we help?" 
              rows="5" 
              className="w-full p-4 rounded-xl bg-brand-cream/50 text-brand-dark placeholder-brand-dark/40 outline-none border border-transparent focus:border-brand-orange transition resize-none"
            ></textarea>
            <button 
              type="button" 
              className="bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition shadow-lg w-full sm:w-auto self-start px-10"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
