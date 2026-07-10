import React, { useState } from 'react';

const Profile = ({ user, onLogout }) => {
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const handleViewOrders = async () => {
    setShowOrdersModal(true);
    setLoadingOrders(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/user/${user.id}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#B69F73] flex flex-col items-center justify-center p-6 font-sans relative pt-24 md:pt-32">
      <div className="w-full max-w-[700px] z-10 relative">
        <div className="bg-[#FAF5EC] w-full p-6 md:p-10 rounded-[30px] relative shadow-2xl">
          {/* Corner Decorators */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#EADFC8] rounded-tl-xl pointer-events-none"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#EADFC8] rounded-br-xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-[#B69F73] text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg shrink-0 border-4 border-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-[32px] font-bold text-[#2A2A2A] tracking-tight">{user.name}</h2>
              <p className="text-[#9A9286] font-bold tracking-widest text-[11px] uppercase mt-1">Premium Member</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#2A2A2A] mb-4">Account Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">Full Name</p>
                <p className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 text-lg font-bold">
                  {user.name}
                </p>
              </div>
              
              {user.mobileNumber && (
                <div>
                  <p className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">Mobile Number</p>
                  <p className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 text-lg font-bold">
                    {user.mobileNumber}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="block text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-2">Email Address</p>
              <p className="w-full bg-transparent border-b border-[#EADFC8] text-[#2A2A2A] pb-3 text-lg font-bold">
                {user.email}
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={onLogout}
              className="bg-[#2A2A2A] text-white font-bold text-[11px] tracking-widest py-4 px-10 rounded-[20px] hover:bg-black transition-colors uppercase shadow-md"
            >
              LOG OUT
            </button>
            <button 
              onClick={handleViewOrders}
              className="bg-[#B69F73] text-white font-bold text-[11px] tracking-widest py-4 px-10 rounded-[20px] hover:bg-[#a08b61] transition-colors uppercase shadow-md"
            >
              ORDER HISTORY
            </button>
          </div>
        </div>
      </div>

      {/* Orders Modal */}
      {showOrdersModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF5EC] w-full max-w-3xl rounded-[30px] p-8 max-h-[80vh] overflow-y-auto relative shadow-2xl">
            <button 
              onClick={() => setShowOrdersModal(false)}
              className="absolute top-6 right-8 text-[#2A2A2A] hover:text-red-500 font-bold text-3xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-[#2A2A2A] mb-8">Your Order History</h3>
            
            {loadingOrders ? (
              <p className="text-center text-[#9A9286] font-bold">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-[#9A9286] font-bold">No orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-[20px] shadow-sm border border-[#EADFC8] flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="w-full md:w-auto text-center md:text-left">
                      <p className="font-bold text-[#2A2A2A] text-lg">Order #{order.id}</p>
                      <p className="text-sm text-[#9A9286] font-semibold mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                      <p className="text-sm font-bold mt-2 tracking-wide">
                        STATUS: <span className={order.status === 'Approved' ? 'text-green-600' : order.status === 'Cancel' ? 'text-red-600' : 'text-blue-600'}>{order.status}</span>
                      </p>
                    </div>
                    <div className="w-full md:w-auto text-center md:text-right">
                      <p className="text-xl font-bold text-[#2A2A2A]">Rs. {order.total_amount}</p>
                      <p className="text-[11px] text-[#9A9286] font-bold uppercase tracking-widest mt-1">
                        {(() => {
                          try {
                            const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                            if (Array.isArray(items) && items.length > 0) {
                              const sizes = items.map(item => item.size).filter(Boolean).join(', ');
                              return sizes ? `SIZE: ${sizes}` : '';
                            }
                          } catch (e) {}
                          return '';
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

