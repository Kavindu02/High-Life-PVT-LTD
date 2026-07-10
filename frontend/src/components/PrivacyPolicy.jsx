import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 px-6 min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#2a2a2a] mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-[#2a2a2a]/80 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">1. Information We Collect</h2>
        <p>At High Life (PVT) LTD, we collect personal information that you provide to us when registering, placing an order, or contacting us. This may include your name, email address, phone number, and delivery address.</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">2. How We Use Your Information</h2>
        <p>We use your information strictly to fulfill your orders, provide customer support, and communicate with you regarding your purchases. We do not sell or share your personal information with third parties for marketing purposes.</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">3. Delivery & Payment Policy</h2>
        <p>Please note that we do not offer Cash on Delivery (COD) as a payment method for the product cost. However, <strong>delivery charges are not collected through our website</strong>. The delivery charge must be paid directly to the delivery service personnel when you receive your package.</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">4. Data Security</h2>
        <p>We implement strict security measures to ensure your personal data is safe. All transactions and data transmissions are encrypted and handled securely.</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">5. Contact Us</h2>
        <p>If you have any questions about our Privacy Policy, please contact us at highlifepvtltd@gmail.com or via our Hotline: 0755393000.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
