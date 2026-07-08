import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch users', err);
      setLoading(false);
    }
  };

  const handleRoleToggle = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to make this user an ${newRole}?`)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}/role`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: newRole }),
        });
        if (response.ok) {
          fetchUsers();
        }
      } catch (err) {
        console.error('Failed to update user role', err);
      }
    }
  };

  const handleBlockToggle = async (id, currentStatus) => {
    if (window.confirm(`Are you sure you want to ${currentStatus ? 'unblock' : 'block'} this user?`)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}/block`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_blocked: !currentStatus }),
        });
        if (response.ok) {
          fetchUsers(); // refresh the list
        }
      } catch (err) {
        console.error('Failed to update block status', err);
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="bg-white rounded-[2rem] border border-[#EADFC8] shadow-sm overflow-hidden">
      <div className="p-8 border-b border-[#EADFC8]">
        <h2 className="text-2xl font-black text-[#2a2a2a]">Registered Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF5EC] text-[#888] text-sm uppercase tracking-wider">
              <th className="p-6 font-bold">Name</th>
              <th className="p-6 font-bold">Email</th>
              <th className="p-6 font-bold">Mobile</th>
              <th className="p-6 font-bold">Role</th>
              <th className="p-6 font-bold">Status</th>
              <th className="p-6 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADFC8]">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-[#F9F7F2] transition-colors">
                <td className="p-6 font-bold text-[#2a2a2a]">{user.name}</td>
                <td className="p-6 text-gray-600">{user.email}</td>
                <td className="p-6 text-gray-600">{user.mobile_number || 'N/A'}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {user.role || 'user'}
                  </span>
                </td>
                <td className="p-6">
                  {user.is_blocked ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">Blocked</span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Active</span>
                  )}
                </td>
                <td className="p-6">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleRoleToggle(user.id, user.role || 'user')}
                      className={`btn-shine text-white text-[10px] font-bold px-5 py-2.5 rounded-full transition tracking-wider shadow-md uppercase border-2 border-white/20 ${
                        user.role === 'admin' 
                          ? 'bg-orange-500 hover:bg-orange-600' 
                          : 'bg-[#2a2a2a] hover:bg-[#E6B754]'
                      }`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                    <button 
                      onClick={() => handleBlockToggle(user.id, user.is_blocked)}
                      className={`btn-shine text-white text-[10px] font-bold px-5 py-2.5 rounded-full transition tracking-wider shadow-md uppercase border-2 border-white/20 ${
                        user.is_blocked 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {user.is_blocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
