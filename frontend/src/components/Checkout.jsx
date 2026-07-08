import React, { useState } from 'react';
import SearchableSelect from './SearchableSelect';
import { districtsAndCities, districtsList } from '../data/sriLankaData';

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    district: '',
    city: '',
    phone1: '',
    phone2: '',
    orderNotes: '',
    shippingMethod: 'koombiyo',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDistrictChange = (value) => {
    setFormData(prev => ({ ...prev, district: value, city: '' }));
  };

  const handleCityChange = (value) => {
    setFormData(prev => ({ ...prev, city: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.pricing[item.size];
    return sum + (price * item.quantity);
  }, 0);

  const totalWeightGrams = cartItems.reduce((sum, item) => {
    const sizeStr = item.size?.toLowerCase() || '';
    let weight = 0;
    if (sizeStr.includes('kg')) {
      weight = parseFloat(sizeStr) * 1000;
    } else if (sizeStr.includes('g')) {
      weight = parseFloat(sizeStr);
    }
    return sum + (weight * item.quantity);
  }, 0);

  const total = subtotal;

  return (
    <div className="w-full bg-[#FAF5EC] min-h-screen pt-32 pb-16 relative font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column - Delivery Details */}
          <div className="flex-1 w-full bg-white/60 backdrop-blur-md p-6 lg:p-10 rounded-[2rem] border border-[#EADFC8]/50 shadow-sm">
            <h2 className="text-3xl font-black mb-10 text-[#2a2a2a]">Delivery Details</h2>
            
            <form className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">First Name <span className="text-red-500">*</span></label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2a2a2a]">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" placeholder="For order confirmation" value={formData.email} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors placeholder:text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2a2a2a]">Address <span className="text-red-500">*</span></label>
                <input type="text" name="address" placeholder="House number and street name" value={formData.address} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors placeholder:text-gray-400" />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">District <span className="text-red-500">*</span></label>
                  <SearchableSelect 
                    options={districtsList} 
                    value={formData.district} 
                    onChange={handleDistrictChange} 
                    placeholder="Select District" 
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">Town/City <span className="text-red-500">*</span></label>
                  <SearchableSelect 
                    options={formData.district ? (districtsAndCities[formData.district] || []) : []} 
                    value={formData.city} 
                    onChange={handleCityChange} 
                    placeholder={formData.district ? "Select City" : "Select District First"} 
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">Phone 1 <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className="bg-[#F5F2EB] border border-[#EADFC8] border-r-0 rounded-l-xl px-4 py-3 text-[#888] font-bold">94</span>
                    <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-r-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">Phone 2 (Optional)</label>
                  <div className="flex">
                    <span className="bg-[#F5F2EB] border border-[#EADFC8] border-r-0 rounded-l-xl px-4 py-3 text-[#888] font-bold">94</span>
                    <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-r-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2a2a2a]">Order Notes</label>
                <textarea name="orderNotes" placeholder="Notes about your order e.g. special notes for delivery" value={formData.orderNotes} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-xl px-4 py-3 h-32 outline-none focus:border-[#B69F73] transition-colors resize-none placeholder:text-gray-400"></textarea>
              </div>
            </form>
          </div>

          {/* Right Column - Your Order */}
          <div className="w-full lg:w-[450px] shrink-0">
            <div className="bg-white/60 backdrop-blur-md p-6 lg:p-10 rounded-[2rem] text-[#2a2a2a] sticky top-28 border border-[#EADFC8]/50 shadow-sm">
              <h2 className="text-3xl font-black mb-10 text-[#2a2a2a]">Your Order</h2>
              
              <div className="flex justify-between items-center mb-6 font-black text-[#2a2a2a] text-[15px]">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              
              <div className="flex flex-col gap-5 border-b border-[#EADFC8] pb-6 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start text-[15px]">
                    <div>
                      <div className="font-bold text-[#2a2a2a]">{item.product.name} <span className="text-[#888] font-medium ml-1">x{item.quantity}</span></div>
                      <div className="text-xs text-[#888] mt-1">Weight: {item.size}</div>
                    </div>
                    <div className="font-bold text-[#2a2a2a]">Rs. {item.product.pricing[item.size] * item.quantity}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-5 text-[15px] font-bold text-[#888] border-b border-[#EADFC8] pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span>Item Total</span>
                  <span className="text-[#2a2a2a]">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Weight</span>
                  <span className="text-[#2a2a2a]">{totalWeightGrams.toLocaleString()} g</span>
                </div>
              </div>
              

              
              <div className="flex justify-between items-end mb-10">
                <span className="text-2xl font-bold text-[#2a2a2a]">Total</span>
                <span className="text-3xl font-black text-[#e60000] tracking-tight">Rs. {total}</span>
              </div>
              
              <div className="mb-10">
                <h3 className="font-black text-[#2a2a2a] mb-4 text-[15px]">Payment Method</h3>
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-red-500 bg-[#FAF5EC]' : 'border-[#EADFC8] bg-white hover:border-[#B69F73]'}`}>
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="w-4 h-4 text-red-500 focus:ring-red-500 accent-red-500 border-gray-300" />
                    <span className="font-bold text-[#2a2a2a] text-[15px]">Cash On Delivery</span>
                  </label>
                  <div className={`border rounded-xl transition-all overflow-hidden ${formData.paymentMethod === 'bank' ? 'border-red-500 bg-[#FAF5EC]' : 'border-[#EADFC8] bg-white hover:border-[#B69F73]'}`}>
                    <label className="flex items-center gap-3 p-4 cursor-pointer w-full">
                      <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleChange} className="w-4 h-4 text-red-500 focus:ring-red-500 accent-red-500 border-gray-300" />
                      <span className="font-bold text-[#2a2a2a] text-[15px]">Bank Transfer</span>
                    </label>
                    {formData.paymentMethod === 'bank' && (
                      <div className="px-4 pb-4 pt-1">
                        <label className="block text-xs font-bold text-[#888] mb-2 uppercase tracking-widest">Upload Payment Slip</label>
                        <input type="file" name="paymentSlip" accept="image/*,.pdf" className="block w-full text-sm text-[#2a2a2a] file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-[#2a2a2a] file:text-white hover:file:bg-[#E6B754] file:transition-colors cursor-pointer file:cursor-pointer bg-white border border-[#EADFC8] rounded-full focus:outline-none" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-[#2a2a2a] btn-shine text-white text-[13px] font-bold uppercase px-8 py-4 rounded-full hover:bg-[#E6B754] transition tracking-wider shadow-lg border-2 border-[#EADFC8]/50 flex items-center justify-center gap-2 group">
                PLACE ORDER 
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
