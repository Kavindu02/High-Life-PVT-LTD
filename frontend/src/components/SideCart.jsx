import React from 'react';

const SideCart = ({ isOpen, onClose, cartItems, setCartItems, onViewFullCart, onContinueShopping, onCheckout }) => {
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.pricing ? item.product.pricing[item.size] : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('en-LK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(cartItem => 
      cartItem.product.id === item.product.id && cartItem.size === item.size
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    ));
  };

  const handleRemoveItem = (itemToRemove) => {
    setCartItems(prev => prev.filter(item => 
      !(item.product.id === itemToRemove.product.id && item.size === itemToRemove.size)
    ));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Side Cart Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#FBF5EB] z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col font-montserrat ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]/10">
          <h2 className="text-xl font-bold text-[#2a2a2a]">CART ({cartItemCount})</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a]/5 rounded-full transition-colors flex items-center justify-center text-[#2a2a2a]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-[#2a2a2a]/50">
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>Your cart is empty.</p>
              <button 
                onClick={() => {
                  onClose();
                  if (onContinueShopping) onContinueShopping();
                }}
                className="mt-6 px-8 py-3.5 w-full max-w-[280px] bg-[#2a2a2a] btn-shine text-white text-xs font-bold tracking-wider rounded-full hover:bg-[#E6B754] transition shadow-lg border-2 border-[#2a2a2a]/10"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.product.id || item.product.name}-${item.size}-${index}`} className="flex gap-4 group">
                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-[#2a2a2a]/10 relative">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                  <button 
                    onClick={() => handleRemoveItem(item)}
                    className="absolute top-1 right-1 p-0.5 bg-white rounded-full shadow-sm text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col flex-1 justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold text-[#2a2a2a] line-clamp-1">{item.product.name}</h3>
                    {item.size && <p className="text-xs text-[#2a2a2a]/60 mt-0.5">Size: {item.size}</p>}
                    <p className="text-sm font-bold text-[#B69F73] mt-1">{formatPrice(item.product?.pricing ? item.product.pricing[item.size] : 0)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-[#2a2a2a]/20 rounded-full h-7 w-24">
                      <button 
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-[#2a2a2a] hover:text-[#B69F73] hover:bg-[#2a2a2a]/5 rounded-l-full"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-xs font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-[#2a2a2a] hover:text-[#B69F73] hover:bg-[#2a2a2a]/5 rounded-r-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#2a2a2a]/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-bold text-[#2a2a2a]">Subtotal:</span>
              <span className="text-xl font-bold text-[#B69F73]">{formatPrice(calculateSubtotal())}</span>
            </div>
            
            <button 
              onClick={() => {
                onClose();
                if (onCheckout) onCheckout();
              }}
              className="w-full py-3.5 bg-[#2a2a2a] btn-shine text-white text-xs font-bold tracking-wider rounded-full hover:bg-[#E6B754] transition shadow-lg border-2 border-[#2a2a2a]/10 flex items-center justify-center gap-2 group"
            >
              CHECKOUT
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button 
              onClick={() => {
                onClose();
                onViewFullCart();
              }}
              className="w-full text-center mt-4 text-[11px] text-[#2a2a2a]/60 font-medium hover:text-[#B69F73] underline transition-colors uppercase tracking-widest"
            >
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SideCart;
