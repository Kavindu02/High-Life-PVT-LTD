import React from 'react';

const Cart = ({ cartItems, setCartItems, onNavigateToHome, onCheckout }) => {
  const updateQuantity = (product, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      (item.product.id || item.product.name) === (product.id || product.name) && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (product, size) => {
    setCartItems(prev => prev.filter(item => 
      !((item.product.id || item.product.name) === (product.id || product.name) && item.size === size)
    ));
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

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#FAF5EC] min-h-screen pt-32 pb-16 relative overflow-hidden flex items-center justify-center font-sans">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        
        <div className="text-center relative z-10 p-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#EADFC8]">
            <svg className="w-10 h-10 text-[#9A9286]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-[#2a2a2a] mb-4">Your cart is empty</h2>
          <p className="text-[#9A9286] mb-8">Looks like you haven't added any premium spices yet.</p>
          <button 
            onClick={onNavigateToHome}
            className="bg-[#2a2a2a] btn-shine text-white text-xs font-bold uppercase px-8 py-3 rounded-full hover:bg-[#E6B754] transition tracking-wider shadow-lg border-2 border-white/20"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF5EC] min-h-screen pt-32 pb-16 relative font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-black text-[#2a2a2a] mb-10 tracking-tight">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 lg:p-8 border border-[#EADFC8]/50 shadow-sm">
              {cartItems.map((item, index) => {
                const itemPrice = item.product.pricing[item.size];
                return (
                  <div key={index} className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-[#EADFC8]/50 last:border-0 last:pb-0 first:pt-0">
                    <div className="w-24 h-24 rounded-2xl bg-[#fcf5e5] border border-[#f5e8cd] p-2 flex shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply rounded-xl" />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                      <h3 className="text-lg font-black text-[#2a2a2a]">{item.product.name}</h3>
                      <p className="text-sm font-bold text-[#9A9286] mt-1 uppercase tracking-widest">Size: {item.size}</p>
                      
                      <div className="flex items-center gap-6 mt-4 sm:mt-auto w-full justify-between sm:justify-start">
                        {/* Quantity Selector */}
                        <div className="flex items-center bg-white border border-[#EADFC8] rounded-full overflow-hidden shadow-sm">
                          <button onClick={() => updateQuantity(item.product, item.size, item.quantity - 1)} className="px-3 py-1 text-[#9A9286] hover:bg-[#FBF5EB] hover:text-[#2a2a2a] transition-colors">-</button>
                          <span className="px-3 font-bold text-xs text-[#2a2a2a] min-w-[2rem] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product, item.size, item.quantity + 1)} className="px-3 py-1 text-[#9A9286] hover:bg-[#FBF5EB] hover:text-[#2a2a2a] transition-colors">+</button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.product, item.size)}
                          className="text-[#9A9286] hover:text-red-500 transition-colors p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-xl font-black text-[#B69F73] sm:ml-auto whitespace-nowrap">
                      Rs {itemPrice * item.quantity}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white/60 backdrop-blur-md p-6 lg:p-10 rounded-[2rem] text-[#2a2a2a] sticky top-28 border border-[#EADFC8]/50 shadow-sm">
              <h2 className="text-3xl font-black mb-8 text-[#2a2a2a]">Order Summary</h2>
              
              <div className="flex flex-col gap-6 text-[15px] text-[#888] pb-8 mb-8 border-b border-[#EADFC8]">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2a2a2a]">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Weight</span>
                  <span className="font-bold text-[#2a2a2a]">{totalWeightGrams.toLocaleString()} g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment</span>
                  <span className="bg-[#f0ebe1] text-[#888] text-xs font-bold px-3 py-1.5 rounded-lg">Selected at Checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-10">
                <span className="text-2xl font-bold text-[#2a2a2a]">Total</span>
                <span className="text-3xl font-black text-[#e60000] tracking-tight">Rs. {subtotal}</span>
              </div>
              
              <button 
                onClick={onCheckout}
                className="w-full bg-[#2a2a2a] btn-shine text-white text-xs font-bold uppercase px-8 py-4 rounded-full hover:bg-[#E6B754] transition tracking-wider shadow-lg border-2 border-[#EADFC8]/50"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
