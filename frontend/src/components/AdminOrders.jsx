import React, { useEffect, useState, useRef } from 'react';

const StatusSelect = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Approved', 'Cancel'];
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left w-[120px]" ref={selectRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-[#EADFC8] rounded-lg px-3 py-2 text-sm font-bold text-[#2a2a2a] outline-none hover:border-[#B69F73] shadow-sm hover:shadow-md transition-all flex items-center justify-between"
      >
        <span>{status}</span>
        <svg className={`w-4 h-4 transition-transform text-[#888] ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-[#EADFC8] rounded-lg shadow-xl overflow-hidden right-0 top-full">
          {options.map(option => (
            <div 
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-3 py-2.5 text-sm font-bold cursor-pointer transition-colors ${status === option ? 'bg-[#FAF5EC] text-[#B69F73]' : 'text-[#2a2a2a] hover:bg-[#FAF5EC] hover:text-[#B69F73]'}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [pendingStatuses, setPendingStatuses] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch orders', err);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchOrders(); // Refresh to get updated data
        setPendingStatuses(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }
    } catch (err) {
      console.error('Failed to update order status', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">APPROVED</span>;
      case 'Cancel':
        return <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">CANCEL</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">PENDING</span>;
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-[#888] font-bold">Loading orders...</div>;

  const cleanedQuery = searchQuery.trim().replace(/^#/, '');
  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(cleanedQuery)
  );

  const selectedOrder = orders.find(o => o.id === expandedOrderId);

  return (
    <>
      <div className="bg-white rounded-[2rem] border border-[#EADFC8] shadow-sm overflow-hidden relative">
        <div className="p-8 border-b border-[#EADFC8] flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-black text-[#2a2a2a]">Orders</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#F9F7F2] border border-[#EADFC8] rounded-xl text-sm font-semibold text-[#2a2a2a] focus:outline-none focus:border-[#B69F73] focus:ring-1 focus:ring-[#B69F73] transition-all w-64 placeholder:text-[#888]/60"
              />
              <svg className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="text-sm font-bold text-[#888] bg-[#FAF5EC] px-4 py-2 rounded-full border border-[#EADFC8]">
            Total Orders: {filteredOrders.length}
          </div>
        </div>
        <div className="overflow-x-auto min-h-[250px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF5EC] text-[#888] text-xs font-bold uppercase tracking-wider border-b border-[#EADFC8]">
                <th className="p-5">Order ID</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Location</th>
                <th className="p-5">Total</th>
                <th className="p-5">Status</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADFC8]">
              {filteredOrders.map(order => {
                const locationParts = order.location ? order.location.split(', ') : ['Unknown', 'Unknown'];
                const mainLoc = locationParts[0] || '';
                const subLoc = locationParts.length > 1 ? locationParts[locationParts.length - 2] : '';

                return (
                  <tr key={order.id} className={`transition-colors group ${expandedOrderId === order.id ? 'bg-[#F9F7F2]' : 'hover:bg-[#F9F7F2]'}`}>
                    <td className="p-5 font-bold text-[#2a2a2a]">
                      <div className="flex items-center gap-2">
                        #{order.id}
                        {order.status === 'Pending' && <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>}
                      </div>
                    </td>
                    
                    <td className="p-5">
                      <div className="font-bold text-[#2a2a2a]">{order.customer_name}</div>
                      <div className="text-sm text-[#888] mt-0.5">{order.mobile_number}</div>
                    </td>
                    
                    <td className="p-5">
                      <div className="font-bold text-[#2a2a2a] truncate max-w-[150px]">{mainLoc}</div>
                      <div className="text-sm text-[#888] mt-0.5">{subLoc}</div>
                    </td>
                    
                    <td className="p-5 font-black text-[#B69F73]">Rs. {order.total_amount}</td>
                    
                    <td className="p-5">
                      {getStatusBadge(order.status)}
                    </td>
                    
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <StatusSelect 
                          status={pendingStatuses[order.id] || order.status}
                          onChange={(val) => setPendingStatuses(prev => ({ ...prev, [order.id]: val }))}
                        />
                        {(pendingStatuses[order.id] && pendingStatuses[order.id] !== order.status) ? (
                          <button 
                            onClick={() => handleStatusChange(order.id, pendingStatuses[order.id])}
                            className="px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm bg-green-500 text-white hover:bg-green-600"
                          >
                            Save
                          </button>
                        ) : (
                          <button 
                            onClick={() => setExpandedOrderId(order.id)}
                            className="px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm bg-[#2a2a2a] text-white hover:bg-[#B69F73]"
                          >
                            Details
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-[#888] font-bold text-lg">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#2a2a2a]/60 backdrop-blur-sm transition-opacity">
          <div className="bg-[#FAF5EC] rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-[#EADFC8] overflow-hidden animate-[fade-in_0.2s_ease-out]">
            <div className="p-6 border-b border-[#EADFC8] flex justify-between items-center bg-white shrink-0">
              <h3 className="text-xl font-black text-[#2a2a2a] flex items-center gap-3 uppercase tracking-wider">
                Order #{selectedOrder.id}
                {selectedOrder.status === 'Pending' && <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>}
              </h3>
              <button 
                onClick={() => setExpandedOrderId(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F2EB] hover:bg-[#EADFC8] text-[#2a2a2a] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Delivery Details */}
                <div className="bg-white p-6 rounded-2xl border border-[#EADFC8] shadow-sm h-fit">
                  <h4 className="font-black text-[#2a2a2a] mb-5 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B69F73]"></span> Delivery Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[#888] text-sm font-semibold">Name</span>
                      <span className="font-bold text-[#2a2a2a]">{selectedOrder.customer_name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[#888] text-sm font-semibold">Email</span>
                      <span className="font-bold text-[#2a2a2a]">{selectedOrder.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[#888] text-sm font-semibold">Phone 1</span>
                      <span className="font-bold text-[#2a2a2a]">0{String(selectedOrder.mobile_number).replace(/^0+/, '')}</span>
                    </div>
                    {selectedOrder.phone2 && (
                      <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-[#888] text-sm font-semibold">Phone 2</span>
                        <span className="font-bold text-[#2a2a2a]">0{String(selectedOrder.phone2).replace(/^0+/, '')}</span>
                      </div>
                    )}
                    <div className="flex flex-col border-b border-gray-50 pb-2">
                      <span className="text-[#888] text-sm font-semibold mb-1">Address</span>
                      <span className="font-bold text-[#2a2a2a] leading-relaxed">{selectedOrder.address || selectedOrder.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[#888] text-sm font-semibold">City</span>
                      <span className="font-bold text-[#2a2a2a]">{selectedOrder.city || '-'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[#888] text-sm font-semibold">District</span>
                      <span className="font-bold text-[#2a2a2a]">{selectedOrder.district || '-'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-[#888] text-sm font-semibold">Postal Code</span>
                      <span className="font-bold text-[#2a2a2a]">{selectedOrder.postal_code || '-'}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-[#888] text-sm font-semibold">Payment</span>
                      <span className="font-bold text-green-600 uppercase text-xs tracking-wider bg-green-50 px-2 py-1 rounded">
                        {selectedOrder.payment_method === 'onepay' ? 'Bank Card / Bank Account - One Pay' : (selectedOrder.payment_method || 'One Pay')}
                      </span>
                    </div>
                  </div>
                  
                  {selectedOrder.order_notes && (
                    <div className="mt-5 pt-5 border-t border-[#EADFC8] border-dashed">
                      <span className="text-[#888] text-sm font-semibold block mb-2">Order Notes:</span>
                      <p className="text-sm text-[#2a2a2a] font-medium bg-[#F9F7F2] p-4 rounded-xl border border-[#EADFC8]/50 italic">"{selectedOrder.order_notes}"</p>
                    </div>
                  )}
                </div>
                
                {/* Order Items */}
                <div className="bg-white p-6 rounded-2xl border border-[#EADFC8] shadow-sm flex flex-col h-fit max-h-full">
                  <h4 className="font-black text-[#2a2a2a] mb-5 uppercase text-xs tracking-[0.2em] flex items-center gap-2 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#2a2a2a]"></span> Order Items
                  </h4>
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-[150px]">
                    {(() => {
                      try {
                        const items = typeof selectedOrder.items === 'string' ? JSON.parse(selectedOrder.items) : selectedOrder.items;
                        return items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-[#F9F7F2] p-3 rounded-xl border border-transparent hover:border-[#EADFC8] transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm border border-[#EADFC8]/50 shrink-0 overflow-hidden">
                                {item.product.image ? (
                                  <img src={item.product.image} alt={item.product.name || 'Product'} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-[#E6B754] font-bold text-lg">H</span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-[#2a2a2a]">{item.product.name || item.product.title}</p>
                                <p className="text-xs font-bold text-[#888] mt-0.5">Size: <span className="text-[#B69F73]">{item.size}</span> <span className="mx-1">|</span> Qty: <span className="text-[#2a2a2a]">{item.quantity}</span></p>
                              </div>
                            </div>
                            <div className="font-black text-[#2a2a2a] whitespace-nowrap pl-2">Rs. {item.product.pricing[item.size] * item.quantity}</div>
                          </div>
                        ));
                      } catch(e) {
                        return <p className="text-sm text-red-500 font-bold p-4 bg-red-50 rounded-xl">Error loading items data</p>;
                      }
                    })()}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-5 border-t-2 border-[#2a2a2a] shrink-0">
                    <span className="font-black text-[#2a2a2a] uppercase text-sm tracking-wider">Total Amount</span>
                    <span className="font-black text-2xl text-[#B69F73]">Rs. {selectedOrder.total_amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
