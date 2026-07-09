import React, { useState, useEffect } from 'react';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = sessionStorage.getItem('adminActiveTab');
    return saved ? saved : 'orders';
  });

  useEffect(() => {
    sessionStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-[#EADFC8] p-6 flex flex-col">
        <div className="mb-10">
          <a href="/" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105">
            <img src="/logo.webp" alt="High Life Logo" className="h-[130px] w-auto object-contain mix-blend-multiply mb-2 -ml-2" />
          </a>
          <div className="text-xs font-bold text-[#888] uppercase tracking-[0.2em] ml-2 mt-[-10px]">Admin Panel</div>
        </div>
        
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
          className="mt-auto bg-[#2a2a2a] btn-shine text-white text-[11px] font-bold px-6 py-3.5 rounded-full hover:bg-red-500 transition tracking-widest uppercase shadow-lg text-center border-2 border-transparent hover:border-white/20"
        >
          Log Out
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
