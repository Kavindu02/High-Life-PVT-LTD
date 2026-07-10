import React, { useState, useEffect } from 'react';
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
    postalCode: '',
    phone1: '',
    phone2: '',
    orderNotes: '',
    paymentMethod: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const nameParts = user.name ? user.name.split(' ') : [];
        setFormData(prev => ({
          ...prev,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: user.email || '',
          address: user.address || prev.address,
          district: user.district || prev.district,
          city: user.city || prev.city,
          postalCode: user.postalCode || prev.postalCode,
          phone1: user.mobileNumber ? user.mobileNumber.replace(/^\+94/, '') : prev.phone1
        }));
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }
  }, []);

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

  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.email || !formData.address || !formData.district || !formData.city || !formData.postalCode || !formData.phone1 || !formData.paymentMethod) {
      alert("Please fill in all required delivery details and select a payment method.");
      return;
    }

    setIsProcessing(true);

    // Simulate 3-second payment gateway processing
    setTimeout(async () => {
      setIsProcessing(false);
      setPaymentSuccessful(true);

      let userId = null;
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser.id;
        } catch (e) {}
      }

      const orderData = {
        user_id: userId,
        customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile_number: formData.phone1,
        phone2: formData.phone2 || '',
        location: `${formData.address}, ${formData.city}, ${formData.district} - ${formData.postalCode}`,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        postal_code: formData.postalCode,
        order_notes: formData.orderNotes || '',
        total_amount: total.toString(),
        payment_method: formData.paymentMethod,
        items: cartItems
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          // Update local user data if logged in
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              if (parsedUser.email === orderData.email) {
                parsedUser.address = orderData.address;
                parsedUser.city = orderData.city;
                parsedUser.district = orderData.district;
                parsedUser.postalCode = orderData.postal_code;
                localStorage.setItem('user', JSON.stringify(parsedUser));
              }
            } catch (e) { }
          }

          setPaymentSuccessful(true);
          setTimeout(() => {
            setShowSuccessModal(true);
          }, 1500); // Give user time to see the "Payment Successful!" message
        } else {
          setPaymentSuccessful(false);
          alert("Failed to place order.");
        }
      } catch (err) {
        setPaymentSuccessful(false);
        console.error(err);
        alert("Server error. Please try again.");
      }
    }, 3000);
  };

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

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#2a2a2a]">Postal Code <span className="text-red-500">*</span></label>
                <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors placeholder:text-gray-400" />
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">Phone 1 <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className="bg-[#F5F2EB] border border-[#EADFC8] border-r-0 rounded-l-xl px-4 py-3 text-[#888] font-bold">+94</span>
                    <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full bg-white border border-[#EADFC8] rounded-r-xl px-4 py-3 outline-none focus:border-[#B69F73] transition-colors" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-bold text-[#2a2a2a]">Phone 2 (Optional)</label>
                  <div className="flex">
                    <span className="bg-[#F5F2EB] border border-[#EADFC8] border-r-0 rounded-l-xl px-4 py-3 text-[#888] font-bold">+94</span>
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
                  <div
                    onClick={() => handleChange({ target: { name: 'paymentMethod', value: formData.paymentMethod === 'onepay' ? '' : 'onepay' } })}
                    className={`flex flex-col items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'onepay' ? 'border-[#B69F73] bg-[#FAF5EC]' : 'border-[#EADFC8] bg-white hover:border-[#B69F73]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full shrink-0 transition-colors ${formData.paymentMethod === 'onepay' ? 'bg-green-500' : 'border-2 border-[#EADFC8]'}`}>
                      </div>
                      <span className="font-bold text-[#2a2a2a] text-[15px] max-sm:text-[13px]">Bank Card / Bank Account - One Pay</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pl-4 sm:pl-8">
                      {/* Visa */}
                      <div className="bg-[#1434CB] rounded-[4px] px-1.5 flex items-center justify-center w-9 sm:w-[42px] h-[22px] sm:h-[26px]">
                        <svg viewBox="0 0 38 12" className="w-full text-white" fill="currentColor">
                          <path d="M14.659 11.536l2.368-11.23h3.805l-2.368 11.23h-3.805zm17.382-10.97c-.604-.265-1.602-.505-3.003-.505-3.23 0-5.502 1.637-5.522 3.987-.024 1.724 1.642 2.686 2.894 3.277 1.282.603 1.71.993 1.71 1.535-.022.827-1.042 1.206-2.008 1.206-1.332 0-2.052-.196-3.096-.64l-.426-.197-.52 3.107c.76.34 2.164.636 3.633.648 3.425 0 5.66-1.606 5.688-4.086.023-1.36-.838-2.39-2.73-3.25-1.135-.558-1.83-1.006-1.83-1.625 0-.58.68-1.185 1.93-1.185 1.056-.02 1.83.218 2.413.486l.288.136.594-3.095zM10.198 11.536H6.602L4.35 2.11C4.167 1.34 3.99.986 3.4 1.13L.047 1.84v-.4c1.17-.353 2.508-.85 3.33-1.22H4.49c.5 0 .973.344 1.096 1.002l1.246 8.016.143-.808 1.785-8.125H12.6l-2.4 11.23zm23.63 0h3.585l-3.094-11.23H31.72c-.41 0-.743.235-.907.618l-3.418 8.077 1.713.882c.2-.423.41-.855.41-.855h4.195l.4 1.89h-.022zm-3.09-3.284l1.01-2.613c-.02.046.208-.548.337-.922h.023l.176.843.57 2.692h-2.116z" />
                        </svg>
                      </div>
                      {/* Mastercard */}
                      <div className="bg-[#141414] rounded-[4px] flex items-center justify-center w-9 sm:w-[42px] h-[22px] sm:h-[26px]">
                        <svg viewBox="0 0 36 24" className="h-[75%] sm:h-[80%] w-auto">
                          <circle cx="12" cy="12" r="8" fill="#EB001B" />
                          <circle cx="24" cy="12" r="8" fill="#F79E1B" />
                          <path d="M18 19.3c-2.4-1.6-4-4.3-4-7.3s1.6-5.7 4-7.3c2.4 1.6 4 4.3 4 7.3s-1.6 5.7-4 7.3z" fill="#FF5F00" />
                        </svg>
                      </div>
                      {/* Amex */}
                      <div className="bg-[#0070CE] rounded-[4px] flex items-center justify-center w-9 sm:w-[42px] h-[22px] sm:h-[26px] font-bold text-white text-[8px] sm:text-[10px] leading-none text-center tracking-tight px-1">
                        <div>AMEX</div>
                      </div>
                      {/* +2 */}
                      <div className="bg-white border border-[#EADFC8] rounded-[4px] flex items-center justify-center h-[22px] sm:h-[26px] min-w-[22px] sm:min-w-[26px]">
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#B69F73]">+2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || paymentSuccessful}
                className={`w-full text-white text-[13px] font-bold uppercase px-8 py-4 rounded-full transition tracking-wider shadow-lg border-2 border-[#EADFC8]/50 flex items-center justify-center gap-2 group ${paymentSuccessful
                    ? 'bg-green-500 hover:bg-green-600 border-green-500/50'
                    : isProcessing
                      ? 'bg-[#888] cursor-not-allowed'
                      : 'bg-[#2a2a2a] btn-shine hover:bg-[#E6B754]'
                  }`}
              >
                {paymentSuccessful ? (
                  <>
                    PAYMENT SUCCESSFUL!
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </>
                ) : isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    PROCESSING PAYMENT...
                  </>
                ) : (
                  <>
                    PLACE ORDER
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>

            </div>
          </div>

        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] bg-transparent">
          <div className="fixed top-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="bg-[#FAF5EC] border-2 border-[#EADFC8] rounded-full px-6 py-4 shadow-xl flex items-center gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <h3 className="text-sm font-black text-[#2a2a2a] m-0 leading-tight">Order Placed Successfully!</h3>
                <p className="text-xs text-[#888] font-medium m-0 mt-0.5">Check your email for the receipt.</p>
              </div>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  localStorage.removeItem('cartItems');
                  window.location.href = '/';
                }}
                className="ml-4 bg-[#2a2a2a] text-[#FAF5EC] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#C5A880] hover:text-[#2a2a2a] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
