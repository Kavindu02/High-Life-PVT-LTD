import React, { useState } from 'react';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-[#EADFC8] p-6 flex flex-col">
        <h1 className="text-2xl font-black text-[#2a2a2a] mb-10">High Life <br/><span className="text-lg font-medium text-[#888]">Admin Panel</span></h1>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'orders' ? 'bg-[#2a2a2a] text-white' : 'text-[#888] hover:bg-[#FAF5EC] hover:text-[#2a2a2a]'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'users' ? 'bg-[#2a2a2a] text-white' : 'text-[#888] hover:bg-[#FAF5EC] hover:text-[#2a2a2a]'}`}
          >
            Users
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors text-left"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'orders' ? <AdminOrders /> : <AdminUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
