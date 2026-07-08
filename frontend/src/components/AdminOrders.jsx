import React, { useEffect, useState } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      }
    } catch (err) {
      console.error('Failed to update order status', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase">APPROVED</span>;
      case 'Cancel':
        return <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase">CANCEL</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-bold uppercase">PENDING</span>;
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="bg-white rounded-[2rem] border border-[#EADFC8] shadow-sm overflow-hidden">
      <div className="p-8 border-b border-[#EADFC8]">
        <h2 className="text-2xl font-black text-[#2a2a2a]">Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF5EC] text-[#888] text-xs font-bold uppercase tracking-wider">
              <th className="p-6">Order ID</th>
              <th className="p-6">Customer</th>
              <th className="p-6">Location</th>
              <th className="p-6">Total</th>
              <th className="p-6">Payment Method</th>
              <th className="p-6">Status</th>
              <th className="p-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADFC8]">
            {orders.map(order => {
              // Location is stored as "District, City" ideally, we can split it if needed.
              // We'll just display it as is if it's a single string, or format it.
              const locationParts = order.location ? order.location.split(', ') : ['Unknown', 'Unknown'];
              const mainLoc = locationParts[0];
              const subLoc = locationParts.length > 1 ? locationParts[1] : '';

              return (
                <tr key={order.id} className="hover:bg-[#F9F7F2] transition-colors group">
                  <td className="p-6 font-bold text-[#2a2a2a]">#{order.id}</td>
                  
                  <td className="p-6">
                    <div className="font-bold text-[#2a2a2a]">{order.customer_name}</div>
                    <div className="text-sm text-gray-500 mt-1">{order.mobile_number}</div>
                  </td>
                  
                  <td className="p-6">
                    <div className="font-bold text-[#2a2a2a]">{mainLoc}</div>
                    <div className="text-sm text-gray-500 mt-1">{subLoc}</div>
                  </td>
                  
                  <td className="p-6 font-bold text-[#2a2a2a]">Rs. {order.total_amount}</td>
                  
                  <td className="p-6">
                    <span className="font-semibold text-green-600">
                      {order.payment_method === 'cod' ? 'Cash On Delivery' : 'Bank Transfer'}
                    </span>
                  </td>
                  
                  <td className="p-6">
                    {getStatusBadge(order.status)}
                  </td>
                  
                  <td className="p-6">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-white border border-[#EADFC8] rounded-lg px-3 py-2 text-sm font-bold text-[#2a2a2a] outline-none focus:border-[#B69F73] cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
