import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-brand-brown text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif mb-6">Get in Touch</h2>
        <p className="text-brand-beige mb-12">
          Have questions about our premium spices? We would love to hear from you.
        </p>
        <form className="flex flex-col gap-4 max-w-md mx-auto">
          <input type="text" placeholder="Your Name" className="p-3 rounded-sm bg-brand-light-brown text-white placeholder-brand-beige outline-none border border-transparent focus:border-brand-beige transition" />
          <input type="email" placeholder="Your Email" className="p-3 rounded-sm bg-brand-light-brown text-white placeholder-brand-beige outline-none border border-transparent focus:border-brand-beige transition" />
          <textarea placeholder="Message" rows="4" className="p-3 rounded-sm bg-brand-light-brown text-white placeholder-brand-beige outline-none border border-transparent focus:border-brand-beige transition"></textarea>
          <button type="button" className="bg-white text-brand-brown font-semibold py-3 rounded-sm hover:bg-brand-beige transition mt-4">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
