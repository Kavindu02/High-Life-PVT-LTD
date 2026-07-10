import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 px-6 min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#2a2a2a] mb-8">Terms of Service</h1>
      <div className="space-y-6 text-[#2a2a2a]/80 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">1. General</h2>
        <p>By accessing and placing an order with High Life (PVT) LTD, you confirm that you are in agreement with and bound by the terms of service contained herein.</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">2. Products & Pricing</h2>
        <p>All our spices are 100% authentic and premium quality. Prices for our products are subject to change without notice. We reserve the right to modify or discontinue products at any time.</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">3. Shipping & Delivery Charges</h2>
        <p>We aim to process and dispatch all orders promptly. <strong>Important Delivery Notice:</strong> There is no Cash on Delivery (COD) for product purchases. Additionally, delivery charges are not included in your checkout total on this website. <strong>You are required to pay the delivery fee directly to the courier service upon receiving your product.</strong></p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">4. Returns & Refunds</h2>
        <p>Given the perishable nature of our products, we handle returns on a case-by-case basis. If you receive a damaged or incorrect item, please contact our support team within 24 hours of delivery.</p>
        
        <h2 className="text-2xl font-bold text-[#2a2a2a] mt-8">5. Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Any changes will be posted on this page.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
